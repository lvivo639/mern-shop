import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {productDetailsAction} from "../actions/productActions";
import Loading from "../components/Loading";
import Message from "../components/Message";

const ProductPage = ({match}) => {
    const dispatch = useDispatch()
    const productDetails = useSelector(state => state.productDetails)
    const {loading, error, product} = productDetails

    useEffect(() => {
        dispatch(productDetailsAction(match.params.productId))
    }, [match])

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
                                <li className="list-group-item">Price: {product.price}</li>
                                <li className="list-group-item">Status: {product.countInStock > 0 ? 'In stock' : 'Out of stock'}</li>
                                <li className="list-group-item text-center">
                                    <button className="btn btn-primary btn-md " disabled={product.countInStock <= 0}>
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