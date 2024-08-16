import { useContext } from "react";
import { toast, ToastContainer } from "react-toastify";
import { AuthContext } from "../../Providers/AuthProvider";
import axios from "axios";
import { PiSpinnerBallFill } from "react-icons/pi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaHandPointDown, FaHandPointRight } from "react-icons/fa";

const image_hosting_api = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_url = `https://api.imgbb.com/1/upload?key=${image_hosting_api}`;


const Signup = () => {
    const { loading, setLoading, user, createUser, updateUserProfile, googleSignIn } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const from = location?.state?.from?.pathname || '/';


    // sign up with email and password
    const handleSignup = async e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;

        if (user) {
            toast.error('Already Signed in');
            form.reset();
            return setTimeout(() => {
                navigate(from, { replace: true });
            }, 1500)
        }

        if (password.length < 6) {
            toast.warning('Password should contain at least 6 characters');
            form.password.value = '';
            return;
        }
        if (password.length > 20) {
            toast.warning('Password should contain maximum of 20 characters');
            form.password.value = '';
            return;
        }

        //upload image
        const imageFile = { image: form.image.files[0] }
        const res = await axios.post(image_hosting_url, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        const imgURL = res.data.data.display_url;

        const userInfo = {
            name, email, password, imgURL
        }

        console.log(userInfo);

        // create user after successful image upload
        if (res.data.success) {
            createUser(email, password)
                .then(result => {
                    //update name and image
                    if (result.user) {
                        updateUserProfile(name, imgURL)
                            .then(() => {
                                toast.success('Profile created successfully');
                                setLoading(false)
                                setTimeout(() => {
                                    navigate(from, { replace: true })
                                }, 2000)
                            })
                            .catch(error => {
                                console.error(error);
                                toast.error(error);
                            })
                    }
                    form.reset();
                })
                .catch(error => {
                    console.error(error);
                    toast.error(error);
                })
        }

    }


    // handle google sign in
    const handleGoogleSignIn = () => {
        if (user) {
            toast.error('Already Signed in');
            return setTimeout(() => {
                navigate(from, { replace: true });
            }, 1500)
        }

        googleSignIn()
            .then(result => {
                if (result.user) {
                    toast.success("Sign in successful");
                    setTimeout(() => {
                        navigate(from, { replace: true });
                    }, 2500)
                }
            }).catch(error => {
                console.log(error);
                toast.error(error);
            })
    }

    return (
        <div className="min-h-screen flex justify-center items-center">
            <ToastContainer></ToastContainer>
            <div className="glass w-3/4 lg:w-1/2 flex flex-col my-5 pt-5 round-2xl shadow-2xl shadow-current">
                <div className="text-center">
                    <h1 className="text-5xl font-bold font-serif">Sign Up</h1>
                    <p className="pt-4 font-serif">Create an account to view the products
                    </p>
                </div>

                <div className="mt-4">
                    <div className="flex justify-center gap-2 items-center">
                        <h4 className="text-lg ">Sign in with <FaHandPointRight className="inline text-2xl text-acPink" /></h4>

                        <button onClick={handleGoogleSignIn} className="btn btn-circle">
                            <FcGoogle className="text-lg" />
                        </button>

                        <h4 className="text-lg">Or fill up the form <FaHandPointDown className="inline text-2xl text-acPink" /></h4>
                    </div>

                    <form onSubmit={handleSignup} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input name="name" type="text" placeholder="Enter your name" className="input input-bordered" required />
                        </div>


                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input name="email" type="email" placeholder="Enter your email address" className="input input-bordered" required />
                        </div>


                        <div className="form-control">
                            <label htmlFor='image' className='block mb-2 text-sm'>
                                Select Image:
                            </label>
                            <input
                                required
                                type='file'
                                id='image'
                                name='image'
                                accept='image/*'
                                className="file-input file-input-bordered w-full"
                            />
                        </div>


                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password (6-20 characters)</span>
                            </label>
                            <input name="password" type="password" placeholder="Enter your password" className="input input-bordered" required />
                        </div>
                        <div className="form-control mt-6">
                            {
                                loading ?
                                    <button className="btn btn-disabled">
                                        <PiSpinnerBallFill className="animate-spin" />
                                    </button>
                                    :
                                    <button className="btn bg-acPink hover:bg-acNavyBlue text-white font-serif text-lg">Sign up</button>
                            }
                        </div>
                        <p>Already have an account? Go to <Link to="/login" className="text-red-500 hover:underline hover:text-red-700">Login</Link></p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;