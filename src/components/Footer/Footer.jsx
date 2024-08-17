import { Link } from "react-router-dom";
import footerLogo from "../../assets/images/logo.png"
import { FaFacebook, FaInstagramSquare, FaYoutube } from "react-icons/fa";
import { FaSquareThreads } from "react-icons/fa6";

const Footer = () => {
    return (
        <footer className="footer bg-acBlackPrimary mt-20 text-white p-10">
            <aside>
                <img src={footerLogo} className="w-48" alt="Footer logo" />
                <p className="font-semibold text-xl">
                    Athlete{`'`}s Choice
                    <br />
                    Providing reliable since 2024
                </p>
            </aside>

            <nav>
                <h6 className="footer-title">Social</h6>
                <div className="grid grid-flow-col gap-4">
                    <Link to="#" className="text-2xl hover:text-acPink"><FaFacebook /></Link>
                    <Link to="#" className="text-2xl hover:text-acPink"><FaInstagramSquare /></Link>
                    <Link to="#" className="text-2xl hover:text-acPink"><FaSquareThreads /></Link>
                    <Link to="#" className="text-2xl hover:text-acPink"><FaYoutube /></Link>
                </div>
            </nav>
        </footer>
    );
};

export default Footer;