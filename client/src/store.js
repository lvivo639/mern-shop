import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {
    productCreateReducer,
    productDeleteReducer,
    productDetailsDeReducer,
    productListReducer, productUpdateReducer
} from "./reducers/productReducer";
import {cartReducer} from "./reducers/cartReducer";
import {
    userDeleteReducer,
    userDetailsReducer, userListReducer,
    userLoginReducer,
    userRegisterReducer,
    userUpdateProfileReducer, userUpdateReducer
} from "./reducers/userReducer";
import {orderCreateReducer, orderDetailsReducer, orderListMyReducer, orderPayReducer} from "./reducers/orderReducers";

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsDeReducer,
    productUpdate: productUpdateReducer,
    productDelete: productDeleteReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderListMy: orderListMyReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,
    productCreate: productCreateReducer,

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