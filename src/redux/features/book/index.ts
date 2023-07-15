import { IBook } from "types/book";
import { IApiResponse } from "types/response";
import apiSlice from "../api";

const bookApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getBooks: builder.query<IApiResponse<IBook[]>, void>({
            query: () => "/books",
        }),
    }),
});

export const { useGetBooksQuery } = bookApi;

export default bookApi;
