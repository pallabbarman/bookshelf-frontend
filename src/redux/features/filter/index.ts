import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
    search: "",
};

const filterSlice = createSlice({
    name: "book",
    initialState,
    reducers: {
        searched: (state, action: PayloadAction<string>) => {
            state.search = action.payload;
        },
    },
});

export const { searched } = filterSlice.actions;

export default filterSlice.reducer;
