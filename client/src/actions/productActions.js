import {
    PRODUCT_DETAILS_ERROR,
    PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS,
    PRODUCT_LIST_ERROR,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS
} from "../actionTypes/productActionTypes";
import axios from "axios";

export const productListAction = () => async (dispatch) => {
    dispatch({type: PRODUCT_LIST_REQUEST})
    try {
        const {data} = await axios.get('/api/products')
        dispatch({type: PRODUCT_LIST_SUCCESS, payload: data})
    } catch (err) {
        dispatch({
            type: PRODUCT_LIST_ERROR,
            payload: err.response && err.response.data.message
                ? err.response.data.message
                : err.message
        })
    }
}

export const productDetailsAction = (productId) => async (dispatch) => {
    dispatch({type: PRODUCT_DETAILS_REQUEST})
    try {
        const {data} = await axios.get(`/api/products/${productId}`)
        dispatch({type: PRODUCT_DETAILS_SUCCESS, payload: data})
    } catch (err) {
        dispatch({
            type: PRODUCT_DETAILS_ERROR,
            payload: err.response && err.response.data.message
                ? err.response.data.message
                : err.message
        })
    }
}