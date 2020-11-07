import React, {useEffect, useState} from 'react';
import FormContainer from "../components/FormContainer";
import {Link} from "react-router-dom";
import getSearchParam from "../utils/getSearchParam";
import {useDispatch, useSelector} from "react-redux";
import Message from "../components/Message";
import Loading from "../components/Loading";
import {userRegisterAction} from "../actions/userActions";

const RegisterPage = ({location, history}) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()
    const userRegister = useSelector(state => state.userRegister)

    const {loading, error, userInfo} = userRegister

    const redirect = getSearchParam(location.search, 'redirect', null)


    useEffect(() => {
        if (userInfo) history.push('/')
    }, [history, userInfo, redirect])

    const submitHandler = e => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage('Passwords must match')
        } else {
            setMessage('')
            dispatch(userRegisterAction(name, email, password))
        }
    }

    return (
        <FormContainer>
            <h1>Sign Up</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {message && <Message variant='danger'>{message}</Message>}
            {loading && <Loading/>}
            <form className='py-3' onSubmit={submitHandler}>
                <div className="form-group">
                    <label htmlFor="exampleInputName">Name</label>
                    <input type="text" className="form-control" id="exampleInputName"
                           placeholder="Enter name" onChange={e => setName(e.target.value)} value={name}/>
                </div>
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
                <div className="form-group">
                    <label htmlFor="exampleInputPassword2">Confirm password</label>
                    <input type="password" className="form-control" id="exampleInputPassword2" placeholder="Password"
                           onChange={e => setConfirmPassword(e.target.value)} value={confirmPassword}/>
                </div>

                <button type="submit" className="btn btn-primary">Log In</button>
            </form>
            <div className="row py-3">
                <span>Have an account?</span>
                <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                    Login
                </Link>
            </div>
        </FormContainer>
    );
};

export default RegisterPage;