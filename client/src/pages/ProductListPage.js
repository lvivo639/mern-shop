import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loading from '../components/Loading'
import {createProductAction, deleteProductAction, productListAction} from '../actions/productActions'
import {Link} from "react-router-dom";
import {PRODUCT_CREATE_RESET} from "../actionTypes/productActionTypes";

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

    const productCreate = useSelector((state) => state.productCreate)
    const {
        loading: loadingCreate,
        error: errorCreate,
        success: successCreate,
        product: createdProduct,
    } = productCreate

    useEffect(() => {
        dispatch({ type: PRODUCT_CREATE_RESET })

        if (!userInfo.isAdmin) {
            history.push('/login')
        }
        if (successCreate) {
            history.push(`/admin/product/${createdProduct._id}/edit`)
        } else {
            dispatch(productListAction())
        }
    }, [
        dispatch,
        history,
        userInfo,
        successDelete,
        successCreate,
        createdProduct,
    ])

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure')) {
            dispatch(deleteProductAction(id))
        }
    }

    const createProductHandler = (product) => {
        dispatch(createProductAction())
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
            {loadingCreate && <Loading />}
            {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
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