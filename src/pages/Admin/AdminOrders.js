import React, { useEffect, useState } from 'react';
import AdminMenu from '../../components/Layout/AdminMenu'
import Layout from '../../components/Layout/Layout';
import moment from "moment";
import { useAuth } from '../../components/context/auth';
import axios from 'axios';
import { Select } from "antd";
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import Spinner from '../../components/Spinner';
const { Option } = Select;


const AdminOrder = () => {
    const [status, setStatus] = useState(["Not Process", "Processing", "Shipped", "Delivered", "Canceled"]);
    const [auth] = useAuth();
    const [orders, setOrders] = useState([]);
    const [spinnerLoading, setSpinnerLoading] = useState(true);
    const [statusUpdateLoading, setStatusUpdateLoading] = useState(null);


    //get all orders
    const getOrders = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/order/all-orders`)
            setOrders(data)
        } catch (error) {
            console.log(error);
        } finally {
            setSpinnerLoading(false)
        }
    }

    useEffect(() => {
        if (auth?.token) getOrders();
    }, [auth?.token])

    //order status change
    const handleChange = async (orderId, value) => {
        try {
            setStatusUpdateLoading(orderId);
            const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/order/order-status/${orderId}`, { status: value })
            getOrders();
            toast.success(
                <span>
                    Order <b>{value}</b>
                </span>
            );
            setStatusUpdateLoading(null);
        } catch (error) {
            console.error(error);
            toast.error('Something went wrong');
            setStatusUpdateLoading(null);
        }
    }

    //delete orders
    const handleDelete = async (oId) => {
        try {
            let answer = window.confirm("Are you sure want to delete this product?")
            if (!answer) return;
            const { data } = await axios.delete(`${process.env.REACT_APP_API}/api/v1/order/delete-order/${oId}`);
            if (data.success) {
                toast.success(`Order deleted successfully`);
                getOrders();
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error('Something wrong while Delete')
        }
    }

    //url checker
    const isUrl = (str) => {
        try {
            new URL(str);
            return true;
        } catch {
            return false;
        }
    };

    return (
        <Layout title={"Admin - All Orders"}>
            <div className="container-fluid mt-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h2 className="text-center my-3">All Orders ({orders.length})</h2>
                        {spinnerLoading ? <div className="d-flex flex-column align-items-center justify-content-center" style={{ height: "50vh" }}><Spinner /></div> : <>
                            {orders?.length < 1 ? <h5 className='text-center'>No Pending Order</h5> : <>
                                {orders?.map((o, i) => {
                                    const productQuantities = o.products.reduce((acc, product) => {
                                        acc[product._id] = (acc[product._id] || 0) + 1;
                                        return acc;
                                    }, {});

                                    const uniqueProducts = o.products.filter(
                                        (product, index, self) =>
                                            index === self.findIndex((p) => p._id === product._id)
                                    );

                                    return (
                                        <div className="border m-2 table-container">
                                            <table className="table">
                                                <thead className='table-dark' >
                                                    <tr>
                                                        <th scope="col">#</th>
                                                        <th scope="col">Status</th>
                                                        <th scope="col">Client</th>
                                                        <th scope="col">Note</th>
                                                        <th scope="col">Address</th>
                                                        <th scope="col">Phone</th>
                                                        <th scope="col">Amount</th>
                                                        <th scope="col">Quantity</th>
                                                        <th scope="col">Updated</th>
                                                        <th scope="col">Created</th>
                                                        <th scope="col">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <th scope='row' data-bs-toggle="collapse" href={`#${o?._id}`}>
                                                            <i class="btn fa-solid fa-chevron-down"></i> {i + 1}
                                                        </th>
                                                        <td>
                                                            <Select
                                                                loading={statusUpdateLoading === o._id}
                                                                onChange={(value) => handleChange(o._id, value)}
                                                                defaultValue={o?.status}>
                                                                {status.map((s, i) => (
                                                                    <Option key={i} value={s}>{s}</Option>
                                                                ))}
                                                            </Select>
                                                        </td>
                                                        <td>
                                                            {
                                                                o?.buyer ? o?.buyer?.name : <span class="badge text-bg-danger">Deleted User</span>
                                                            }
                                                        </td>
                                                        <td className='fst-italic'>
                                                            <p>
                                                                {o?.orderNote === "" ? "---" : o?.orderNote}
                                                            </p>
                                                        </td>
                                                        <td>
                                                            {isUrl(o?.orderAddress) ? (
                                                                <a href={o?.orderAddress} target="_blank" rel="noopener noreferrer">
                                                                    Open Map
                                                                </a>
                                                            ) : (
                                                                o?.orderAddress
                                                            )}
                                                        </td>
                                                        <td>
                                                            {o?.buyer?.phone ? o?.buyer?.phone : "---"}
                                                        </td>
                                                        <td> <b>BDT {o?.totalAmount}</b> </td>
                                                        <td>
                                                            <span class="badge rounded-pill text-bg-warning fs-6">{o?.products?.length}</span>
                                                        </td>
                                                        <td>{o.createdAt !== o.updatedAt ? moment(o?.updatedAt).fromNow() : "--"}</td>
                                                        <td>{moment(o?.createdAt).format('lll')}</td>
                                                        <td>
                                                            <button className="btn btn-danger ms-1 fw-bold" onClick={() => handleDelete(o._id)}><i class="fa-solid fa-trash-can"></i> Delete</button>
                                                        </td>

                                                    </tr>
                                                    <div>
                                                    </div>
                                                </tbody>
                                            </table>
                                            <div className="container collapse " id={o?._id}>
                                                <div className="d-flex flex-wrap">
                                                    <table className="table shadow">
                                                        <thead className='table-info'>
                                                            <tr>
                                                                <th>#</th>
                                                                <th>Photo</th>
                                                                <th>Name</th>
                                                                <th>Price</th>
                                                                <th>Quantity</th>
                                                                <th>Total</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {uniqueProducts.map((p, i) => (
                                                                <tr>
                                                                    <td>{i + 1}</td>
                                                                    <td>
                                                                        <Link to={`/catagories/${p?.catagory?.slug}/${p.slug}`}>
                                                                            <img
                                                                                src={p?.photo}
                                                                                className="img-thumbnail"
                                                                                alt={p.name}
                                                                                width="100px"
                                                                                height={"100px"}
                                                                            />
                                                                        </Link>
                                                                    </td>
                                                                    <td>{p?.name}</td>
                                                                    <td>৳ {p?.price}</td>
                                                                    <td>
                                                                        <span class="badge rounded-pill text-bg-dark fs-6"> {productQuantities[p._id]}</span>
                                                                    </td>
                                                                    <td>৳ {p.price * productQuantities[p._id]}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </>}
                        </>}
                    </div>
                </div>
            </div>
        </Layout>
    );
};
export default AdminOrder;