import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loading from '../components/Loading'
import { getOrderDetailsAction } from '../actions/orderActions'

const OrderPage = ({ match }) => {
    const orderId = match.params.id

    const dispatch = useDispatch()

    const orderDetails = useSelector((state) => state.orderDetails)
    const { order, loading, error } = orderDetails

    if (!loading) {
        const addDecimals = (num) => {
            return (Math.round(num * 100) / 100).toFixed(2)
        }

        order.itemsPrice = addDecimals(
            order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
        )
    }

    useEffect(() => {
        dispatch(getOrderDetailsAction(orderId))
    }, [])

    return loading ? (
        <Loading />
    ) : error ? (
        <Message variant='danger'>{error}</Message>
    ) : (
        <>
            <h1>Order {order._id}</h1>
           <div className="row">
                <div className="col col-md-8">
                    <div className="list-group">
                        <div className="list-group-item">
                            <h2>Shipping</h2>
                            <p>
                                <strong>Name: </strong> {order.user.name}
                            </p>
                            <p>
                                <strong>Email: </strong>{' '}
                                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                            </p>
                            <p>
                                <strong>Address:</strong>
                                {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                                {order.shippingAddress.postalCode},{' '}
                                {order.shippingAddress.country}
                            </p>
                            {order.isDelivered ? (
                                <Message variant='success'>
                                    Delivered on {order.deliveredAt}
                                </Message>
                            ) : (
                                <Message variant='danger'>Not Delivered</Message>
                            )}
                        </div>

                        <div className="list-group-item">
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Method: </strong>
                                {order.paymentMethod}
                            </p>
                            {order.isPaid ? (
                                <Message variant='success'>Paid on {order.paidAt}</Message>
                            ) : (
                                <Message variant='danger'>Not Paid</Message>
                            )}
                        </div>

                        <div className="list-group-item">
                            <h2>Order Items</h2>
                            {order.orderItems.length === 0 ? (
                                <Message>Order is empty</Message>
                            ) : (
                                <div className="list-group">
                                    {order.orderItems.map((item, index) => (
                                        <div className="list-group-item" key={index}>
                                           <div className="row">
                                                <div className="col col-md-1">
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        className="fluid rounded"
                                                    />
                                                </div>
                                               <div className="col">
                                                    <Link to={`/product/${item.product}`}>
                                                        {item.name}
                                                    </Link>
                                                </div>
                                                <div className="col col-md-4">
                                                    {item.qty} x ${item.price} = ${item.qty * item.price}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                               </div>
                            )}
                        </div>
                   </div>
                </div>
                <div className="col col-md-4">
                    <div className="card">
                        <div className="list-group">
                            <div className="list-group-item">
                                <h2>Order Summary</h2>
                            </div>
                            <div className="list-group-item">
                               <div className="row">
                                    <div className="col">Items</div>
                                    <div className="col">${order.itemsPrice}</div>
                                </div>
                            </div>
                            <div className="list-group-item">
                               <div className="row">
                                    <div className="col">Shipping</div>
                                    <div className="col">${order.shippingPrice}</div>
                                </div>
                            </div>
                            <div className="list-group-item">
                               <div className="row">
                                    <div className="col">Tax</div>
                                    <div className="col">${order.taxPrice}</div>
                                </div>
                            </div>
                            <div className="list-group-item">
                               <div className="row">
                                    <div className="col">Total</div>
                                    <div className="col">${order.totalPrice}</div>
                                </div>
                            </div>
                       </div>
                   </div>
                </div>
            </div>
        </>
    )
}

export default OrderPage