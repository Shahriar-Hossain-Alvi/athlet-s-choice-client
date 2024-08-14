import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home";
import Main from "../Layouts/Main";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        children: [
            {
                path: '/',
                element: <Home />
            },
        ]
    },
]);

export default router;