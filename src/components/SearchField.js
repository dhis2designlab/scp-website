import React, { useState } from 'react'
import 'purecss/build/pure.css'
import $ from 'jquery'
import 'bootstrap/dist/js/bootstrap.bundle'
import 'react-bootstrap/dist/react-bootstrap'
import '../stylesheets/search-field.css'
window.jQuery = window.$ = $;

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
    //more relevant if we allow different sets of search modifiers
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
        props.onSearch(queryBuilder(''));
    }

    // simple solution, not scalable
    const onSecondary = (e) => {
        e.preventDefault()
        var dhisModifier = 'scope:dhis2';
        props.onSearch(queryBuilder(dhisModifier))
    }

    const handleChange = (e) => {
        setInputValue(e.target.value);
    }

    /* a little more scalable
    const toggleDhis2 = (e) => {
        //e.preventDefault()

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
*/
    // 
      const queryBuilder = (mod) => {
        var input = inputValue
        if (mod != '') {
            //var appendix = modifiers.join('+');
            var appendix = '+' + mod;
            input += appendix
        }
        return input
      }

    return (
        <div className="input-group">
            <input type="text" className="form-control" value={inputValue} onChange={handleChange} aria-label="Text input with segmented dropdown button"/>
            <div className="input-group-append">
                <button type="button" className="btn btn-outline-secondary" id="search" onClick={onClick}>{props.searchButtonText !== undefined ? props.searchButtonText : `Search`}</button>
                <button type="button" className="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span className="sr-only">Toggle Dropdown</span>
                </button>
                <div className="dropdown-menu">
                    <button className="dropdown-item" type="button" onClick={onClick}>Search</button>
                    <div role="separator" className="dropdown-divider"></div>
                    <button className="dropdown-item" type="button" onClick={onSecondary}>Search in the dhis2 namespace</button>
                </div>
            </div>
        </div>
    )
}

export default SearchField