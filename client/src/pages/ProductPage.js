import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {productDetailsAction} from "../actions/productActions";
import Loading from "../components/Loading";
import Message from "../components/Message";
import Qty from "../components/Qty";
import Rating from "../components/Rating";
import styles from './productPage.module.css'

const ProductPage = ({match, history}) => {
    const dispatch = useDispatch()
    const productDetails = useSelector(state => state.productDetails)
    const {loading, error, product} = productDetails
    const [qty, setQty] = useState(1)

    useEffect(() => {
        dispatch(productDetailsAction(match.params.pid))
    }, [match, dispatch])

    const addToCartHandler = () => {
        history.push(`/cart/${match.params.pid}?qty=${qty}`)
    }

    return (
        <div>
            <Link to='/'>
                <button className="btn btn-outline-secondary">Go Back</button>
            </Link>
            {loading
                ? <Loading/>
                : error
                    ? <Message variant='danger'>{error}</Message>
                    : <div className="row py-4">
                        <div className="col-5">
                            <img src={product.image} alt="" className="img-fluid"/>
                        </div>
                        <div className="col-4">
                            <div className="h2">{product.name}</div>
                            <p>{product.description}</p>
                        </div>
                        <div className="col-3">
                            <ul className="list-group">
                                <li className={`list-group-item ${styles.info__item}`}>
                                    <span>Price:</span>
                                    <span>$ {product.price}</span>
                                </li>
                                <li className={`list-group-item ${styles.info__item}`}>
                                    <span>Rating:</span>
                                    <div className={styles.rating}>
                                        <Rating value={product.rating} text={`${product.numReviews} reviews`}/>
                                    </div>
                                </li>
                                <li className={`list-group-item ${styles.info__item}`}>
                                    <span>Status:</span>
                                    <span>{product.countInStock > 0 ? 'In stock' : 'Out of stock'}</span>
                                </li>
                                {product.countInStock > 0 &&
                                <li className={`list-group-item ${styles.info__item}`}>
                                    <span>Qty:</span>
                                    <Qty maxCount={product.countInStock} count={qty} setCount={setQty}/>
                                </li>
                                }
                                <li className="list-group-item text-center">
                                    <button className="btn btn-primary btn-md "
                                            disabled={product.countInStock <= 0}
                                            onClick={addToCartHandler}
                                    >
                                        Add to cart
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
            }
        </div>
    );
};

export default ProductPage;