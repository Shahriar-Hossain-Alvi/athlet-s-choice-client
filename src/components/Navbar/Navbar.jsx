import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/images/logo.png"
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);


    return (
        <div className="navbar bg-acBlackPrimary">
            <div className="flex-1">
                <Link to='/' className="btn p-0 btn-lg">
                    <img className="w-48" src={logo} alt="logo" />
                </Link>
            </div>


            <div className="flex-none">
                <ul id="navList" className="menu md:menu-horizontal px-1 gap-2">
                    <li><NavLink className="font-semibold border border-acPink text-base text-white hover:text-acPink" to="/">Home</NavLink></li>
                    
                    <li><NavLink className="font-semibold border border-acPink text-base text-white hover:text-acPink" to="/profile">Profile</NavLink></li>
                </ul>

                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img
                                alt="Tailwind CSS Navbar component"
                                src={user?.photoURL} />
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        <li><button className="bg-acPink text-white font-medium" onClick={logout}>Logout</button></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;