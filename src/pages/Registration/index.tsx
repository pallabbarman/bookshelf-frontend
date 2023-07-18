import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
    Avatar,
    Box,
    Button,
    Container,
    CssBaseline,
    Grid,
    TextField,
    Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useRegisterMutation } from "redux/features/auth/authApi";
import { IGenericErrorResponse } from "types/error";
import * as yup from "yup";

const validationSchema = yup.object({
    name: yup.object({
        firstName: yup.string().required("First Name is required"),
        lastName: yup.string().required("Last Name is required"),
    }),
    email: yup
        .string()
        .email("Enter a valid email")
        .required("Email is required"),
    password: yup
        .string()
        .min(6, "Password should be of minimum 6 characters length")
        .required("Password is required"),
    address: yup.string().optional(),
});

const Registration = () => {
    const [register, { isLoading, data, isError, error }] =
        useRegisterMutation();
    const navigate = useNavigate();

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
        if (data && data?.success === true) {
            navigate("/login");
        }
    }, [data, error, isError, navigate]);

    const formik = useFormik({
        initialValues: {
            name: {
                firstName: "",
                lastName: "",
            },
            email: "",
            password: "",
            address: "",
        },
        validationSchema: validationSchema,
        onSubmit: async (values, { resetForm }) => {
            await register(values);
            resetForm();
        },
    });

    return (
        <Container component="main" maxWidth="xs">
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
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign Up
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
                        id="firstName"
                        label="First Name"
                        name="firstName"
                        autoComplete="firstName"
                        value={formik.values.name.firstName}
                        onChange={(e) => {
                            formik.handleChange({
                                target: {
                                    name: "name.firstName",
                                    value: e.target.value,
                                },
                            });
                        }}
                        error={
                            formik.touched.name?.firstName &&
                            Boolean(formik.errors.name?.firstName)
                        }
                        helperText={
                            formik.touched.name?.firstName &&
                            formik.errors.name?.firstName
                        }
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        autoComplete="lastName"
                        value={formik.values.name.lastName}
                        onChange={(e) =>
                            formik.handleChange({
                                target: {
                                    name: "name.lastName",
                                    value: e.target.value,
                                },
                            })
                        }
                        error={
                            formik.touched.name?.lastName &&
                            Boolean(formik.errors.name?.lastName)
                        }
                        helperText={
                            formik.touched.name?.lastName &&
                            formik.errors.name?.lastName
                        }
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                            formik.touched.email && Boolean(formik.errors.email)
                        }
                        helperText={formik.touched.email && formik.errors.email}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                            formik.touched.password &&
                            Boolean(formik.errors.password)
                        }
                        helperText={
                            formik.touched.password && formik.errors.password
                        }
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        id="address"
                        label="Address"
                        name="address"
                        autoComplete="address"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={isLoading}
                    >
                        Sign Up
                    </Button>
                    <Grid container justifyContent="center">
                        <Grid item>
                            <Link to="/login">
                                {"Already have an account? Login"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

export default Registration;
