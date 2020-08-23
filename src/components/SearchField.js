import React, { useState } from 'react'
import 'purecss/build/pure.css'

const searchFieldStyle = {
    input: {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        borderWidth: '0px',
        margin: 0,
    },
    button: {
        borderWidth: '0px',
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        borderTopRightRadius: '4px',
        borderBottomRightRadius: '4px',
        margin: 0,
    },
    form: {
        display: 'flex',
        width: '100%',
    }
}

const SearchField = (props) => {
    const style = props.style || searchFieldStyle;
    const [inputValue, setInputValue] = useState('');
    /*

    const dispatch = useDispatch();
    const onSearch = (e) => {
        console.log(inputValue)
        e.preventDefault()
        dispatch(getPackages(inputValue))
    }
    */

    const onClick = (e) => {
        e.preventDefault()
        props.onSearch(inputValue);
    }

    const handleChange = (e) => {
        setInputValue(e.target.value);
    }

    return (
        <form className="pure-form" style={searchFieldStyle.form}>
            <input id="search" type="text" style={style.input} className="pure-u-1" placeholder="Search for packages here..." value={inputValue} onChange={handleChange} />
            <button type="submit" style={style.button} className="pure-button pure-button-primary" onClick={onClick}>{props.searchButtonText !== undefined ? props.searchButtonText : `Search`}</button>
        </form>
    )
}

export default SearchField