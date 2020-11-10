import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import {savePaymentMethodAction} from '../actions/cartActions'

const PaymentPage = ({history}) => {
    const cart = useSelector((state) => state.cart)
    const {shippingAddress} = cart

    if (!shippingAddress) {
        history.push('/shipping')
    }

    const [paymentMethod, setPaymentMethod] = useState('PayPal')

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethodAction(paymentMethod))
        history.push('/placeorder')
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3/>
            <h1>Payment Method</h1>
            <form onSubmit={submitHandler}>
                <div className="form-group">
                    <label>Select Method</label>
                    <div className='col'>
                        <div className="form-check">
                            <input className="form-check-input"
                                   type="radio"
                                   name="paymentMethod"
                                   id="PayPal"
                                   value="PayPal"
                                   checked
                                   onChange={(e) => setPaymentMethod(e.target.value)}/>
                                <label className="form-check-label" htmlFor="exampleRadios1">
                                    PayPal or Credit Card
                                </label>
                        </div>
                    </div>
                </div>

                <button className='btn btn-secondary' type='submit' variant='primary'>
                    Continue
                </button>
            </form>
        </FormContainer>
    )
}

export default PaymentPage