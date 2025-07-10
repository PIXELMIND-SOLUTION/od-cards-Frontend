import { useNavigate } from "react-router-dom";
import logo from './assets/odcards-logo.png';

function Footer() {

    const navigate = useNavigate();
    return (
        <>
            <div className="container-fluid p-5 pb-5 " style={{ backgroundColor: "#000000", color: "white" }}>
                <div className="row">
                    <div className="col-sm-4 p-5">
                        <img src={logo} /><br /><br />
                        <p>Printing for what’s to come. What’s more, we do it right! A full administration printing Get the latest news, events & more delivered to your inbox.. Read More </p><br /><br />
                        
                    </div>
                    <div className="col-sm-8">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-sm-4 p-3">
                                    <h3>Company</h3><br />
                                    <p style={{ cursor: "pointer"}} onClick={()=>{navigate('/dashboard')}}>Home</p>
                                    <p style={{ cursor: "pointer"}} onClick={()=>{navigate('/dashboard/aboutus')}}>About Us</p>
                                    <p style={{ cursor: "pointer"}} onClick={()=>{navigate('/dashboard/contactus')}}>Contact Us</p>
                                    <p style={{ cursor: "pointer"}} onClick={()=>{navigate('/dashboard/faqpage')}}>Faq's</p>
                                </div>
                                <div className="col-sm-4 p-3">
                                    <h3>Our Terms</h3><br />
                                    <p style={{ cursor: "pointer"}} onClick={()=>{navigate('/dashboard/policies?section=terms')}}>Terms & Conditions</p>
                                    <p style={{ cursor: "pointer"}} onClick={()=>{navigate('/dashboard/policies?section=privacy')}}>Privacy policy</p>
                                    <p style={{ cursor: "pointer"}} onClick={()=>{navigate('/dashboard/policies?section=refund')}}>Refund Policy</p>
                                </div>
                                <div className="col-sm-4 p-3">
                                    <h3>Contact Us</h3><br />
                                    <p style={{ cursor: "pointer"}}><i className="fa-brands fa-facebook" style={{ color: " #d6dae1" }}></i> Facebook</p>
                                    <p style={{ cursor: "pointer"}}><i className="fa-brands fa-square-twitter" style={{ color: " #d6dae1" }}></i> Twitter</p>
                                    <p style={{ cursor: "pointer"}}><i className="fa-brands fa-square-instagram" style={{ color: " #d6dae1" }}></i> Instagram</p>
                                    <p style={{ cursor: "pointer"}}><i className="fa-solid fa-phone" style={{ color: " #d6dae1" }}></i> +91 9988977644</p>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className=" text-center">
                    <p>Copyright © 2024 DS OD CARDS. All Rights Reserved</p>
                </div>
            </div>
        </>

    );

};

export default Footer;