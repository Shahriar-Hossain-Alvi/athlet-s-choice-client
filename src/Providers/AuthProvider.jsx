import { createContext, useState } from "react";
import PropTypes from 'prop-types';
import app from "../components/Firebase/firebase.config";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import useAxiosPublic from "../components/Hooks/useAxiosPublic";

export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const axiosPublic = useAxiosPublic();


    // create user with email and password
    const createUser = (email, password)=>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }


    //login in with email and password
    const loginInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }


    const authInfo = {
        loading,
        setLoading,
        user,
        createUser,
        loginInUser
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.any,
}


export default AuthProvider;