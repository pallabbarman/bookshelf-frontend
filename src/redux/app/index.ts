import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "redux/features/api";
import authReducer from "redux/features/auth/authSlice";
import filterReducer from "redux/features/filter";

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        filter: filterReducer,
    },
    devTools: import.meta.env.DEV,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
