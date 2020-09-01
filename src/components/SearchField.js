import React, { useState } from 'react'
import 'purecss/build/pure.css'
import { InputGroup, Button, Dropdown, DropdownButton, FormControl } from 'react-bootstrap'
import '../stylesheets/search-field.css'

const SearchField = (props) => {
    const [inputValue, setInputValue] = useState('');
    //more relevant if we allow different sets of search modifiers
    //const [modifiers, setModifiers] = useState([]);
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

    const onTertiary = (e) => {
        e.preventDefault();
        //TODO: make this far less hardcoded when we know the exact searchterms.
        var verifiedModifier = 'keywords:dhis2+not:deprecated+not:insecure';
        props.onSearch(queryBuilder(verifiedModifier))

    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            //might need to change this if the general method of sending input is changed
            onClick(e);
        }
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
        if (mod !== '') {
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
                onKeyDown={handleKeyDown}
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
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={onTertiary}>Search verified packages</Dropdown.Item>
                </DropdownButton>
            </InputGroup.Append>
        </InputGroup>
    )
}

export default SearchField