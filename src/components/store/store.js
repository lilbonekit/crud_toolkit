import { configureStore } from "@reduxjs/toolkit";

import postsReducer from "./postsSlice";
import currentUserReducer from "./currentUserSlice";

export default configureStore({
    reducer: {
        posts: postsReducer,
        currentUser: currentUserReducer
    }
})