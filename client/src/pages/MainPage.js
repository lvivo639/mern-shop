import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import ProductCard from "../components/ProductCard";
import {productListAction} from "../actions/productActions";
import Loading from "../components/Loading";
import Message from "../components/Message";
import getSearchParam from "../utils/getSearchParam";
import Paginate from "../components/Paginate";

const MainPage = ({location}) => {
    const keyword = getSearchParam(location.search, 's', '')
    const pageNumber = getSearchParam(location.search, 'pageNumber', '1')

    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const {loading, error, products, page, pages} = productList

    useEffect(() => {
        dispatch(productListAction(keyword, pageNumber))
    }, [dispatch, keyword, pageNumber, location])

    return (
        <div>
            <h1>Latest products</h1>
            {loading
                ? <Loading/>
                : error
                    ? <Message variant='danger'>{error}</Message>
                    : (
                        <>
                            <div className="row">
                                {products.map(product =>
                                    <div key={product._id} className="py-3 col col-xl-4">
                                        <ProductCard product={product}/>
                                    </div>
                                )}
                            </div>
                            <Paginate toLink={`/?${keyword ? `s=${keyword}&pageNumber=` : 'pageNumber='}`}
                                      page={page}
                                      pages={pages}/>
                        </>
                    )
            }
        </div>
    );
};

export default MainPage;