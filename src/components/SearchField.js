import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { getPackages } from '../actions/npms'
import 'purecss/build/pure.css';

const SearchField = () => {
    const [inputValue, setInputValue] = useState('')
    const dispatch = useDispatch();
    const onSearch = (e) => {
        console.log(inputValue)
        e.preventDefault()
        dispatch(getPackages(inputValue))
    }

    const handleChange = (e) => {
        setInputValue(e.target.value);
    }

    return(
        <form className="pure-form">
            <input type="text" className="pure-input" value={inputValue} onChange={handleChange} />
            <button type="submit" className="pure-button" onClick={onSearch}>Search</button>
        </form>
    )
}

export default SearchField