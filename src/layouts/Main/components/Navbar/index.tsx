import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { NavLink } from "react-router-dom";
import Searchbox from "../Searchbox";

function Navbar() {
    return (
        <Box sx={{ flexGrow: 1 }} mb={8}>
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2, display: { md: "none", sm: "block" } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        noWrap
                        component={NavLink}
                        to="/"
                        sx={{
                            flexGrow: 1,
                            display: { xs: "none", sm: "block" },
                            textDecoration: "none",
                            color: "white",
                        }}
                    >
                        Bookshelf
                    </Typography>
                    <Box
                        className="text-capitalize"
                        sx={{
                            mr: 2,
                            display: {
                                xs: "none",
                                sm: "block",
                            },
                        }}
                    >
                        <Button
                            color="inherit"
                            href="/"
                            variant="text"
                            component="a"
                            sx={{
                                ml: 1,
                            }}
                        >
                            Login
                        </Button>
                        <Button
                            color="inherit"
                            href="/"
                            variant="text"
                            component="a"
                            sx={{
                                ml: 1,
                            }}
                        >
                            SignUp
                        </Button>
                    </Box>
                    <Searchbox />
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Navbar;
