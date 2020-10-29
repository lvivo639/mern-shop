import React from 'react';
import Rating from "./Rating";
import {Link} from "react-router-dom";

const ProductCard = ({product}) => {
    return (
        <div className="card ">
            <Link to={`/product/${product._id}`}>
                <img className="card-img-top" src={product.image} alt={product.name}/>
            </Link>
            <div className="card-body">
                <Link to={`/product/${product._id}`}>
                    <h5 className="card-title">{product.name}</h5>
                </Link>
                <h6 className="card-subtitle mb-2 text-muted">${product.price}</h6>
                <Rating value={product.rating} text={`${product.numReviews} reviews`}/>
            </div>
        </div>
    );
};

export default ProductCard;