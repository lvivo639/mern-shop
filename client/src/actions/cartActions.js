import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_SAVE_PAYMENT_METHOD,
    CART_SAVE_SHIPPING_ADDRESS
} from "../actionTypes/cartActionTypes";
import axios from "axios";

export const addToCartAction = (id, qty) => async (dispatch, getState) => {
    const {data} = await axios.get(`/api/products/${id}`)

    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qty: Math.min(qty, data.countInStock)
        }
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeFromCartAction = (id) => (dispatch, getState) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const saveShippingAddressAction = (data) => (dispatch, getState) => {
    dispatch({
        type: CART_SAVE_SHIPPING_ADDRESS,
        payload: data
    })

    localStorage.setItem('shippingAddress', JSON.stringify(data))
}

export const savePaymentMethodAction = (data) => (dispatch, getState) => {
    dispatch({
        type: CART_SAVE_PAYMENT_METHOD ,
        payload: data
    })

    localStorage.setItem('paymentMethod', JSON.stringify(data))
}



