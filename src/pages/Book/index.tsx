import {
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    Grid,
    TextField,
    Typography,
} from "@mui/material";
import Comment from "components/Comment";
import CircularLoader from "components/Spinners/CircularLoader";
import { useFormik } from "formik";
import useAuth from "hooks/useAuth";
import useAuthUser from "hooks/useAuthUser";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
    useAddCommentMutation,
    useGetSingleBookQuery,
} from "redux/features/book";
import { IReview } from "types/book";
import { IGenericErrorResponse } from "types/error";
import * as yup from "yup";

const validationSchema = yup.object({
    comment: yup.string().required("Comment is required"),
});

const Book = () => {
    const { id } = useParams<{ id: string }>();
    const { data, isLoading: bookLoading } = useGetSingleBookQuery(
        id as string
    );
    const [addComment, { isLoading, data: commentData, error, isError }] =
        useAddCommentMutation();

    const loggedInUser = useAuth();
    const authUser = useAuthUser();

    const bookData = data?.data;
    const publicationDate = bookData?.publicationDate;
    const date = new Date(publicationDate as Date);

    useEffect(() => {
        if (commentData && commentData?.message) {
            toast.success(commentData.message);
        }
        if (isError && error && "status" in error) {
            const errorMessage = error.data as IGenericErrorResponse;
            if (errorMessage) {
                toast.error(errorMessage.message);
            }
        }
    }, [commentData, error, isError]);

    const formik = useFormik({
        initialValues: {
            comment: "",
            reviewer: authUser && authUser.id,
        },
        validationSchema,
        enableReinitialize: true,
        onSubmit: async (values, { resetForm }) => {
            await addComment({
                id: id as string,
                data: values as unknown as IReview,
            });

            resetForm();
        },
    });

    return (
        <>
            {bookLoading ? (
                <CircularLoader></CircularLoader>
            ) : (
                <Box>
                    <Grid
                        container
                        mb={2}
                        alignItems="center"
                        justifyContent="center"
                        flexDirection="column"
                        p={2}
                    >
                        <Grid item>
                            <Card
                                sx={{ width: { md: 1000, sm: 500, xs: 300 } }}
                            >
                                <CardMedia
                                    component="img"
                                    image={bookData?.image}
                                    alt={bookData?.author}
                                    sx={{
                                        height: { md: 400, xs: 220 },
                                        objectFit: { md: "fill" },
                                    }}
                                />
                                <CardContent
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontWeight: 700,
                                            fontSize: { md: "2rem" },
                                        }}
                                        component="h1"
                                    >
                                        {bookData?.title}
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontWeight: 700,
                                            fontSize: { md: "1.2rem" },
                                        }}
                                        component="h2"
                                    >
                                        Author: {bookData?.author}
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontWeight: 700,
                                            fontSize: { md: "1.2rem" },
                                        }}
                                    >
                                        Genre: {bookData?.genre}
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontWeight: 700,
                                            fontSize: { md: "1.2rem" },
                                        }}
                                    >
                                        Publication Date:{" "}
                                        {date.toLocaleDateString()}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item>
                            {bookData?.reviews?.map((review) => (
                                <Comment
                                    key={review.id}
                                    comment={review}
                                ></Comment>
                            ))}
                        </Grid>
                        {loggedInUser && (
                            <Grid item>
                                <Box
                                    component="form"
                                    onSubmit={formik.handleSubmit}
                                    noValidate
                                    sx={{
                                        mt: 1,
                                        width: { md: 1000, sm: 500, xs: 300 },
                                    }}
                                >
                                    <TextField
                                        margin="normal"
                                        fullWidth
                                        id="comment"
                                        label="Express your comments"
                                        name="comment"
                                        autoComplete="comment"
                                        value={formik.values.comment}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={
                                            formik.touched.comment &&
                                            Boolean(formik.errors.comment)
                                        }
                                        helperText={
                                            formik.touched.comment &&
                                            formik.errors.comment
                                        }
                                    />
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                        disabled={isLoading}
                                    >
                                        Comment
                                    </Button>
                                </Box>
                            </Grid>
                        )}
                    </Grid>
                </Box>
            )}
        </>
    );
};

export default Book;
