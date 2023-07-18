import {
    FetchArgs,
    createApi,
    fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "redux/app";
import { userLoggedOut } from "../auth/authSlice";

const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL as string,
    prepareHeaders: (headers, { getState }) => {
        const state = getState() as RootState;
        const token = state.auth.accessToken;

        if (token) {
            headers.set("Authorization", `${token}`);
        }

        return headers;
    },
});

const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: async (args: FetchArgs | string, api, extraOptions) => {
        const result = await baseQuery(args, api, extraOptions);

        if (result?.error?.status === 401) {
            api.dispatch(userLoggedOut());
            localStorage.clear();
        }
        return result;
    },
    tagTypes: ["books", "comments"],
    endpoints: () => ({}),
});

export default apiSlice;
