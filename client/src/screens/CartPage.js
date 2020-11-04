import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {addToCartAction, removeFromCartAction} from "../actions/cartActions";
import Message from "../components/Message";
import styles from './cartPage.module.css'

const CartPage = ({match, location}) => {
    const pid = match.params.pid
    const dispatch = useDispatch()

    useEffect(() => {
        if (pid) {
            let qty = 1
            try {
                qty = location.search.match(/qty=([^&]*)/i)[1]
            } catch (e) {
            }
            dispatch(addToCartAction(pid, qty))
        }
    }, [dispatch, pid, location])

    const cart = useSelector(state => state.cart)
    const {cartItems} = cart

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCartAction(id))
    }

    const checkOutHandled = () => {
        console.log('checkout')
    }

    return (
        <div className={styles.cart}>
            <h1>Shopping cart</h1>
            <div className="row">
                <div className="col-8">
                    {cartItems.leading === 0 ? (
                        <Message>
                            Your cart is empty <Link to='/'>Go back</Link>
                        </Message>
                    ) : (
                        <ul className="list-group">
                            {cartItems.map(item => (
                                <li className="list-group-item" key={item.product}>
                                    <div className={`row ${styles.cartItem}`}>
                                        <div className="col col-md-2">
                                            <img src={item.image} alt="" className="img-fluid"/>
                                        </div>
                                        <div className="col col-md-5">
                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                        </div>
                                        <div className="col col-md-2">
                                            $ {item.price}
                                        </div>
                                        <select
                                            value={item.qty}
                                            onChange={(e) =>
                                                dispatch(
                                                    addToCartAction(item.product, Number(e.target.value))
                                                )
                                            }
                                            className="form-control col col-md-2">
                                            {[...Array(item.countInStock).keys()].map((x) => (
                                                <option key={x + 1} value={x + 1}>
                                                    {x + 1}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="col col-md-1">
                                            <button className='btn btn-outline-primary'
                                                    onClick={() => removeFromCartHandler(item.product)}>
                                                <i className='fas fa-trash'/>
                                            </button>
                                        </div>
                                    </div>

                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className="col-4">
                    <div className="card">
                        <ul className="list-group">
                            <li className="list-group-item">
                                <h3>
                                    Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                                    items
                                </h3>
                                $
                                {cartItems
                                    .reduce((acc, item) => acc + item.qty * item.price, 0)
                                    .toFixed(2)}
                            </li>
                            <li className="list-group-item">
                                <button className="btn btn-primary btn-md "
                                        disabled={cart.length <= 0}
                                        onClick={checkOutHandled}
                                >
                                    Proceed To Checkout
                                </button>

                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;