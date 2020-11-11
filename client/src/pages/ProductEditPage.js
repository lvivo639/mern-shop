import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import {productDetailsAction, updateProductAction} from '../actions/productActions'
import Loading from "../components/Loading";
import {PRODUCT_UPDATE_RESET} from "../actionTypes/productActionTypes";
import axios from 'axios'

const ProductEditPage = ({match, history}) => {
    const productId = match.params.id

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)

    const dispatch = useDispatch()

    const productDetails = useSelector((state) => state.productDetails)
    const {loading, error, product} = productDetails

    const productUpdate = useSelector((state) => state.productUpdate)
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = productUpdate

    useEffect(() => {
        if (successUpdate) {
            dispatch({type: PRODUCT_UPDATE_RESET})
            history.push('/admin/productlist')
        } else if (!product.name || product._id !== productId) {
            dispatch(productDetailsAction(productId))
        } else {
            setName(product.name)
            setPrice(product.price)
            setImage(product.image)
            setBrand(product.brand)
            setCategory(product.category)
            setCountInStock(product.countInSock)
            setDescription(product.description)
        }
    }, [dispatch, history, productId, product, successUpdate])

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }

            const {data} = await axios.post('/api/upload', formData, config)

            setImage(data)
            setUploading(false)
        } catch (error) {
            setUploading(false)
        }
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(
            updateProductAction({
                _id: productId,
                name,
                price,
                image,
                brand,
                category,
                description,
                countInStock,
            })
        )
    }

    return (
        <>
            <Link to='/admin/productlist' className='btn btn-light my-3'>
                Go Back
            </Link>
            <FormContainer>
                <h1>Edit Product</h1>
                {loadingUpdate && <Loading/>}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
                {loading ? (
                    <Loading/>
                ) : error ? (
                    <Message variant='danger'>{error}</Message>
                ) : (
                    <form onSubmit={submitHandler}>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input className="form-control"
                                   type='text'
                                   placeholder='Enter name'
                                   value={name}
                                   id="name"
                                   onChange={(e) => setName(e.target.value)}/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="price">Price</label>
                            <input className="form-control"
                                   type='text'
                                   id="price"
                                   placeholder='Enter price'
                                   value={price}
                                   onChange={(e) => setPrice(e.target.value)}/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="image">Image</label>
                            <input className="form-control"
                                   type='text'
                                   id="image"
                                   placeholder='Enter image url'
                                   value={image}
                                   onChange={(e) => setImage(e.target.value)}/>
                        </div>
                        <div className="custom-file">
                            <label className="custom-file-label" htmlFor="image-file">Choose image file</label>
                            <input type="file" className="custom-file-input" id="image-file"
                                   onChange={uploadFileHandler}/>
                        </div>

                        {uploading && <Loading/>}

                        <div className="form-group">
                            <label htmlFor="brand">Brand</label>
                            <input className="form-control"
                                   type='text'
                                   id="brand"
                                   placeholder='Enter Brand'
                                   value={brand}
                                   onChange={(e) => setBrand(e.target.value)}/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="countInStock">Count In Stock</label>
                            <input className="form-control"
                                   type='number'
                                   id="countInStock"
                                   placeholder='Enter countInStock'
                                   value={countInStock}
                                   onChange={(e) => setCountInStock(e.target.value)}/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="category">Category</label>
                            <input className="form-control"
                                   type='text'
                                   id="category"
                                   placeholder='Enter Category'
                                   value={category}
                                   onChange={(e) => setCategory(e.target.value)}/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <input className="form-control"
                                   type='text'
                                   id="description"
                                   placeholder='Enter Description'
                                   value={description}
                                   onChange={(e) => setDescription(e.target.value)}/>
                        </div>

                        <button className="btn btn-primary" type='submit'>
                            Update
                        </button>
                    </form>
                )}
            </FormContainer>
        </>
    )
}

export default ProductEditPage