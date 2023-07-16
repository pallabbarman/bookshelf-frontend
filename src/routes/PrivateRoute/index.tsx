import useAuth from "hooks/useAuth";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
    children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
    const isLoggedIn = useAuth();

    return isLoggedIn ? children : <Navigate to="/" />;
};

export default PrivateRoute;
