/* eslint-disable react/no-unescaped-entities */
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";


const Home = () => {
    const { user } = useContext(AuthContext);

    console.log(user);


    return (
        <div className="min-h-screen text-center pt-10">
            <h1 className="text-3xl font-medium mb-3">Welcome to <span className="text-acPink">Athlete's Choice</span></h1>

            
        </div>
    );
};

export default Home;