import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

const Main = () => {
    return (
        <div className='bg-[#1D1D1D]'>
            <Navbar />
            <Outlet></Outlet>
            <Footer />
        </div>
    );
};

export default Main;