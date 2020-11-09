import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {productDetailsDeReducer, productListReducer} from "./reducers/productReducer";
import {cartReducer} from "./reducers/cartReducer";
import {
    userDetailsReducer,
    userLoginReducer,
    userRegisterReducer,
    userUpdateProfileReducer
} from "./reducers/userReducer";

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsDeReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
})

const cartItemsFromStorage = localStorage.getItem('cartItems')
const userInfoFromStorage = localStorage.getItem('userInfo')
const shippingAddressFromStorage = localStorage.getItem('shippingAddress')

const initialState = {
    cart: {
        cartItems: cartItemsFromStorage ? JSON.parse(cartItemsFromStorage) : [],
        shippingAddress: shippingAddressFromStorage ? JSON.parse(shippingAddressFromStorage) : {},
    },
    userLogin: {
        userInfo: userInfoFromStorage ? JSON.parse(userInfoFromStorage) : null
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