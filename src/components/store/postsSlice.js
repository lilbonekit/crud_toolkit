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
    async function(comment, {rejectWithValue, dispatch}) {

        const newPost = {
            id: Date.now().toString(36) + Math.random().toString(36),
            username: "Valera only mid",
            comment,
            reactions: {
                lol: 0,
                like: 0,
                angry: 0,
            },
            currentReaction: null
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
    async function({id, clickedDataReaction, newReactionsObject}, {rejectWithValue, dispatch}) {

        try {
            const response = await fetch(`http://localhost:3001/posts/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    currentReaction: clickedDataReaction,
                    reactions: newReactionsObject
                })
            })

            if(!response.ok) {
                throw new Error('Пост был обновлён!')
            }

            console.log('Данные отправляются на сервер методом PATCH')

            dispatch(editPost({id, clickedDataReaction, newReactionsObject})) //Не забывать передавать объект

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
            item.currentReaction = action.payload.clickedDataReaction //Мутировали ему актуальный класс, чтобы внутри компонента условный рендеринг запустить
            item.reactions = action.payload.newReactionsObject //Тупо меняем реакции, изначальное значение хранится в рефе в компоненте
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

        builder.addCase(postData.rejected, (state, action) => {
            state.error = 'Ошибка! Не удалось удалить ваш пост!'
            state.status = 'idle'
        })

        builder.addCase(postData.pending, (state, action) => {
            state.status = 'pending'
            state.error = false
        })
    }
})

export const {addPost, editPost, deletePost} = postsSlice.actions

export default postsSlice.reducer
