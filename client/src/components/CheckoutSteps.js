import React from 'react'
import {Link} from "react-router-dom";

const CheckoutSteps = ({step1, step2, step3, step4}) => {
    return (
        <div className='nav justify-content-center mb-4'>
            <div className="nav-item">
                {step1 ? (
                    <Link to='/login'>
                        <div className="nav-link">Sign In</div>
                    </Link>
                ) : (
                    <div className="nav-link disabled">Sign In</div>
                )}
            </div>

            <div className="nav-item">
                {step2 ? (
                    <Link to='/shipping'>
                        <div className="nav-link">Shipping</div>
                    </Link>
                ) : (
                    <div className="nav-link disabled">Shipping</div>
                )}
            </div>

            <div className="nav-item">
                {step3 ? (
                    <Link to='/payment'>
                        <div className="nav-link">Payment</div>
                    </Link>
                ) : (
                    <div className="nav-link disabled">Payment</div>
                )}
            </div>

            <div className="nav-item">
                {step4 ? (
                    <Link to='/placeorder'>
                        <div className="nav-link">Place Order</div>
                    </Link>
                ) : (
                    <div className="nav-link disabled">Place Order</div>
                )}
            </div>
        </div>
    )
}

export default CheckoutSteps