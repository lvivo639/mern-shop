import {
    PRODUCT_DETAILS_ERROR,
    PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS,
    PRODUCT_LIST_ERROR,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS
} from "../actionTypes/productActionTypes";

export const productListReducer = (state = {
    products: []
}, action) => {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST: {
            return {loading: true, products: []}
        }
        case PRODUCT_LIST_SUCCESS: {
            return {loading: false, products: action.payload}
        }
        case PRODUCT_LIST_ERROR: {
            return {loading: false, error: action.payload}
        }
        default: {
            return state
        }
    }
}

export const productDetailsDeReducer = (state = {
    product: {reviews: []}
}, action) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST: {
            return {...state, loading: true}
        }
        case PRODUCT_DETAILS_SUCCESS: {
            return {loading: false, product: action.payload}
        }
        case PRODUCT_DETAILS_ERROR: {
            return {loading: false, error: action.payload}
        }
        default: {
            return state
        }
    }
}