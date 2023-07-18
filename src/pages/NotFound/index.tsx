import { Box, Typography } from "@mui/material";

const NotFound = () => {
    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{ height: "100vh" }}
        >
            <Typography variant="h1">Not Found!</Typography>
        </Box>
    );
};

export default NotFound;
