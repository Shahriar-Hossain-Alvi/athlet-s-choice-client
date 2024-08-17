import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";


const Profile = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className="min-h-screen mx-2">
            <h4 className="font-medium text-2xl text-center mt-10">Uer Information:</h4>

            <div className="flex flex-col md:flex-row max-w-2xl mx-auto mt-5 text-left items-center justify-center gap-8 font-serif">
                <img className="w-48 h-48" src={user.photoURL} alt="user profile image" />

                <div>
                    <h2><span className="text-lg font-semibold font-sans">Name: </span>{user?.displayName}</h2>
                    <h2><span className="text-lg font-semibold font-sans">Email: </span>{user?.email}</h2>
                    <h2><span className="text-lg font-semibold font-sans">Profile Created: </span>{user?.metadata.creationTime}</h2>
                    <h2><span className="text-lg font-semibold font-sans">Last Signed In: </span>{user?.metadata.lastSignInTime}</h2>
                </div>
            </div>
        </div>
    );
};

export default Profile;