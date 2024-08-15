import { createContext, useState } from "react";
import PropTypes from 'prop-types';
import app from "../components/Firebase/firebase.config";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    //login in with email and password
    const loginInUser = (auth, email, password) => {

    }


    const authInfo = {}

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.array,
}


export default AuthProvider;