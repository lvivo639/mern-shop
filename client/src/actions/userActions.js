import {
    USER_DETAILS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS
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


export const getUserDetailsAction = (id) => async (dispatch, getState) => {
    try {
        dispatch({type: USER_DETAILS_REQUEST})
        const {userLogin} = getState()
        console.log(userLogin)

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userLogin.userInfo.token}`
            }
        }

        const {data} = await axios.get(`/api/users/${id}`, config)
        dispatch({type: USER_DETAILS_SUCCESS, payload: data})

    } catch (err) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: err.response && err.response.data.message
                ? err.response.data.message
                : err.message
        })
    }
}

export const updateUserProfileAction = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_UPDATE_PROFILE_REQUEST,
        })

        const {userLogin: {userInfo}} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const {data} = await axios.put(`/api/users/profile`, user, config)

        dispatch({type: USER_UPDATE_PROFILE_SUCCESS})
        dispatch({type: USER_LOGIN_SUCCESS, payload: data})
        dispatch({type: USER_DETAILS_SUCCESS, payload: data})

    } catch (error) {
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}
