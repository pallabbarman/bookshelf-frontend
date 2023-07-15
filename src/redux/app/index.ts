import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer: {},
    devTools: import.meta.env.DEV,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
});

export default store;
