import BookIcon from "@mui/icons-material/Book";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import {
    Box,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import useAuth from "hooks/useAuth";
import { NavLink } from "react-router-dom";
import { userLoggedOut } from "redux/features/auth/authSlice";
import { useAppDispatch } from "redux/hooks";
import { zeroArgsFunction } from "types/functions";

interface NavDrawerProps {
    open: boolean;
    onClose: zeroArgsFunction;
}

const NavDrawer = ({ open, onClose }: NavDrawerProps) => {
    const loggedInUser = useAuth();
    const dispatch = useAppDispatch();

    return (
        <Drawer open={open} onClose={onClose}>
            <Box
                sx={{
                    width: 250,
                }}
                role="presentation"
            >
                <List>
                    <ListItem
                        disablePadding
                        component={NavLink}
                        to="/"
                        sx={{ color: "inherit" }}
                    >
                        <ListItemButton>
                            <ListItemIcon sx={{ minWidth: "30px" }}>
                                <BookIcon />
                            </ListItemIcon>
                            <ListItemText primary={"All Books"} />
                        </ListItemButton>
                    </ListItem>
                    {!loggedInUser ? (
                        <>
                            <ListItem
                                disablePadding
                                component={NavLink}
                                to="/login"
                                sx={{ color: "inherit" }}
                            >
                                <ListItemButton>
                                    <ListItemIcon sx={{ minWidth: "30px" }}>
                                        <LoginIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={"Login"} />
                                </ListItemButton>
                            </ListItem>
                            <ListItem
                                disablePadding
                                component={NavLink}
                                to="/signup"
                                sx={{ color: "inherit" }}
                            >
                                <ListItemButton>
                                    <ListItemIcon sx={{ minWidth: "30px" }}>
                                        <HowToRegIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={"SignUp"} />
                                </ListItemButton>
                            </ListItem>
                        </>
                    ) : (
                        <ListItem
                            disablePadding
                            sx={{ color: "inherit" }}
                            onClick={() => dispatch(userLoggedOut())}
                        >
                            <ListItemButton>
                                <ListItemIcon sx={{ minWidth: "30px" }}>
                                    <LogoutIcon />
                                </ListItemIcon>
                                <ListItemText primary={"Logout"} />
                            </ListItemButton>
                        </ListItem>
                    )}
                </List>
            </Box>
        </Drawer>
    );
};

export default NavDrawer;
