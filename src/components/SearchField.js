import React, { useState } from 'react'
import 'purecss/build/pure.css'
import { InputGroup, Button, Dropdown, DropdownButton, FormControl } from 'react-bootstrap'
import '../stylesheets/search-field.css'

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
        <InputGroup>
            <FormControl
                placeholder="Search for component"
                aria-label="Search for component"
                aria-describedby="basic-addon2"
                value={inputValue} 
                onChange={handleChange}
            />
            <InputGroup.Append>
                <Button 
                    variant="outline-secondary">
                    {props.searchButtonText !== undefined ? props.searchButtonText : `Search`}
                </Button>
                <DropdownButton
                    as={InputGroup.Append}
                    className="dropdownbutton"
                    variant="outline-secondary"
                    title=""
                    id="input-group-dropdown-2"
                >
                    <Dropdown.Item onClick={onClick}>Search all</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={onSecondary}>Search dhis2 namespace</Dropdown.Item>
                </DropdownButton>
            </InputGroup.Append>
        </InputGroup>
    )
}

export default SearchField