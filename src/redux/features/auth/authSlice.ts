import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const storedAccessToken = localStorage.getItem("auth");

interface InitialStateProps {
    accessToken: string | null;
}

const initialState: InitialStateProps = {
    accessToken: storedAccessToken,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        userLoggedIn: (state, action: PayloadAction<string>) => {
            state.accessToken = action.payload;
            localStorage.setItem("auth", action.payload);
        },
        userLoggedOut: (state) => {
            state.accessToken = null;
            localStorage.removeItem("auth");
        },
    },
});

export const { userLoggedIn, userLoggedOut } = authSlice.actions;

export default authSlice.reducer;
