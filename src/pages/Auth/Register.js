import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import '../../style/AuthStyle.css';
import Spinner from '../../components/Spinner';

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [answer, setAnswer] = useState("");
    const [spinnerLoading, setSpinnerLoading] = useState(false);
    const navigate = useNavigate();

    //Form Submission_handleSubmit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSpinnerLoading(true);
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`, {
                name,
                email,
                password,
                phone,
                address,
                answer
            });
            setSpinnerLoading(false);
            if (res && res.data.success) {
                toast.success(res.data && res.data.message);
                navigate('/login')
            } else {
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong')
            setSpinnerLoading(false);
        }
    }

    return (
        <Layout title={"Register"}>
            <div className="form-container">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <img className='pt-5 px-5' src="/images/registerImg.png" alt="" style={{ width: "100%" }} />
                        </div>
                        <div className="col-md-6 p-3">
                            <form className='m-lg-5' onSubmit={handleSubmit}>
                                <h4 className="title"><i class="fa-solid fa-user-plus"></i> &nbsp; SIGN UP</h4>
                                <div className="mb-3">
                                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control" id="exampleInputName" placeholder='Name' required />
                                </div>
                                <div className="mb-3">
                                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="exampleInputEmail" placeholder='Email' required />
                                </div>
                                <div className="mb-3">
                                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="exampleInputPassword1" placeholder='Password (Minimum 6 Character)' required />
                                </div>
                                <div className="mb-3">
                                    <input type="number" value={phone} onChange={(e) => setPhone(e.target.value)} className="form-control" id="exampleInputPhone" placeholder='Phone Number' required />
                                </div>
                                <div className="mb-3">
                                    <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="form-control" id="exampleInputAddress" placeholder='Address' required />
                                </div>
                                <div className="mb-3">
                                    <input type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} className="form-control" id="exampleInputAddress" placeholder='What is your favorite food?' required />
                                </div>
                                <div className="text-center py-4">
                                    <button type="submit" className="btn btn-primary">
                                        {spinnerLoading ? <Spinner /> : "Sign Up"}
                                         </button>
                                </div>
                                <div className="text-center">Already Registered? <Link to="/login">Log In</Link></div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Register;