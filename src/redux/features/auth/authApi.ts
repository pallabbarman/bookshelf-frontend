import { IApiResponse } from "types/response";
import { IUser } from "types/user";
import apiSlice from "../api";

const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation<IApiResponse<IUser>, Partial<IUser>>({
            query: (data: IUser) => ({
                url: "/auth/signup",
                method: "POST",
                body: data,
            }),
        }),
    }),
});

export const { useRegisterMutation } = authApi;

export default authApi;
