import {
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS, USER_LOGOUT, USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS
} from "../actionTypes/userActionTypes";
import axios from "axios";

export const userLoginAction = (email, password) => async (dispatch) => {
    try {
        dispatch({type: USER_LOGIN_REQUEST})
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        const {data} = await axios.post('/api/users/login', {email, password}, config)
        dispatch({type: USER_LOGIN_SUCCESS, payload: data})
        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (err) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: err.response && err.response.data.message
                ? err.response.data.message
                : err.message
        })
    }
}

export const userLogoutAction = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({type: USER_LOGOUT})
}

export const userRegisterAction = (name, email, password) => async (dispatch) => {
    try {
        dispatch({type: USER_REGISTER_REQUEST})
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        const {data} = await axios.post('/api/users', {name, email, password}, config)
        dispatch({type: USER_REGISTER_SUCCESS, payload: data})
        dispatch({type: USER_LOGIN_SUCCESS, payload: data})
        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (err) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: err.response && err.response.data.message
                ? err.response.data.message
                : err.message
        })
    }
}
