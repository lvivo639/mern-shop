import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loading from '../components/Loading'
import {Link} from "react-router-dom";
import {deleteUserAction, listUsersAction} from "../actions/userActions";

const UserListPage = ({history}) => {
    const dispatch = useDispatch()

    const userList = useSelector((state) => state.userList)
    const {loading, error, users} = userList

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const userDelete = useSelector((state) => state.userDelete)
    const { success: successDelete } = userDelete

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listUsersAction())
        } else {
            history.push('/login')
        }
    }, [dispatch, history, successDelete])

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure')) {
            dispatch(deleteUserAction(id))
        }
    }

    return (
        <>
            <h1>Users</h1>
            {loading ? (
                <Loading/>
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <table className="table table-striped table-bordered table-hover table-responsive">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>EMAIL</th>
                        <th>ADMIN</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td>{user._id}</td>
                            <td>{user.name}</td>
                            <td>
                                <a href={`mailto:${user.email}`}>{user.email}</a>
                            </td>
                            <td>
                                {user.isAdmin ? (
                                    <i className='fas fa-check' style={{color: 'green'}}/>
                                ) : (
                                    <i className='fas fa-times' style={{color: 'red'}}/>
                                )}
                            </td>
                            <td>
                                <Link to={`user/${user._id}/edit`}>
                                    <button className='btn btn-sm btn-secondary'>
                                        <i className='fas fa-edit'/>
                                    </button>
                                </Link>
                                <button
                                    className='btn btn-danger btn-sm'
                                    onClick={() => deleteHandler(user._id)}
                                >
                                    <i className='fas fa-trash'/>
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </>
    )
}

export default UserListPage
