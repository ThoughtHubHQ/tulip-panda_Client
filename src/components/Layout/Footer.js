import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div className='footer'>
            <div className='container my-5'>
                <div className="row">
                    <div className="col-md-4">
                        <h4>We are: </h4>
                        <p className='d-flex'>
                            <Link to="/about">About Us</Link>
                            
                            <Link to="/contact">Contact</Link>
                            
                            <Link to="/policy">Privacy Policy</Link>
                        </p>
                    </div>
                    <div className="col-md-4">
                        <h5>Follow Us</h5>
                        <div className="d-flex">
                            <Link to="https://www.facebook.com/tulippandaonlinefood/" target='_blank'>
                                <i className="h3 fab fa-facebook-f"></i>
                            </Link>
                            <Link to="https://www.x.com/tulippandaonlinefood" target='_blank'>
                                <i className="h3 fab fa-twitter"></i>
                            </Link>
                            <Link to="https://www.instagram.com/tulippandaonlinefood" target='_blank'>
                                <i className="h3 fab fa-instagram"></i>
                            </Link>
                            <Link to="https://www.linkedin.com/in/tulippandaonlinefood" target='_blank'>
                                <i className="h3 fab fa-linkedin-in"></i>
                            </Link>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <h4>We Accept:</h4>
                           <div>
                            <i className="h2 mx-2 fa-solid fa-money-bill-wave" title="Cash" />
                              <i className="h2 mx-2 fa-brands fa-cc-visa" />
                               <i className="h2 mx-2 fa-brands fa-cc-mastercard" />
                               
                            </div>
                    </div>
                </div>
            </div>
            <h4 className='text-center'>All Rights Reserved &copy; MR GROUP - TULIP GARDEN RESTRURENT </h4>
           
        </div>
    );
};

export default Footer;