import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home";
import Main from "../Layouts/Main";
import Login from "../Pages/Login/Login";
import Signup from "../Pages/SignUp/Signup";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        children: [
            { path: '/', element: <Home /> },
        ]
    },
    { path: '/login', element: <Login /> },
    { path: '/signup', element: <Signup /> }
]);

export default router;