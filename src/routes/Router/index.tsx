import MainLayout from "layouts/Main";
import Book from "pages/Book";
import Home from "pages/Home";
import Login from "pages/Login";
import Registration from "pages/Registration";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/signup",
                element: <Registration />,
            },
            {
                path: "/books/:id",
                element: <Book />,
            },
        ],
    },
]);

export default router;
