import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.REACT_APP_API_URL as string,
    }),
    endpoints: () => ({}),
});

export default apiSlice;
