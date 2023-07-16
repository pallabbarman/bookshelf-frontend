import { ILoginUserResponse, IUserLogin } from "types/auth";
import { IApiResponse } from "types/response";
import { IUser } from "types/user";
import apiSlice from "../api";
import { userLoggedIn } from "./authSlice";

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
            async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;

                    localStorage.setItem(
                        "auth",
                        JSON.stringify({
                            accessToken: result.data.data?.accessToken,
                        })
                    );

                    dispatch(
                        userLoggedIn(result.data.data?.accessToken as string)
                    );
                } catch (err) {
                    // do nothing
                }
            },
        }),
    }),
});

export const { useRegisterMutation, useLoginMutation } = authApi;

export default authApi;
