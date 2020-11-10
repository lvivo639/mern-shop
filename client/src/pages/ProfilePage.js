import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Message from "../components/Message";
import Loading from "../components/Loading";
import {getUserDetailsAction, updateUserProfileAction} from "../actions/userActions";
import {listMyOrdersAction} from "../actions/orderActions";
import {Link} from "react-router-dom";

const ProfilePage = ({history}) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const {loading, error, user} = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
    const updateError = userUpdateProfile.error

    const orderListMy = useSelector((state) => state.orderListMy)
    const { loading: loadingOrders, error: errorOrders, orders } = orderListMy

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        } else {
            if (!user.name) {
                dispatch(getUserDetailsAction('profile'))
            } else {
                setName(user.name)
                setEmail(user.email)
            }
            dispatch(listMyOrdersAction())
        }
    }, [history, user, dispatch, userInfo])

    const submitHandler = e => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage('Passwords must match')
        } else {
            dispatch(updateUserProfileAction({email, name, password}))
        }
    }

    return (
        <div className="row">
            <div className="col col-md-3">
                <h2>My profile</h2>
                {error && <Message variant='danger'>{error}</Message>}
                {message && <Message variant='danger'>{message}</Message>}
                {updateError && <Message variant='danger'>Profile Updated</Message>}
                {loading && <Loading/>}
                <form className='py-3' onSubmit={submitHandler}>
                    <div className="form-group">
                        <label htmlFor="exampleInputName">Name</label>
                        <input type="text" className="form-control" id="exampleInputName"
                               placeholder="Enter name" onChange={e => setName(e.target.value)} value={name}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1"
                               aria-describedby="emailHelp"
                               placeholder="Enter email" onChange={e => setEmail(e.target.value)} value={email}/>
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone
                            else.</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1"
                               placeholder="Password"
                               onChange={e => setPassword(e.target.value)} value={password}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword2">Confirm password</label>
                        <input type="password" className="form-control" id="exampleInputPassword2"
                               placeholder="Password"
                               onChange={e => setConfirmPassword(e.target.value)} value={confirmPassword}/>
                    </div>

                    <button type="submit" className="btn btn-primary">Save</button>
                </form>
            </div>
            <div className="col col-md-9">
                <h2>My orders</h2>
                {loadingOrders ? (
                    <Loading />
                ) : errorOrders ? (
                    <Message variant='danger'>{errorOrders}</Message>
                ) : (
                    <table className="table table-striped table-bordered table-hover table-responsive">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>PAID</th>
                            <th>DELIVERED</th>
                            <th> </th>
                        </tr>
                        </thead>
                        <tbody>
                        {orders.map((order) => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.createdAt.substring(0, 10)}</td>
                                <td>{order.totalPrice}</td>
                                <td>
                                    {order.isPaid ? (
                                        order.paidAt.substring(0, 10)
                                    ) : (
                                        <i className='fas fa-times' style={{color: 'red'}}/>
                                    )}
                                </td>
                                <td>
                                    {order.isDelivered ? (
                                        order.deliveredAt.substring(0, 10)
                                    ) : (
                                        <i className='fas fa-times' style={{color: 'red'}}/>
                                    )}
                                </td>
                                <td>
                                    <Link to={`/order/${order._id}`}>
                                        <button className='btn btn-sm btn-secondary'>
                                            Details
                                        </button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default ProfilePage;