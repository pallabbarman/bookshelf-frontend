import { IBook, IReview } from "types/book";
import { IApiResponse } from "types/response";
import apiSlice from "../api";

const bookApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getBooks: builder.query<IApiResponse<IBook[]>, string>({
            query: (data = "") => `/books${data ? `?search=${data}` : ""}`,
            providesTags: ["books"],
        }),
        getSingleBook: builder.query<IApiResponse<IBook>, string>({
            query: (id) => `/books/${id}`,
            providesTags: ["comments"],
        }),
        addBook: builder.mutation<IApiResponse<IBook>, IBook>({
            query: (data) => ({
                url: `/books/add-new-book`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["books"],
        }),
        editBook: builder.mutation<
            IApiResponse<IBook>,
            { id: string; data: Partial<IBook> }
        >({
            query: ({ id, data }) => ({
                url: `/books/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["books"],
        }),
        addComment: builder.mutation<
            IApiResponse<void>,
            { id: string; data: IReview }
        >({
            query: ({ id, data }) => ({
                url: `/books/${id}/comments`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["comments"],
        }),
        deleteBook: builder.mutation<IApiResponse<IBook>, string>({
            query: (id) => ({
                url: `/books/${id}`,
                method: "DELETE",
            }),
        }),
    }),
});

export const {
    useGetBooksQuery,
    useGetSingleBookQuery,
    useAddBookMutation,
    useEditBookMutation,
    useAddCommentMutation,
    useDeleteBookMutation,
} = bookApi;

export default bookApi;
