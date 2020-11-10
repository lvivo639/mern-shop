import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loading from '../components/Loading'
import FormContainer from '../components/FormContainer'
import {getUserDetailsAction, updateUserAction} from '../actions/userActions'
import {USER_UPDATE_RESET} from "../actionTypes/userActionTypes";

const UserEditPage = ({match, history}) => {
    const userId = match.params.id

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)

    const dispatch = useDispatch()

    const userDetails = useSelector((state) => state.userDetails)
    const {loading, error, user} = userDetails
    const userUpdate = useSelector((state) => state.userUpdate)
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = userUpdate
    useEffect(() => {
        if (successUpdate) {
            dispatch({type: USER_UPDATE_RESET})
            history.push('/admin/userlist')
        } else {
            if (!user.name || user._id !== userId) {
                dispatch(getUserDetailsAction(userId))
            } else {
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
        }
    }, [dispatch, history, userId, user, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUserAction({ _id: userId, name, email, isAdmin }))
    }

    return (
        <>
            <Link to='/admin/userlist' className='btn btn-light my-3'>
                Go Back
            </Link>
            <FormContainer>
                <h1>Edit User</h1>
                {loadingUpdate && <Loading />}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
                {loading ? (
                    <Loading/>
                ) : error ? (
                    <Message variant='danger'>{error}</Message>
                ) : (
                    <form onSubmit={submitHandler}>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input className="form-control"
                                   type='name'
                                   placeholder='Enter name'
                                   value={name}
                                   onChange={(e) => setName(e.target.value)}/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <input className="form-control"
                                   type='email'
                                   placeholder='Enter email'
                                   value={email}
                                   onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type='checkbox'
                                id='isadmin'
                                checked={isAdmin}
                                onChange={(e) => setIsAdmin(!!e.target.checked)}
                            />
                            <label htmlFor="isadmin" className="form-check-label">Is admin</label>
                        </div>

                        <button className="btn btn-primary" type='submit'>
                            Update
                        </button>
                    </form>
                )}
            </FormContainer>
        </>
    )
}

export default UserEditPage