import ErrorBoundary from "components/ErrorBoundary";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

const MainLayout = () => {
    return (
        <>
            <Navbar />
            <ErrorBoundary>
                <Outlet />
            </ErrorBoundary>
        </>
    );
};

export default MainLayout;
