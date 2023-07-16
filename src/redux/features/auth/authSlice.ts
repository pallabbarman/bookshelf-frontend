import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ILoginUserResponse } from "types/auth";

const initialState: ILoginUserResponse = {
    accessToken: undefined,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        userLoggedIn: (state, action: PayloadAction<string>) => {
            state.accessToken = action.payload;
        },
        userLoggedOut: (state) => {
            state.accessToken = undefined;
        },
    },
});

export const { userLoggedIn, userLoggedOut } = authSlice.actions;

export default authSlice.reducer;
