import React from 'react';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {userLogoutAction} from "../actions/userActions";

const Header = () => {
    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)

    const {userInfo} = userLogin

    const logoutHandler = () => {
        dispatch(userLogoutAction())
    }

    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <Link to='/'>
                        <div className="navbar-brand">MERN Shop</div>
                    </Link>
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link to='/cart'>
                                <div className="nav-link">Cart</div>
                            </Link>
                        </li>
                        {userInfo ? (
                            <>
                                <li className="nav-item">
                                    <Link to='/profile'>
                                        <div className="nav-link">{userInfo.name}</div>
                                    </Link>
                                </li>
                                <li className="nav-item" onClick={logoutHandler}>
                                    <div className="nav-link">Logout</div>
                                </li>
                            </>
                        ) : (
                            <li className="nav-item">
                                <Link to='/login'>
                                    <div className="nav-link">Sign in</div>
                                </Link>
                            </li>
                        )}

                    </ul>
                </div>
            </nav>
        </header>
    );
};

export default Header;