import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loading from '../components/Loading'
import {productListAction} from '../actions/productActions'
import {Link} from "react-router-dom";

const ProductListPage = ({history, match}) => {
    const dispatch = useDispatch()

    const productList = useSelector((state) => state.productList)
    const {loading, error, products} = productList

    const userLogin = useSelector((state) => state.userLogin)
    const {userInfo} = userLogin

    const productDelete = useSelector((state) => state.productDelete)
    const {
        loading: loadingDelete,
        error: errorDelete,
        success: successDelete,
    } = productDelete

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(productListAction())
        } else {
            history.push('/login')
        }
    }, [dispatch, history, userInfo, successDelete])

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure')) {
            dispatch(deleteProduct(id))
        }
    }

    const createProductHandler = (product) => {
        //   CREATE PRODUCT
    }

    return (
        <>
            <div className='row align-items-center'>
                <div className="col">
                    <h1>Products</h1>
                </div>
                <div className='col text-right'>
                    <button className='btn btn-secondary my-3' onClick={createProductHandler}>
                        <i className='fas fa-plus'/> Create Product
                    </button>
                </div>
            </div>
            {loadingDelete && <Loading />}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
            {loading ? (
                <Loading/>
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <table className="table table-striped table-bordered table-hover table-responsive">

                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>PRICE</th>
                        <th>CATEGORY</th>
                        <th>BRAND</th>
                        <th> </th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.map((product) => (
                        <tr key={product._id}>
                            <td>{product._id}</td>
                            <td>{product.name}</td>
                            <td>${product.price}</td>
                            <td>{product.category}</td>
                            <td>{product.brand}</td>
                            <td>
                                <Link to={`/admin/product/${product._id}/edit`}>
                                    <button className='btn btn-sm btn-secondary'>
                                        <i className='fas fa-edit'/>
                                    </button>
                                </Link>
                                <button
                                    className='btn btn-danger btn-sm'
                                    onClick={() => deleteHandler(product._id)}
                                >
                                    <i className='fas fa-trash'/>
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </>
    )
}

export default ProductListPage