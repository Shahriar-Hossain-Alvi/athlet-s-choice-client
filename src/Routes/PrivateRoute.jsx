import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { PacmanLoader } from "react-spinners";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';

const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
};

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return <div className="sweet-loading flex items-center bg-ttPrimary min-h-screen">
            <PacmanLoader
                color={"#EF2853"}
                speedMultiplier={2}
                cssOverride={override}
                size={70}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    }

    if (user) {
        return children;
    }

    return <Navigate to="/login" state={{ from: location }}></Navigate>
};

PrivateRoute.propTypes = {
    children: PropTypes.any
}

export default PrivateRoute;