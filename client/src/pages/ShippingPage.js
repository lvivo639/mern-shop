import React, {useState} from 'react';
import FormContainer from "../components/FormContainer";
import {useDispatch, useSelector} from "react-redux";
import {saveShippingAddressAction} from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

const ShippingPage = ({history}) => {
    const cart = useSelector((state) => state.cart)
    const { shippingAddress } = cart

    const [address, setAddress] = useState(shippingAddress.address || '')
    const [city, setCity] = useState(shippingAddress.city || '')
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '')
    const [country, setCountry] = useState(shippingAddress.country || '')

    const dispatch = useDispatch()

    const submitHandler = e => {
        e.preventDefault()
        dispatch(saveShippingAddressAction({ address, city, postalCode, country }))
        history.push('/payment')
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2/>
            <h1>Shipping address</h1>
            <form className='py-3' onSubmit={submitHandler}>
                <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input type="text" className="form-control" id="address"
                           placeholder="Enter address" onChange={e => setAddress(e.target.value)} value={address}/>
                </div>
                <div className="form-group">
                    <label htmlFor="city">City</label>
                    <input type="text" className="form-control" id="city"
                           placeholder="Enter city" onChange={e => setCity(e.target.value)} value={city}/>
                </div>
                <div className="form-group">
                    <label htmlFor="postal-code">Postal code</label>
                    <input type="text" className="form-control" id="postal-code"
                           placeholder="Enter email" onChange={e => setPostalCode(e.target.value)} value={postalCode}/>
                </div>
                <div className="form-group">
                    <label htmlFor="county">Country</label>
                    <input type="text" className="form-control" id="county"
                           placeholder="Enter county" onChange={e => setCountry(e.target.value)} value={country}/>
                </div>

                <button type="submit" className="btn btn-primary">Continue</button>
            </form>
        </FormContainer>
    );
};

export default ShippingPage;