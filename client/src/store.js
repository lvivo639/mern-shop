import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {productDetailsDeReducer, productListReducer} from "./reducers/productReducer";
import {cartReducer} from "./reducers/cartReducer";

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsDeReducer,
    cart: cartReducer
})

const cartItemsFromStorage = localStorage.getItem('cartItems')

const initialState = {
    cart: {
        cartItems: cartItemsFromStorage ? JSON.parse(cartItemsFromStorage) : []
    }
}

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(
        thunk,
    ))
)

export default store