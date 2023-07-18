import { IBook, IReview } from "types/book";
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
        addBook: builder.mutation<IApiResponse<IBook>, IBook>({
            query: (data) => ({
                url: `/books/add-new-book`,
                method: "POST",
                body: data,
            }),
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
        }),
    }),
});

export const {
    useGetBooksQuery,
    useGetSingleBookQuery,
    useAddBookMutation,
    useAddCommentMutation,
} = bookApi;

export default bookApi;
