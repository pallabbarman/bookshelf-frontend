import apiSlice from "../api";

const bookApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getBooks: builder.query({
            query: () => "/books",
        }),
    }),
});

export const { useGetBooksQuery } = bookApi;

export default bookApi;
