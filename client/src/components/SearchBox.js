import React, {useState} from 'react'

const SearchBox = ({history}) => {
    const [keyword, setKeyword] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()
        if (keyword.trim()) {
            history.push(`/?s=${keyword}`)
        } else {
            history.push('/')
        }
    }

    return (
        <form onSubmit={submitHandler} className="form-inline">
            <input
                type='text'
                name='q'
                onChange={(e) => setKeyword(e.target.value)}
                placeholder='Search Products...'
                className='form-control mr-sm-2 ml-sm-5'
            />
            <button type='submit' className='btn btn-outline-success p-2'>
                Search
            </button>
        </form>
    )
}

export default SearchBox