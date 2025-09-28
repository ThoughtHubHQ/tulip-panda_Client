import React from 'react';
import Layout from '../components/Layout/Layout';
import { BiPhoneCall, BiSupport, BiMailSend } from 'react-icons/bi'
import GoBackButton from '../components/GoBackButton';

const Contact = () => {
  return (
    <Layout title={"Contact Us - Tulip Panda"}>
      <div className="container">
        <div className="row">
          <div className="d-flex align-items-center">
            <div className="col-auto">
              <GoBackButton />
            </div>
            <div className="col">
              <h2 className="p-3 mt-3 text-center">Contact Us</h2>
            </div>
          </div>
          <div className="col-md-5">
            <iframe
              className='my-2'
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d186874.1319388622!2d90.397548!3d24.567655!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x375643017b21d3e5%3A0x7235c56ed9afaf50!2sTulip%20Garden%20Restaurant!5e1!3m2!1sen!2sbd!4v1752465631797!5m2!1sen!2sbd"
              width="100%"
              height="200"
              style={{ border: 0 }}
              allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              title="Google Map Location"
            />

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
              <a href="tel:+8801633088888" className="text-decoration-none text-dark ms-2">
                01633-088888
              </a>
            </p>

          </div>

        </div>
      </div>
    </Layout >
  );
};

export default Contact;