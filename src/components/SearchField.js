import React, { useState } from 'react'
import 'purecss/build/pure.css'

const searchFieldStyle = {
    input: {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        borderWidth: '0px',
    },
    button: {
        borderWidth: '0px',
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        borderTopRightRadius: '4px',
        borderBottomRightRadius: '4px',
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
        <form className="pure-form pure-g">
            <div className="pure-u-1">
                <input id="search" type="text" style={style.input} className="pure-input-2-3" placeholder="Search for packages here..." value={inputValue} onChange={handleChange} />
                <button type="submit" style={style.button} className="pure-button pure-button-primary" onClick={onClick}>{props.searchButtonText !== undefined ? props.searchButtonText : `Search`}</button>
            </div>
        </form>
    )
}

export default SearchField