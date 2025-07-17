import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useCart } from '../components/context/cart';
import GoBackButton from '../components/GoBackButton';
import FloatingCartButton from '../components/FloatingCartButton';
import Spinner from '../components/Spinner';
import { useAuth } from '../components/context/auth';
import { Image } from 'antd';

const ProductDetails = () => {
    const [auth] = useAuth();
    const navigate = useNavigate();
    const params = useParams();
    const [cart, setCart] = useCart();
    const [product, setProduct] = useState({});
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [spinnerLoading, setSpinnerLoading] = useState(true);

    //initial p data
    useEffect(() => {
        if (params?.slug) getProduct();
    }, [params?.slug])

    //get products
    const getProduct = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`);
            setProduct(data?.product)
            getSimilarProduct(data?.product._id, data?.product.catagory._id);
        } catch (error) {
            console.log(error);
        }
        finally {
            setSpinnerLoading(false)
        }
    }
    //get similar product
    const getSimilarProduct = async (pid, cid) => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/related-product/${pid}/${cid}`);
            setRelatedProducts(data?.products)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [navigate]);

    return (
        <Layout>
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-auto">
                        <GoBackButton />
                    </div>
                    <div className="col">
                        <h4 className="mb-0 me-5 p-3 text-center">Food Details</h4>
                    </div>
                </div>
                {spinnerLoading ?
                    <div className="d-flex flex-column align-items-center justify-content-center" style={{ height: "50vh" }}>
                        <Spinner />
                    </div> :
                    <div className="row mt-3 d-flex justify-content-center align-items-center">
                        <div className="col-md-4">
                            <Image src={product?.photo} className="card-img-top cardImg" alt={product?.name} />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <span className='justify-content-between d-flex align-items-center mt-3'>
                                    <h2>{product?.name}</h2>
                                    {
                                        auth?.user?.role === 1 && (
                                            <Link
                                                key={product._id}
                                                to={`/dashboard/admin/product/${product?.slug}`}
                                                className="product-link">
                                                <button className='btn btn-primary mb-3'>
                                                    <i className="fa-solid fa-pen-to-square" /> Edit
                                                </button>
                                            </Link>
                                        )
                                    }
                                </span>
                                <p className="card-text">{product?.description}</p>
                        
                                <h6 className="card-text">Price: {product?.price} BDT + Delivery Fee</h6>
                                <p className="card-text">Delivery fee is based on distance, time of day, and conditions.</p>
                             
                            </div>
                            <button className='btn btn-secondary my-3'
                                onClick={() => {
                                    setCart([...cart, product])
                                    toast.success(`${product?.name} added to Cart`)
                                }}>
                                <i className="fa-solid fa-plus"></i>  Add Cart </button>
                        </div>
                    </div>}
                <hr />
                <div className="row">
                    <h3 className='text-center'>Some Other Food You Might Enjoy!</h3>
                    {spinnerLoading ? <div className='my-5'><Spinner /></div> : <>
                        {relatedProducts?.length < 1 && (<p className="text-center">No Similar Product Found</p>)}
                        <div className="d-flex flex-wrap justify-content-md-start justify-content-center">

                            {relatedProducts?.map(p => (
                                <div className="card m-2" style={{ width: '18rem' }} key={p._id}>
                                    <img src={p?.photo} className="cardImg card-img-top p-2" alt={p.name} />
                                    <div className="card-body">
                                        <h5 className="card-title">{p.name}</h5>
                                        <p className="card-text">{p.description.substring(0, 50)}...</p>
                                        <h6 className="card-text">Price: {p.price} BDT</h6>
                                    </div>
                                    <div className='card-footer d-flex justify-content-center'>
                                        <button className='btn btn-primary m-1' onClick={() => navigate(`/catagories/${p?.catagory?.slug}/${p?.slug}`)}>More Details</button>
                                        <button className='btn btn-secondary m-1'
                                            onClick={() => {
                                                setCart([...cart, p])
                                                toast.success(`${p.name} Added to Cart`)
                                            }}>
                                            <i className="fa-solid fa-plus"></i>  Add Cart </button>
                                    </div>
                                </div>
                            ))}
                        </div></>}
                </div>
            </div>
            <FloatingCartButton />
        </Layout>
    );
};

export default ProductDetails;