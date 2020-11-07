import React, {useEffect, useState} from 'react';
import FormContainer from "../components/FormContainer";
import {Link} from "react-router-dom";
import getSearchParam from "../utils/getSearchParam";
import {useDispatch, useSelector} from "react-redux";
import {userLoginAction} from "../actions/userActions";
import Message from "../components/Message";
import Loading from "../components/Loading";

const LoginPage = ({location, history}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const {loading, error, userInfo} = userLogin

    const redirect = getSearchParam(location.search, 'redirect', '/')

    const submitHandler = e => {
        e.preventDefault()
        dispatch(userLoginAction(email, password))

    }

    useEffect(() => {
        if (userInfo) history.push(redirect)
    }, [history, userInfo, redirect])

    return (
        <FormContainer>
            <h1>Sign In</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loading/>}
            <form className='py-3' onSubmit={submitHandler}>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                           placeholder="Enter email" onChange={e => setEmail(e.target.value)} value={email}/>
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone
                        else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"
                           onChange={e => setPassword(e.target.value)} value={password}/>
                </div>
                <button type="submit" className="btn btn-primary">Log In</button>
            </form>
            <div className="row py-3">
                <span>New customer?</span>
                <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                    Register
                </Link>
            </div>
        </FormContainer>
    );
};

export default LoginPage;