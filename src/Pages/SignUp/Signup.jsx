import { useContext } from "react";
import { toast, ToastContainer } from "react-toastify";
import { AuthContext } from "../../Providers/AuthProvider";
import useAxiosPublic from "../../components/Hooks/useAxiosPublic";
import axios from "axios";

const image_hosting_api = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_url = `https://api.imgbb.com/1/upload?key=${image_hosting_api}`;


const Signup = () => {
    const { loading, user, setLoading, createUser, } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();




    const handleSignup = async e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;

        if (user) {
            toast.error('Already Signed in');
            form.reset();
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
        const imageFile = {image: form.image.files[0]}
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
        
    }

    return (
        <div className="flex flex-col items-center min-h-screen justify-center">
            <ToastContainer></ToastContainer>
            <div className="text-center w-3/4 lg:w-1/2 pt-5 bg-acBlackPrimary rounded-t-2xl">
                <h1 className="text-5xl font-bold">Sign Up</h1>
                <p className="py-6">Create an account to view the products
                </p>
            </div>

            <div className="w-3/4 lg:w-1/2 shadow-2xl bg-acBlackPrimary rounded-b-2xl">
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


                    <div>
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
                        <button className="btn btn-primary">Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;