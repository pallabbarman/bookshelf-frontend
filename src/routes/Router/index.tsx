import MainLayout from "layouts/Main";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
    },
]);

export default router;
