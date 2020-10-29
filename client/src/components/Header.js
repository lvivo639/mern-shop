import React from 'react';
import {Link} from "react-router-dom";

const Header = () => {
    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <Link to='/'>
                        <div className="navbar-brand">MERN Shop</div>
                    </Link>
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link to='/'>
                                <div className="nav-link" href="#">Cart</div>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/'>
                                <div className="nav-link" href="#">Sign in</div>
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
};

export default Header;