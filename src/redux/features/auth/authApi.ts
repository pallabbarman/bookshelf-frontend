import { ILoginUserResponse, IUserLogin } from "types/auth";
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
        login: builder.mutation<IApiResponse<ILoginUserResponse>, IUserLogin>({
            query: (data: IUserLogin) => ({
                url: "/auth/login",
                method: "POST",
                body: data,
            }),
        }),
    }),
});

export const { useRegisterMutation, useLoginMutation } = authApi;

export default authApi;
