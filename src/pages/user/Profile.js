import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import UserMenu from '../../components/Layout/UserMenu';
import { useAuth } from '../../components/context/auth';
import axios from 'axios';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';
import '../../style/AuthStyle.css';
import Spinner from '../../components/Spinner';

const Profile = () => {
    //context
    const [auth, setAuth] = useAuth();
    //state
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [locationLoading, setLocationLoading] = useState(false);
    const [updateLoading, setUpdateLoading] = useState(false);
    const [location, setLocation] = useState({
        latitude: null,
        longitude: null,
        error: null,
    });

    const getLocation = (e) => {
        e.preventDefault();
        setLocationLoading(true);
        try {
            navigator.geolocation.getCurrentPosition((position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                setLocation({ latitude, longitude, error: null });
                const mapLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
                setAddress(mapLink);
                setLocationLoading(false);
            },
                (error) => {
                    setLocation({ latitude: null, longitude: null, error: error.message });
                    toast.error("Please enable your location access.");
                    setLocationLoading(false);
                }
            );
        } catch (error) {
            toast.error("Failed: " + error.message);
            setLocationLoading(false);
        }
    };

    //get user data
    useEffect(() => {
        const { email, name, phone, address } = auth.user;
        setName(name);
        setEmail(email);
        setAddress(address);
        setPhone(phone);
    }, [auth?.user])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUpdateLoading(true);
        try {
            const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/auth/profile-update`, {
                name,
                email,
                password,
                phone,
                address,
            });
            if (data?.error) {
                toast.error(data?.error)
                setUpdateLoading(false);
            } else {
                setAuth({ ...auth, user: data?.updatedUser })
                let ls = Cookies.get("auth");
                ls = JSON.parse(ls)
                ls.user = data.updatedUser
                Cookies.set("auth", JSON.stringify(ls));
                toast.success(data?.message);
                setUpdateLoading(false);
            }
        }
        catch (error) {
            console.log(error);
            toast.error('Something went wrong');
            setUpdateLoading(false);
        }
    }

    return (
        <Layout title={"Dashboard - Update Profile"}>
            <div className="container-fluid mt-3 p-3">
                <div className="row">
                    <div className="col-md-3"><UserMenu /></div>
                    <div className="col-md-9">
                        <div className="form-container ">
                            <form onSubmit={handleSubmit}>
                                <h4 className="title"><i class="fa-solid fa-pen-to-square"></i> Update Your Profile</h4>
                                <div className="mb-3">
                                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control" id="exampleInputName" placeholder='Name' required />
                                </div>
                                <div className="mb-3 " >
                                    <input type="email" readonly value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="exampleInputEmail" placeholder='Email' required disabled />
                                </div>
                                <div className="mb-3">
                                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="exampleInputPassword1" placeholder='Password' required />
                                </div>
                                <div className="mb-3">
                                    <input type="number" value={phone} onChange={(e) => setPhone(e.target.value)} className="form-control" id="exampleInputPhone" placeholder='Phone Number' required />
                                </div>
                                <div className="mb-3">
                                    <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="form-control" id="exampleInputAddress" placeholder='Address' required />
                                
                                <button onClick={getLocation} className='btn btn-secondary btn-lg'>
                                {locationLoading ? <Spinner /> : <span>𖦏 Get Location</span>}
                                </button>

                                </div>

                                <div className="text-center">
                                    <button type="submit" className="btn btn-success">
                                        {updateLoading ? <Spinner /> : <span>Save</span>}
                                    </button>
                                </div>
                            </form>
                            
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Profile;