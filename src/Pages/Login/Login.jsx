import { useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../../Providers/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { PiSpinnerBallFill } from 'react-icons/pi';
import { FaHandPointDown, FaHandPointRight } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';


const Login = () => {
    const { user, loading, googleSignIn, loginInUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state?.from?.pathname || "/";


    // sign in with email and password
    const handleLogin = async e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        if (user) {
            toast.error('Already Signed in');
            form.reset();
            return setTimeout(() => {
                navigate(from, { replace: true });
            }, 1500)
        }

        if (password.length < 6 || password.length > 20) {
            toast.warning('Invalid Credentials');
            form.password.value = '';
            return;
        }

        loginInUser(email, password)
            .then(result => {
                if (result.user) {
                    toast.success("Login Successful")
                    setTimeout(() => {
                        navigate(from, { replace: true })
                    }, 1500)
                }
            })
            .catch(error => {
                console.error(error);
                toast.error(error)
            })



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
            <div className='glass w-5/6 md:w-3/4 lg:w-1/2 flex flex-col my-5 pt-5 round-2xl shadow-2xl shadow-current'>
                <div className="text-center font-serif">
                    <h1 className="text-5xl font-bold">Login</h1>
                    <p className="py-6">Please login first to view the product listings
                    </p>
                </div>

                <div className='mt-4'>
                    <div className="flex flex-col md:flex-row justify-center gap-2 items-center">
                        <div className='flex items-center'>
                            <h4 className="text-lg ">Sign in with <FaHandPointRight className="inline text-2xl text-acPink" /></h4>

                            <button onClick={handleGoogleSignIn} className="btn btn-circle">
                                <FcGoogle className="text-lg" />
                            </button>
                        </div>

                        <h4 className="text-lg">Or fill up the form <FaHandPointDown className="inline text-2xl text-acPink" /></h4>
                    </div>

                    <form onSubmit={handleLogin} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input name="email" type="email" placeholder="Enter your email address" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
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
                                    <button className="btn bg-acPink hover:bg-acNavyBlue text-white font-serif text-lg">Login</button>
                            }
                        </div>
                        <p>Already have an account? Go to <Link to="/signup" className="text-red-500 hover:underline hover:text-red-700">Sign up</Link></p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;