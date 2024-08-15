import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";


const Home = () => {
    const { user } = useContext(AuthContext);

    console.log(user);


    return (
        <div>
            <h1>This is landing page</h1>
            <h2>{user?.displayName}</h2>
        </div>
    );
};

export default Home;