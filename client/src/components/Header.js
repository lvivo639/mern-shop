import React from 'react';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {userLogoutAction} from "../actions/userActions";

const Header = ({history}) => {
    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)

    const {userInfo} = userLogin

    const logoutHandler = () => {
        dispatch(userLogoutAction())
        history.push('/')
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

                        {userInfo && userInfo.isAdmin && (
                            <li className="nav-item dropdown">
                                <div className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                                   data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Admin
                                </div>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <Link to='/admin/userlist'>
                                        <div className="dropdown-item">Users</div>
                                    </Link>
                                    <Link to='/admin/productlist'>
                                        <div className="dropdown-item">Products</div>
                                    </Link>
                                    <Link to='/admin/orderlist'>
                                        <div className="dropdown-item">Orders</div>
                                    </Link>
                                </div>
                            </li>
                        )}

                    </ul>
                </div>
            </nav>
        </header>
    );
};

export default Header;