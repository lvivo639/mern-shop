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
                        <input
                            type='radio'
                            label='PayPal or Credit Card'
                            id='PayPal'
                            name='paymentMethod'
                            value='PayPal'
                            checked
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                    </div>
                </div>

                <Button type='submit' variant='primary'>
                    Continue
                </Button>
            </form>
        </FormContainer>
    )
}

export default PaymentPage