import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPosts = createAsyncThunk(
    'posts/fetchPosts',
    async function(_, {rejectWithValue}) {
        try {
            const response = await fetch('http://localhost:3001/posts')

            if(!response.ok) {
                throw new Error('Данные не были загружены!')
            }

            const data = await response.json()
            return data
        } catch (e) {
            return rejectWithValue(e.message)
        }
    }
)

export const postData = createAsyncThunk(
    'posts/postData',
    async function({value, username}, {rejectWithValue, dispatch}) {

        const newPost = {
            id: Date.now().toString(36) + Math.random().toString(36),
            username,
            comment : value,
            reactions: {
                lol: [],
                like: [],
                angry: [],
            }
        }

        const response = await fetch('http://localhost:3001/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newPost)
        })

        try {

            if(!response.ok) {
                throw new Error('Данные не были загружены!')
            }

            console.log('В целом данные отправляются на сервак')

            dispatch(addPost({newPost})) //Не забывать передавать объект

        } catch (e) {
            return rejectWithValue(e.message)
        }
    }
)

export const patchData = createAsyncThunk(
    'posts/patchData',
    async function({id, clickedDataReaction, currentUsername}, {rejectWithValue, dispatch}) {

        try {

            // Сначала вытащим все реакции
            const response = await fetch(`http://localhost:3001/posts/${id}`)

            if(!response.ok) {
                throw new Error('Реакции не были получены')
            }

            console.log('Реакции были получены')
            const { reactions } = await response.json()
            // console.log(reactions)

            // console.log(currentUsername)
            
            // Мне нужно было проверить все реакции, for (let key in reactions) {...}

            // если в реакции ЕСТЬ имя и название реакции совпадает с clickedDataReaction if(key.includes(username)) {...}
            // То удали в clickedDataReaction username reactions[clickedDataReaction] = filter(...)

            // Если в реакции НЕТ имени и реакция совпадает с clickedDataReaction else if(key.includes(username)) {...}
            // То запуш в clickedDataReaction username reactions[clickedDataReaction].push(username)
            // Если переданная реакция null if (!clickedDataReaction) {key.filter(username)}
            // То удали везде username 
            // Если clickedDataReaction не определено, удали username из всех реакций
            if (clickedDataReaction === null) {
                for (let key in reactions) {
                reactions[key] = reactions[key].filter(el => el !== currentUsername);
                }
            } else {
                for (let key in reactions) {
                    reactions[key] = reactions[key].filter(el => el !== currentUsername);
                    }
                // Если clickedDataReaction определено, обнови соответствующую реакцию
                if (reactions[clickedDataReaction].includes(currentUsername)) {
                reactions[clickedDataReaction] = reactions[clickedDataReaction].filter(el => el !== currentUsername);
                } else {
                    for (let key in reactions) {
                        reactions[key] = reactions[key].filter(el => el !== currentUsername);
                        }
                reactions[clickedDataReaction].push(currentUsername);
                }
            }

            // Тут было всё ок, патчим данные и записываем в стейт
            // console.log('Перед отправкой посмотрим на реакции')
            // console.log(reactions)
            const newResponse = await fetch(`http://localhost:3001/posts/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    reactions: {...reactions}
                })
            })

            if(!newResponse.ok) {
                throw new Error('Не удалось обновить пост на сервере')
            }

            // Тут всё супер было, теперь в UI отрисуем
            dispatch(editPost({id, reactions}))

              
        } catch (e) {
            return rejectWithValue(e.message)
        }
    }
)

export const deleteData = createAsyncThunk(
    'posts/deleteData',
    async function({id}, {rejectWithValue, dispatch}) {

        try {
            const response = await fetch(`http://localhost:3001/posts/${id}`, {
                method: 'DELETE'
            })

            if(!response.ok) {
                throw new Error('Пост был обновлён!')
            }

            console.log('Происходит удаление поста...')

            dispatch(deletePost({id})) //Не забывать передавать объект

        } catch (e) {
            return rejectWithValue(e.message)
        }
    }
)


const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        posts: [],
        status: 'idle',
        error: false,
        clickedForCurrentUser: false
    },
    reducers: {
        addPost(state, action) {
            state.posts.push(action.payload.newPost) //тут моя самая частая ошибка
            state.status = 'idle'
        },
        editPost(state, action) {
            const item = state.posts.find(el => el.id === action.payload.id) //Нашли нужный элемент
            item.reactions = action.payload.reactions //Тупо меняем реакции, изначальное значение хранится в рефе в компоненте
        },
        deletePost(state, action) {
            state.posts = state.posts.filter(el => el.id !== action.payload.id)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPosts.pending, (state, action) => {
            state.status = 'pending'
            state.error = false
        })

        builder.addCase(fetchPosts.fulfilled, (state, action) => {
            state.status = 'idle'
            state.posts = action.payload
            state.error = false
        })

        builder.addCase(fetchPosts.rejected, (state, action) => {
            state.status = 'idle'
            state.error = action.payload
        })

        // Обрабатываем POST 

        builder.addCase(postData.rejected, (state, action) => {
            state.error = 'Ошибка! Ваш пост не был опубликован'
            state.status = 'idle'
        })

        builder.addCase(postData.pending, (state, action) => {
            state.status = 'pending'
            state.error = false
        })

        // Обрабатываем DELETE 

        builder.addCase(deleteData.rejected, (state, action) => {
            state.error = 'Ошибка! Не удалось удалить ваш пост!'
            state.status = 'idle'
        })

        builder.addCase(deleteData.pending, (state, action) => {
            state.status = 'pending'
            state.error = false
        })
    }
})

export const {addPost, editPost, deletePost} = postsSlice.actions

export default postsSlice.reducer
