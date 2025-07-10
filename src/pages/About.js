import React from 'react';
import Layout from '../components/Layout/Layout';
import GoBackButton from '../components/GoBackButton';

const About = () => {
    return (
        <Layout title={"About - EComWebApp"}>
       <div className="container">
       <div className="row">
            <div className="d-flex align-items-center">
                        <div className="col-auto">
                            <GoBackButton />
                        </div>
                        <div className="col">
                            <h2 className="p-3 mt-3 text-center">About Us</h2>
                        </div>
                    </div>
                <div className="col-md-5">
                    <img src="/images/about.png" alt="about" style={{ width: "100%" }} />
                </div>
                <div className="col-md-7">
                    <p className="justify-text">🍴Tulip Panda – Taste Delivered!
Craving Biryani, Chinese, or Tandoori? Get your favorites from Tulip Garden Restaurant delivered hot & fresh to your doorstep. Fast online food delivery in Mymensingh. Order now!</p>
                </div>
            </div>
       </div>
        </Layout>
    );
};

export default About;