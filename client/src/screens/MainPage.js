import React from 'react';
import products from "../products";
import ProductCard from "../components/ProductCard";

const MainPage = () => {
    return (
        <div>
            <h1>Latest products</h1>
            <div className="row">
                {products.map(product =>
                    <div key={product._id} className="py-3 col col-xl-4">
                        <ProductCard product={product}/>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MainPage;