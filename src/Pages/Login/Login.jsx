import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Login = () => {
    // const [passwordError, setPasswordError] = useState('');

    const handleLogin = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

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

        console.log(email, password);

    }

    return (
        <div className="flex flex-col items-center min-h-screen justify-center">
            <ToastContainer></ToastContainer>
            <div className="text-center w-3/4 lg:w-1/2 pt-5 bg-acBlackPrimary rounded-t-2xl">
                <h1 className="text-5xl font-bold">Login</h1>
                <p className="py-6">Please login first to view the product listings
                </p>
            </div>

            <div className="w-3/4 lg:w-1/2 shadow-2xl bg-acBlackPrimary rounded-b-2xl">
                <form onSubmit={handleLogin} className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input name="email" type="email" placeholder="Enter your email address" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password (6-20 characters)</span>
                        </label>
                        <input name="password" type="password" placeholder="Enter your password" className="input input-bordered" required />
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn btn-primary">Login</button>
                    </div>
                </form>
            </div>
        </div>

    );
};

export default Login;