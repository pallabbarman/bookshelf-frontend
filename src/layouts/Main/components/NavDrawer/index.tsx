import HowToRegIcon from "@mui/icons-material/HowToReg";
import LoginIcon from "@mui/icons-material/Login";
import {
    Box,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import { zeroArgsFunction } from "types/functions";
interface NavDrawerProps {
    open: boolean;
    onClose: zeroArgsFunction;
}

const NavDrawer = ({ open, onClose }: NavDrawerProps) => {
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
                                <LoginIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Login"} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem
                        disablePadding
                        component={NavLink}
                        to="/"
                        sx={{ color: "inherit" }}
                    >
                        <ListItemButton>
                            <ListItemIcon sx={{ minWidth: "30px" }}>
                                <HowToRegIcon />
                            </ListItemIcon>
                            <ListItemText primary={"SignUp"} />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Box>
        </Drawer>
    );
};

export default NavDrawer;
