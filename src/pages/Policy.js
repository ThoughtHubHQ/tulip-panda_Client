import React from 'react';
import Layout from '../components/Layout/Layout';
import GoBackButton from '../components/GoBackButton';

const Policy = () => {
    return (
        <Layout title={"Privacy Policy - Tulip Panda"}>
            <div className="container">
                <div className="row">
                    <div className="d-flex align-items-center">
                        <div className="col-auto">
                            <GoBackButton />
                        </div>
                        <div className="col">
                            <h2 className="p-3 mt-3 text-center">Privacy Policy</h2>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-5 ">
                            <img className='p-2' src="https://media.istockphoto.com/id/1279830303/vector/privacy-policy-concept-contract-with-protection-information-shield-and-magnifier-icons-cyber.jpg?s=612x612&w=0&k=20&c=B-ogjHis02gZOGgTbzbwINjxk9tQflNZ6SSswkDygrg=" alt="about" style={{ width: "100%" }} />
                        </div>
                        <div className="col-md-7">
                            <p className="justify-text">At Tulip Panda, your privacy matters to us. We collect essential information such as your name, phone number, address, and location details to ensure smooth delivery of your favorite dishes from Tulip Garden Restaurant directly to your doorstep in Trishal. Delivery fee is charged based on time of day, distance, and surge conditions. 
We use this information to:

Process and manage your food orders

Enhance your customer experience

Send you promotional offers (only with your consent)

We never sell your personal data. Your information is shared only with trusted delivery partners to fulfill your orders securely.

Our systems use secure technology to protect your data, and we use cookies solely to improve your browsing experience. You can manage your preferences or opt out at any time.

For any privacy-related queries, or to request updates or deletion of your data, please contact us at:
📧 <a href="mailto:tulippanda@mrg.com.bd">tulippanda@mrg.com.bd</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Policy;