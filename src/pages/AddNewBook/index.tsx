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
import { toast } from "react-toastify";
import { useAddBookMutation } from "redux/features/book";
import { IGenericErrorResponse } from "types/error";
import * as yup from "yup";

const validationSchema = yup.object({
    title: yup.string().required("Title is required"),
    author: yup.string().required("Author is required"),
    genre: yup.string().required("Genre is required"),
    publicationDate: yup.date().required("Publication date is required"),
});

const AddNewBook = () => {
    const [addBook, { data, isLoading, isError, error }] = useAddBookMutation();
    const authUser = useAuthUser();

    useEffect(() => {
        if (data && data?.message) {
            toast.success(data.message);
        }
        if (isError && error && "status" in error) {
            const errorMessage = error.data as IGenericErrorResponse;
            if (errorMessage) {
                toast.error(errorMessage.message);
            }
        }
    }, [data, error, isError]);

    const formik = useFormik({
        initialValues: {
            title: "",
            author: "",
            genre: "",
            publicationDate: null,
            user: authUser && authUser.id,
        },
        validationSchema,
        enableReinitialize: true,
        onSubmit: async (values, { resetForm }) => {
            await addBook({ ...values, user: values.user as string });
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
                    Add New Book
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
                        disabled={isLoading}
                    >
                        Add Book
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default AddNewBook;
