import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import useAuth from "hooks/useAuth";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { userLoggedOut } from "redux/features/auth/authSlice";
import { useAppDispatch } from "redux/hooks";
import NavDrawer from "../NavDrawer";
import Searchbox from "../Searchbox";

function Navbar() {
    const [mobileMenu, setMobileMenu] = useState(false);
    const loggedInUser = useAuth();
    const dispatch = useAppDispatch();

    const handleOpenMenu = () => {
        setMobileMenu(true);
    };

    const handleCloseMenu = () => {
        setMobileMenu(false);
    };

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
                        onClick={handleOpenMenu}
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
                                md: "block",
                                xs: "none",
                            },
                        }}
                    >
                        <Button
                            color="inherit"
                            variant="text"
                            component={NavLink}
                            to="/"
                            sx={{
                                ml: 1,
                            }}
                        >
                            All Books
                        </Button>
                        {!loggedInUser ? (
                            <>
                                {" "}
                                <Button
                                    color="inherit"
                                    variant="text"
                                    component={NavLink}
                                    to="/login"
                                    sx={{
                                        ml: 1,
                                    }}
                                >
                                    Login
                                </Button>
                                <Button
                                    color="inherit"
                                    variant="text"
                                    component={NavLink}
                                    to="/signup"
                                    sx={{
                                        ml: 1,
                                    }}
                                >
                                    SignUp
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button
                                    color="inherit"
                                    variant="text"
                                    component={NavLink}
                                    to="/add-new-book"
                                    sx={{
                                        ml: 1,
                                    }}
                                >
                                    Add New
                                </Button>
                                <Button
                                    color="inherit"
                                    variant="text"
                                    sx={{
                                        ml: 1,
                                    }}
                                    onClick={() => dispatch(userLoggedOut())}
                                >
                                    Logout
                                </Button>
                            </>
                        )}
                    </Box>
                    <Searchbox />
                    <NavDrawer open={mobileMenu} onClose={handleCloseMenu} />
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Navbar;
