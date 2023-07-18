import MainLayout from "layouts/Main";
import AddNewBook from "pages/AddNewBook";
import Book from "pages/Book";
import EditBook from "pages/EditBook";
import Home from "pages/Home";
import Login from "pages/Login";
import Registration from "pages/Registration";
import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "routes/PrivateRoute";

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
            {
                path: "/add-new-book",
                element: (
                    <PrivateRoute>
                        <AddNewBook />
                    </PrivateRoute>
                ),
            },
            {
                path: "/edit-book/:id",
                element: (
                    <PrivateRoute>
                        <EditBook />
                    </PrivateRoute>
                ),
            },
        ],
    },
]);

export default router;
