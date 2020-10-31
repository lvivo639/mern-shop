import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import ProductCard from "../components/ProductCard";
import {productListAction} from "../actions/productActions";
import Loading from "../components/Loading";
import Message from "../components/Message";

const MainPage = () => {
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const {loading, error, products} = productList

    useEffect(() => {
        dispatch(productListAction())
    }, [dispatch])

    return (
        <div>
            <h1>Latest products</h1>
            {loading
                ? <Loading/>
                : error
                    ? <Message variant='danger'>{error}</Message>
                    : <div className="row">
                        {products.map(product =>
                            <div key={product._id} className="py-3 col col-xl-4">
                                <ProductCard product={product}/>
                            </div>
                        )}
                    </div>
            }
        </div>
    );
};

export default MainPage;