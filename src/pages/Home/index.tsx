import { Box, Grid } from "@mui/material";

import { lazy } from "react";
import { toast } from "react-toastify";
import { useGetBooksQuery } from "redux/features/book";
import { IBook } from "types/book";

const BookCard = lazy(() => import("components/Card"));
const CardSkeleton = lazy(() => import("components/Spinners/CardSkeleton"));

const Home = () => {
    const { data: books, isLoading, isError } = useGetBooksQuery();

    console.log(books);

    let content = null;

    if (isLoading) {
        content = <CardSkeleton />;
    }
    if (!isLoading && isError) {
        content = toast.error("Something went wrong! Please try again!");
    }
    if (!isLoading && !isError && books?.data?.length === 0) {
        content = toast.error("No videos found!");
    }
    if (!isLoading && !isError && books?.data?.length !== undefined) {
        content = books?.data?.map((book: IBook) => (
            <BookCard book={book} key={book.id} />
        ));
    }

    return (
        <Box>
            <Grid
                container
                mb={2}
                spacing={3}
                columns={{ xs: 4, sm: 8, md: 12 }}
                alignItems="center"
                justifyContent="center"
                p={2}
            >
                {content}
            </Grid>
        </Box>
    );
};

export default Home;
