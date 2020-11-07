import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {productDetailsDeReducer, productListReducer} from "./reducers/productReducer";
import {cartReducer} from "./reducers/cartReducer";
import {userLoginReducer, userRegisterReducer} from "./reducers/userLoginReducer";

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsDeReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
})

const cartItemsFromStorage = localStorage.getItem('cartItems')
const userInfoFromStorage = localStorage.getItem('userInfo')

const initialState = {
    cart: {
        cartItems: cartItemsFromStorage ? JSON.parse(cartItemsFromStorage) : []
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