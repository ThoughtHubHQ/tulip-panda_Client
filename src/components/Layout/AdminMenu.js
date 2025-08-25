import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import GoBackButton from '../GoBackButton';
import axios from 'axios';
import toast from 'react-hot-toast';

const AdminMenu = () => {
    const [adminData, setAdminData] = useState({});

    const fetchAdminDashboard = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/admin-dashboard`);
            setAdminData(data);
            console.log(data);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    useEffect(() => {
        fetchAdminDashboard();
    }, [adminData?.adminDashboard?.pendingOrder]);

    return (
        <>
            <div className="text-center">
                <div className="list-group">
                    <div className='border-bottom'>
                        <div className="row align-items-center">
                            <div className="col-auto">
                                <GoBackButton />
                            </div>
                            <div className="col">
                                <NavLink to="/dashboard/admin" className="product-link">
                                    <h4 className="mb-0 me-5">Admin Menu</h4>
                                </NavLink>
                            </div>
                            <div className="col-auto">
                                <button className='btn d-md-none' data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample" >
                                    <i className="fa-solid fa-bars"> </i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='d-md-collapse show rounded' id="collapseExample">
                        <NavLink to="/dashboard/admin/create-catagory" className="list-group-item  list-group-item-action">
                            Create Catagory
                        </NavLink>
                        <NavLink to="/dashboard/admin/create-product" className="list-group-item list-group-item-action">
                            Create Package
                        </NavLink>
                        <NavLink to="/dashboard/admin/products" className="list-group-item list-group-item-action">
                            All Package
                        </NavLink>
                        <NavLink to="/dashboard/admin/orders" className="list-group-item list-group-item-action">
                            All Orders &nbsp;
                            {
                                adminData?.adminDashboard?.pendingOrder > 0 ? (
                                    <span className="badge bg-danger">{adminData?.adminDashboard?.pendingOrder}</span>
                                ) : ("")
                            }
                        </NavLink>
                        <NavLink to="/dashboard/admin/all-users" className="list-group-item list-group-item-action">
                            All Users
                        </NavLink>
                        <NavLink to="/dashboard/user" className="list-group-item list-group-item-action">
                            Test User
                        </NavLink>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminMenu;