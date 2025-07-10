import React from 'react';
import Layout from '../components/Layout/Layout';
import { BiPhoneCall, BiSupport, BiMailSend } from 'react-icons/bi'
import GoBackButton from '../components/GoBackButton';

const Contact = () => {
    return (
        <Layout title={"Contact Us - EComWebApp"}>
            <div className="container">
            <div className="row">
            <div className="d-flex align-items-center">
                            <div className="col-auto">
                               <GoBackButton/>
                            </div>
                            <div className="col">
                            <h2 className="p-3 mt-3 text-center">Contact Us</h2>
                            </div>
                        </div>
                <div className="col-md-5">
                    <img className='my-2' src="https://raw.githubusercontent.com/techinfo-youtube/ecommerce-app-2023/main/client/public/images/contactus.jpeg" alt="contact-us" style={{ width: "100%" }} />
                </div>
                <div className="col-md-7">
  <h1 className="bg-dark my-2 p-2 text-white text-center"> CONTACT DETAILS </h1>
  <p className="mt-2">
    Any query and info about product feel free to call anytime.
  </p>

  <p className="mt-3">
    <BiMailSend /> : 
    <a href="mailto:tulippanda@mrg.com.bd" className="text-decoration-none text-dark ms-2">
      tulippanda@mrg.com.bd
    </a>
  </p>

  <p className="mt-3">
    <BiPhoneCall /> : 
    <a href="tel:+8801633077777" className="text-decoration-none text-dark ms-2">
      01633-077777
    </a>
  </p>

  <p className="mt-3">
    <BiSupport /> : 
    <a href="tel:000000000000" className="text-decoration-none text-dark ms-2">
      0000-0000-0000 (Help Line)
    </a>
  </p>
</div>

            </div>
            </div>
        </Layout >
    );
};

export default Contact;