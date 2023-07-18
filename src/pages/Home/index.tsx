import { Box, Grid, Pagination, Stack } from "@mui/material";
import { lazy, useState } from "react";
import { toast } from "react-toastify";
import { useGetBooksQuery } from "redux/features/book";
import { useAppSelector } from "redux/hooks";
import { IBook } from "types/book";
import { IMeta } from "types/meta";

const BookCard = lazy(() => import("components/Card"));
const CardSkeleton = lazy(() => import("components/Spinners/CardSkeleton"));

const Home = () => {
    const { search } = useAppSelector((state) => state.filter);
    const {
        data: books,
        isLoading,
        isError,
    } = useGetBooksQuery(search, {
        refetchOnMountOrArgChange: true,
    });
    const [currentPage, setCurrentPage] = useState(
        (books?.meta as IMeta)?.page ?? 1
    );
    const totalPages = books?.meta?.total
        ? Math.ceil(books?.meta?.total / books?.meta?.limit)
        : 0;

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

    const handlePageChange = (
        _event: React.ChangeEvent<unknown>,
        page: number
    ) => {
        setCurrentPage(page);
    };

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
            <Grid
                container
                mb={2}
                spacing={3}
                alignItems="center"
                justifyContent="center"
                p={2}
            >
                <Stack spacing={2}>
                    <Pagination
                        page={currentPage}
                        count={totalPages}
                        onChange={handlePageChange}
                        variant="outlined"
                    />
                </Stack>
            </Grid>
        </Box>
    );
};

export default Home;
