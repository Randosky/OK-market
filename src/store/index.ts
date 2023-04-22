import {configureStore} from '@reduxjs/toolkit';
import webSlice from "./webSlice";

const store = configureStore({
    reducer: {
        web: webSlice,
    },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;