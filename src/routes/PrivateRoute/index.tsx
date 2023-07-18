import useAuth from "hooks/useAuth";
import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

interface PrivateRouteProps {
    children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
    const isLoggedIn = useAuth();
    const { pathname } = useLocation();

    return isLoggedIn ? (
        children
    ) : (
        <Navigate to="/login" state={{ path: pathname }} />
    );
};

export default PrivateRoute;
