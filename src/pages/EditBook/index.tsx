import BookIcon from "@mui/icons-material/Book";
import {
    Avatar,
    Box,
    Button,
    Container,
    CssBaseline,
    TextField,
    Typography,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useFormik } from "formik";
import useAuthUser from "hooks/useAuthUser";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
    useEditBookMutation,
    useGetSingleBookQuery,
} from "redux/features/book";
import { IBook } from "types/book";
import { IGenericErrorResponse } from "types/error";
const EditBook = () => {
    const { id } = useParams<{ id: string }>();
    const { data, isError, error } = useGetSingleBookQuery(id as string, {
        refetchOnMountOrArgChange: true,
    });
    const [
        editBook,
        {
            data: editData,
            isLoading: editLoading,
            isError: editIsError,
            error: editError,
        },
    ] = useEditBookMutation();

    const authUser = useAuthUser();
    const userId = null;

    console.log(userId);

    useEffect(() => {
        if (isError && error && "status" in error) {
            const errorMessage = error.data as IGenericErrorResponse;
            if (errorMessage) {
                toast.error(errorMessage.message);
            }
        }
        if (editData && editData?.message) {
            toast.success(editData.message);
        }
        if (editIsError && editError && "status" in editError) {
            const errorMessage = editError.data as IGenericErrorResponse;
            if (errorMessage) {
                toast.error(errorMessage.message);
            }
        }
    }, [data, editData, editError, editIsError, error, isError]);

    const formik = useFormik({
        initialValues: {
            title: data?.data?.title,
            author: data?.data?.author,
            genre: data?.data?.genre,
            publicationDate: new Date(data?.data?.publicationDate as Date),
            user: authUser && authUser.id,
        },
        enableReinitialize: true,
        onSubmit: async (values, { resetForm }) => {
            await editBook({
                id: id as string,
                data: values as Partial<IBook>,
            });

            console.log(values, id);

            resetForm();
        },
    });

    return (
        <Container component="main">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    paddingTop: 6,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                    <BookIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Edit Book
                </Typography>
                <Box
                    component="form"
                    onSubmit={formik.handleSubmit}
                    noValidate
                    sx={{ mt: 1 }}
                >
                    <TextField
                        margin="normal"
                        fullWidth
                        id="title"
                        label="Title"
                        name="title"
                        autoComplete="title"
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                            formik.touched.title && Boolean(formik.errors.title)
                        }
                        helperText={formik.touched.title && formik.errors.title}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        name="author"
                        label="Author"
                        id="author"
                        autoComplete="author"
                        value={formik.values.author}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                            formik.touched.author &&
                            Boolean(formik.errors.author)
                        }
                        helperText={
                            formik.touched.author && formik.errors.author
                        }
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        name="genre"
                        label="Genre"
                        id="genre"
                        autoComplete="genre"
                        value={formik.values.genre}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                            formik.touched.genre && Boolean(formik.errors.genre)
                        }
                        helperText={formik.touched.genre && formik.errors.genre}
                    />
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="Publication Date"
                            sx={{ width: "100%", marginTop: "15px" }}
                            value={formik.values.publicationDate}
                            onChange={(value) => {
                                void formik.setFieldValue(
                                    "publicationDate",
                                    value,
                                    true
                                );
                            }}
                            slotProps={{
                                textField: {
                                    error:
                                        formik.touched.publicationDate &&
                                        Boolean(formik.errors.publicationDate),
                                    helperText:
                                        formik.touched.publicationDate &&
                                        String(formik.errors.publicationDate),
                                },
                            }}
                        />
                    </LocalizationProvider>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={editLoading}
                    >
                        Edit Book
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default EditBook;
