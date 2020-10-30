import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import axios from "axios";

const ProductPage = ({match}) => {
    const [product, setProduct] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const {data} = await axios.get(`/products/${match.params.id}`)
            setProduct(data)
        }
        fetchData()
    }, [])

    return (
        <div>
            <Link to='/'>
                <button className="btn btn-outline-secondary">Go Back</button>
            </Link>
            <div className="row py-4">
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
                        <li className="list-group-item">
                            <button className="btn btn-primary btn-lg" disabled={product.countInStock <= 0}>
                                Add to cart
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;