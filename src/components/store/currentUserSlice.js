import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const getUser = createAsyncThunk(
    'currentUser/getUser',
    // Я сначала делаю ГЕТ запрос по username и если такой есть
    // То сравниваю переданный пароль с тем, что лежит в JSON
    // Если всё нормально, то передаю объект в AddUser
    async function({newUser, isLogged}, {rejectWithValue, dispatch}) {
        // console.log('Процесс авторизации...')
        try {
            const checkData = await fetch(`http://localhost:3001/users?username=${newUser.username}`)

            if(!checkData.ok) {
                throw new Error('Данные не были загружены!')
            }
            
            const response = await checkData.json();
            
            if(response.length === 0) {
                // console.error('Пользователя с таким логином не существует!')
                throw new Error('Пользователя с таким логином не существует!')
            }

            // console.log('Такой пользователь есть. Проверка пароля...')

            // Проверка данных
            const isPasswordMathced = await response.some(user => user.password === newUser.password);

            if(!isPasswordMathced) {
                // console.log('Неправильный пароль!')
                throw new Error('Неправильный пароль!')
            }

            if (isPasswordMathced) {
                // console.log('Пароль правильный! Продолжаю авторизацию...')
                dispatch(addUser({newUser, isLogged}))
            }

        } catch (e) {
            return rejectWithValue(e.message)
        }
    }
)

export const createUser = createAsyncThunk(
    'currentUser/createUser',
    async function({newUser, isLogged}, {rejectWithValue, dispatch}) {
        // Это не совсем кул, но всё таки я вытяну всех пользователей сначала
        // Проверю, если такой username существует, то выдам ошибку
        // Если нет такого, то пойду дальше
        try {
            const checkData = await fetch('http://localhost:3001/users')

            if(!checkData.ok) {
                throw new Error('Данные не были загружены!')
            }

            console.log('Пользователи были получены. Проверка...')

            const response = await checkData.json();

            // Проверка данных
            const userExists = await response.some(user => user.username === newUser.username);

            if(userExists) {
                // Обработка ситуации, когда пользователь с таким именем уже существует
                // Можно выбросить ошибку, если необходимо
                console.error('Пользователь с таким именем уже существует!')
                throw new Error('Пользователь с таким именем уже существует!')
            }

            const newResponse = await fetch('http://localhost:3001/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({...newUser, isLogged})
            })

            if(!newResponse.ok) {
                throw new Error('Данные не были загружены!')
            }

            dispatch(addUser({newUser, isLogged})) //Не забывать передавать объект
        } catch (e) {
            return rejectWithValue(e.message);
        }

})

const currentUserSlice = createSlice({
    name: 'currentUser',
    initialState: {
        user: {
            username: null,
            id: null,
            password: null,
            currentReaction: null,
        },
        isLogged: false,
        status: 'idle',
        error: false
    },
    reducers: {
        addUser(state, action) {
            state.error = false
            state.user = action.payload.newUser
            state.status = 'idle'
            state.isLogged = action.payload.isLogged
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createUser.rejected, (state, action) => {
            state.error = action.payload
        })

        builder.addCase(getUser.rejected, (state, action) => {
            state.error = action.payload
        })

        builder.addCase(getUser.pending, (state, action) => {
            state.error = false
        })
    }
})

const {addUser} = currentUserSlice.actions

export default currentUserSlice.reducer
