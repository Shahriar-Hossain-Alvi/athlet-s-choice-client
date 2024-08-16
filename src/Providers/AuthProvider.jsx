import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import app from "../components/Firebase/firebase.config";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, onAuthStateChanged, signOut, signInWithPopup, GoogleAuthProvider } from "firebase/auth";




export const AuthContext = createContext(null);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);

    const [user, setUser] = useState(null);


    // create user with email and password
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    //update user name and image after sign up
    const updateUserProfile = (name, image) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: image
        })
    }

    // google sign in
    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    //login in with email and password
    const loginInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }


    //logout user
    const logout = () => {
        setLoading(true);
        return signOut(auth);
    }


    // observer
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            if (currentUser) {
                setLoading(false);
            }
            else {
                setLoading(false);
            }
        });
        return () => {
            return unsubscribe();
        }
    }, [user])

    const authInfo = {
        loading,
        setLoading,
        user,
        createUser,
        loginInUser,
        updateUserProfile,
        logout,
        googleSignIn
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