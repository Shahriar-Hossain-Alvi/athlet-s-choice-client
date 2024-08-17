import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home";
import Main from "../Layouts/Main";
import Login from "../Pages/Login/Login";
import Signup from "../Pages/SignUp/Signup";
import PrivateRoute from "./PrivateRoute";
import Profile from "../Pages/Profile/Profile";


const router = createBrowserRouter([
    {
        path: "/",
        element: <PrivateRoute><Main /></PrivateRoute>,
        children: [
            {
                path: '/',
                element: <PrivateRoute><Home /></PrivateRoute>
            },
            {
                path: '/profile',
                element: <PrivateRoute><Profile /></PrivateRoute>
            },
        ]
    },
    { path: '/login', element: <Login /> },
    { path: '/signup', element: <Signup /> }
]);

export default router;