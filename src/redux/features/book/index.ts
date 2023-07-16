import { IBook } from "types/book";
import { IApiResponse } from "types/response";
import apiSlice from "../api";

const bookApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getBooks: builder.query<IApiResponse<IBook[]>, void>({
            query: () => "/books",
        }),
        getSingleBook: builder.query<IApiResponse<IBook>, string>({
            query: (id) => `/books/${id}`,
        }),
    }),
});

export const { useGetBooksQuery, useGetSingleBookQuery } = bookApi;

export default bookApi;
