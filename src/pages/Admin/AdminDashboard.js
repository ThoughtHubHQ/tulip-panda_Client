import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import AdminMenu from '../../components/Layout/AdminMenu';
import { useAuth } from '../../components/context/auth';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Alert } from 'antd';

const AdminDashboard = () => {
    const [auth] = useAuth();
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
        <Layout title={"Dashboard - Admin Panel"}>
            <div className="container-fluid mt-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu></AdminMenu>
                    </div>
                    <div className="col-md-9">
                        <h4 className='text-center my-3'>Admin Dashboard</h4>
                        <div className="d-flex justify-content-center">
                            <Alert
                                className='mb-3'
                                message={
                                    <>
                                        <b>Please reload the page to check if new order is placed</b>
                                    </>
                                }
                                type="warning"
                                showIcon
                            />
                        </div>
                        <div className="row m-2">
                            <div className="col-md-6 mb-2">
                                <div className='card h-100 p-3'>
                                    <h5>Name: {auth?.user?.name}</h5>
                                    <p>Email: {auth?.user?.email}</p>
                                    <p>Phone: {auth?.user?.phone}</p>
                                    <p>Address: {auth?.user?.address}</p>
                                </div>
                            </div>
                            <div className="col-md-6 mb-2">
                                <div className='card h-100 p-3'>
                                    <h4>
                                        Pending Order: <span className="badge bg-danger">{adminData?.adminDashboard?.pendingOrder}</span>
                                    </h4>
                                    <hr />
                                    <h4>
                                        Total Delivered: <span className="badge bg-info">{adminData?.adminDashboard?.totalDelivered}</span>
                                    </h4>
                                    <hr />
                                    <h4>
                                        Total Sales: <span className="badge bg-warning text-dark">BDT {adminData?.adminDashboard?.totalSales}</span>
                                    </h4>
                                    <hr />
                                    <h4>
                                        Total Users: <span className="badge bg-success">{adminData?.adminDashboard?.totalUsers}</span>
                                    </h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </Layout>
    );
};

export default AdminDashboard;