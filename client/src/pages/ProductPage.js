import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {createProductReviewAction, productDetailsAction} from "../actions/productActions";
import Loading from "../components/Loading";
import Message from "../components/Message";
import Qty from "../components/Qty";
import Rating from "../components/Rating";
import styles from './productPage.module.css'
import {PRODUCT_CREATE_REVIEW_RESET} from "../actionTypes/productActionTypes";

const ProductPage = ({match, history}) => {
    const dispatch = useDispatch()

    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState('5')
    const [comment, setComment] = useState('')

    const productDetails = useSelector(state => state.productDetails)
    const {loading, error, product} = productDetails


    const userLogin = useSelector((state) => state.userLogin)
    const {userInfo} = userLogin

    const productReviewCreate = useSelector((state) => state.productReviewCreate)
    const {
        success: successProductReview,
        error: errorProductReview,
    } = productReviewCreate

    useEffect(() => {
        if (successProductReview) {
            alert('Review Submitted!')
            setRating(0)
            setComment('')
            dispatch({type: PRODUCT_CREATE_REVIEW_RESET})
        }

        dispatch(productDetailsAction(match.params.pid))
    }, [match, dispatch, successProductReview])

    const addToCartHandler = () => {
        history.push(`/cart/${match.params.pid}?qty=${qty}`)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(
            createProductReviewAction(match.params.pid, {
                rating,
                comment,
            })
        )
    }


    return (
        <div>
            <Link to='/'>
                <button className="btn btn-outline-secondary">Go Back</button>
            </Link>
            {loading
                ? (<Loading/>
                ) : (
                    error
                        ? (
                            <Message variant='danger'>{error}</Message>
                        ) : (
                            <>
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
                                <div className="row">
                                    <div className="col col-md-6">
                                        <h2>Reviews</h2>
                                        {product.reviews.length === 0 && <Message>No Reviews</Message>}
                                        <div className="list-group">
                                            {product.reviews.map((review) => (
                                                <div className="list-group-item" key={review._id}>
                                                    <strong>{review.name}</strong>
                                                    <Rating value={review.rating}/>
                                                    <p>{review.createdAt.substring(0, 10)}</p>
                                                    <p>{review.comment}</p>
                                                </div>
                                            ))}
                                            <div className="list-group-item">
                                                <h2>Write a Customer Review</h2>
                                                {errorProductReview && (
                                                    <Message variant='danger'>{errorProductReview}</Message>
                                                )}
                                                {userInfo ? (
                                                    <form onSubmit={submitHandler}>
                                                        <div className="form-group">
                                                            <label htmlFor="rating">Brand</label>
                                                            <select className="custom-select custom-select-lg mb-3"
                                                                    id='rating'
                                                                    value={rating}
                                                                    onChange={(e) => setRating(e.target.value)}>
                                                                <option value='1'>1 - Poor</option>
                                                                <option value='2'>2 - Fair</option>
                                                                <option value='3'>3 - Good</option>
                                                                <option value='4'>4 - Very Good</option>
                                                                <option value='5'>5 - Excellent</option>
                                                            </select>
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="comment">Comment</label>
                                                            <textarea
                                                                className="form-control"
                                                                id="comment"
                                                                rows="3"
                                                                value={comment}
                                                                onChange={(e) => setComment(e.target.value)}> </textarea>
                                                        </div>

                                                        <button className="btn btn-primary" type='submit'>
                                                            Submit
                                                        </button>
                                                    </form>
                                                ) : (
                                                    <Message>
                                                        Please <Link to='/login'>sign in</Link> to write a review{' '}
                                                    </Message>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )
                )

            }
        </div>
    );
};

export default ProductPage;