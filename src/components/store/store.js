import { configureStore, combineReducers} from "@reduxjs/toolkit";

import postsReducer from "./postsSlice";
import currentUserReducer from "./currentUserSlice";

import { 
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web


const persistConfig = {
    key: 'root', //ключ нужен для создания нескольких хранилищ
    storage,
    whitelist: ['currentUser'] //хочу только пользователя сохранять в ЛС
}

const rootReducer = combineReducers({
    posts: postsReducer,
    currentUser: currentUserReducer
})

// Для стора нужен не обычный редьюсер, а персистированный вариант
const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
        serializableCheck: {
            // Чтобы нормально работало с Redux Toolkit
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }),
})

export const persistor = persistStore(store)

export default store
