import React from 'react';
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu';
import { useAuth } from '../../components/context/auth';
import FloatingCartButton from '../../components/FloatingCartButton';

const Dashboard = () => {
    const [auth] = useAuth();
    return (
        <Layout title={"Dashboard - Tulip Panda"}>
            <div className="container-fluid mt-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <UserMenu />
                    </div>
                    <div className="col-md-9">
                        <h4 className='text-center my-2'>Your Profile</h4>
                        <div className="card p-4">
                            <h5>Name: {auth?.user?.name}</h5>
                            <p>Email: <i>{auth?.user?.email}</i></p>
                            <p>Phone: {auth?.user?.phone}</p>
                            <p>Address: <a href={auth?.user?.address} target='_blank' rel="noopener noreferrer">{auth?.user?.address}</a></p>
                            <p><b>Token:</b> {auth?.token}</p>
                        </div>
                    </div>
                </div>
            </div>
            <FloatingCartButton/>
        </Layout>
    );
};

export default Dashboard;