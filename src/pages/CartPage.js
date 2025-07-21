import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import { useCart } from '../components/context/cart';
import { useAuth } from '../components/context/auth';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import GoBackButton from '../components/GoBackButton';
import { Input, Spin } from 'antd';
import { AimOutlined } from '@ant-design/icons';
import '../style/AuthStyle.css';


const CartPage = () => {
    const [auth] = useAuth();
    const [cart, setCart] = useCart();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [locationLoading, setLocationLoading] = useState(false);
    const [orderAddress, setOrderAddress] = useState(auth?.user?.address || '');
    const [orderNote, setOrderNote] = useState("");
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
                setOrderAddress(mapLink);
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


    //total pricing
    const totalPrice = () => {
        try {
            let total = 0;
            cart?.forEach((item) => { total += item.price });
            return total.toLocaleString("en-US", {
                style: "currency",
                currency: "BDT"
            });
        } catch (error) {
            console.log(error);
        }
    };

    // Increase adn Decrease Cart Item
    const increaseCartItem = (item) => {
        try {
            setCart([...cart, item]);
            localStorage.setItem('cart', JSON.stringify([...cart, item]));
        } catch (error) {
            console.log(error);
        }
    };

    const decreaseCartItem = (pid) => {
        try {
            let myCart = [...cart];
            let index = myCart.findIndex(item => item._id === pid);
            if (index !== -1) {
                myCart.splice(index, 1);
                setCart(myCart);
                localStorage.setItem('cart', JSON.stringify(myCart));
            }
        } catch (error) {
            console.log(error);
        }
    };

    //remove cart item
    const removeCartItem = (pid) => {
        try {
            let myCart = cart.filter(item => item._id !== pid);
            setCart(myCart);
            localStorage.setItem('cart', JSON.stringify(myCart));
        } catch (error) {
            console.log(error);
        }
    };

    //show each product for one time with required quantity, avoid duplication in cart
    const uniqueCartItems = Array.from(new Set(cart.map(item => item._id)))
        .map(id => {
            const item = cart.find(item => item._id === id);
            return {
                ...item,
                count: cart.filter(cartItem => cartItem._id === id).length,
            };
        });


    //payment handling 
    const handleOrder = async () => {
        try {
            let answer = window.confirm("Are you sure you want to place this order?");
            if (!answer) return;
            setLoading(true);
            const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/order/create-order`, {
                cart, orderAddress, orderNote
            });
            setLoading(false);
            localStorage.removeItem('cart');
            setCart([]);
            navigate("/dashboard/user/orders");
            toast.success("Order Placed Successfully");
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    return (
        <Layout>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="row align-items-center bg-light my-2">
                            <div className="col-auto">
                                <GoBackButton />
                            </div>
                            <div className="col">
                                <h3 className='text-center mb-0 me-5 p-3'>
                                    Hello <span className='text-success'>{` ${auth?.token && auth?.user.name}`}</span>
                                </h3>
                            </div>
                        </div>
                        <h5 className='text-center my-4'>
                            {uniqueCartItems.length
                                ? `You have ${cart.length} quantity of ${uniqueCartItems.length} food items in your cart. ${auth?.token ? "" : "Please Log in to Checkout"}`
                                : <>Your Cart is Empty. Visit {<Link to="/">Home</Link>} to order.</>}
                        </h5>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-8">
                        <div className="row mb-2">
                            <div className="table-container">
                                <table className="table">
                                    <thead className='table-dark'>
                                        <tr>
                                            <th>#</th>
                                            <th>Photo</th>
                                            <th>Name</th>
                                            <th>Price</th>
                                            <th>Quantity</th>
                                            <th>Unit</th>
                                            <th>Remove</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            uniqueCartItems.map((p, i) => (
                                                <tr>
                                                    <td>{i + 1}</td>
                                                    <td>
                                                        <Link to={`/catagories/${p?.catagory?.slug}/${p.slug}`}>
                                                            <img src={p?.photo} className="imgFit img-fluid" alt={p.name} width={"50px"} height={"100px"} />
                                                        </Link>
                                                    </td>
                                                    <td>{p?.name}</td>
                                                    <td>{p?.price} BDT</td>
                                                    <td>
                                                        <div className="d-flex">
                                                            <button className='btn btn-danger' onClick={() => decreaseCartItem(p._id)}>-</button>
                                                            <span className='mx-2 border border-warning p-2 rounded'><b>{p?.count}</b></span>
                                                            <button className='btn btn-secondary' onClick={() => increaseCartItem(p)}>+</button>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        {p.price * p.count} BDT
                                                    </td>
                                                    <td>
                                                        <button className='btn btn-danger' onClick={() => removeCartItem(p._id)}><i className="fa-solid fa-trash-can"></i></button>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card p-4 mb-3">
                            <h3 className='text-center'>Cart Summary</h3>
                            <hr />
                            <h4>Total: {totalPrice()} + Delivery </h4>
                            <h6>Total Item: {uniqueCartItems.length}</h6>
                            <h6>Total Quantity: {cart.length}</h6>

                            {auth?.user?.address ? (
                                <div className="mb-3">
                                    <h6 className='fw-bold mb-3'>Current Address:</h6>
                                    <div className="mb-3 text-center">
                                        <Input
                                            suffix={
                                                (
                                                    locationLoading ? <Spin size="small" />
                                                        : <span onClick={getLocation} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                                                            <AimOutlined />
                                                        </span>
                                                )
                                            }
                                            type="text"
                                            placeholder='Order Address'
                                            size="large"
                                            className='mb-2 w-100'
                                            value={orderAddress || auth?.user?.address}
                                            onChange={(e) => setOrderAddress(e.target.value)}
                                            required
                                        />
                                        <span className='text-secondary form-text'> Click <b><AimOutlined /></b>  to set your current location or update <Link to="/dashboard/user/profile">your address</Link> </span>
                                    </div>
                                    <div>
                                        <textarea
                                            className='form-control'
                                            rows={3}
                                            placeholder='Note if you want to add'
                                            value={orderNote}
                                            onChange={(e) => setOrderNote(e.target.value)} />
                                    </div>
                                </div>
                            ) : (
                                <div className="mb-3">
                                    {auth?.token ? (
                                        <button className='btn btn-outline-warning' onClick={() => navigate("/dashboard/user/profile")}>Update Address</button>
                                    ) : (
                                        <button className='btn btn-warning' onClick={() => navigate("/login", { state: "/cart" })}>Please Login to Checkout</button>
                                    )}
                                </div>
                            )}
                            <div className="mt-2">
                                {!cart.length ? ("") : (
                                    <div className='drop-in border rounded p-4 my-3 bg-white shadow-sm'>
                                        <h4 className="text-dark mb-3">
                                            Payment Method: Cash on Delivery
                                        </h4>

                                        <div className="text-center">
                                            <button
                                                className='btn btn-warning px-4 py-2 fw-semibold'
                                                onClick={handleOrder}
                                                disabled={loading || !auth?.user?.address}
                                            >
                                                {loading ? (
                                                    <>
                                                        <span className="spinner-border spinner-border-sm me-2"></span>
                                                        Processing...
                                                    </>
                                                ) : "Place Order"}
                                            </button>
                                        </div>
                                    </div>
                                )}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout >
    );
};

export default CartPage;