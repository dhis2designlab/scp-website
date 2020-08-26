import React, { useState } from 'react'
import 'purecss/build/pure.css'

const searchFieldStyle = {
    input: {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        borderWidth: '0px',
        margin: 0,
        backgroundColor: 'white',
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
    const [modifiers, setModifiers] = useState([]);
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
        var query = queryBuilder();
        props.onSearch(query);
    }

    const handleChange = (e) => {
        setInputValue(e.target.value);
    }

    const toggleDhis2 = (e) => {
        //e.preventDefault()
        var element = document.getElementById("dhis2");
        var searchbar = document.getElementById("search");

        if (!modifiers.includes('scope:dhis2')) {
            setModifiers([...modifiers, 'scope:dhis2'])
        } else {
            var arr = modifiers;
            var index = modifiers.indexOf('scope:dhis2');
            if (index > -1 ) {
                arr.splice(index, 1);
            }
            setModifiers(arr);
        }
      }

    // To be expanded upon?
      const queryBuilder = () => {
        var input = inputValue
        var appendix = modifiers.join('+');
        appendix = '+' + appendix
        input += appendix;
        return input;
      }

    return (
        <>
            <form className="pure-form" style={searchFieldStyle.form}>
                <input id="search" type="text" style={style.input} className="pure-u-1" placeholder="Search for packages here..." value={inputValue} onChange={handleChange} />
                <button type="submit" style={style.button} className="pure-button pure-button-primary" onClick={onClick}>{props.searchButtonText !== undefined ? props.searchButtonText : `Search`}</button>
            </form>
            <div class="custom-control custom-switch">
                <input type="checkbox" class="custom-control-input" onChange={toggleDhis2} id="customSwitches" />
                <label class="custom-control-label" for="customSwitches" >Toggle dhis2 search</label>
            </div>
        </>
    )
}

export default SearchField