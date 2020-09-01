import React, { useState } from 'react'
import 'purecss/build/pure.css'
import { InputGroup, Button, Dropdown, DropdownButton, FormControl } from 'react-bootstrap'
import '../stylesheets/search-field.css'
import { useDispatch } from 'react-redux'
import { setModifiers, setSearchTerm } from '../actions/npms'

const SearchField = (props) => {
    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState('');

    const onClick = (e) => {
        e.preventDefault()
        props.onSearch(queryBuilder([]));
    }

    // simple solution, not scalable
    const onSecondary = (e) => {
        e.preventDefault()
        var currMods = ['keywords:dhis2']
        props.onSearch(queryBuilder(currMods))
    }

    const onTertiary = (e) => {
        e.preventDefault();
        //TODO: make this far less hardcoded when we know the req searchterms.
        var currMods = ['scope:dhis2']
        props.onSearch(queryBuilder(currMods))

    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            onClick(e);
        }
    }

    const handleChange = (e) => {
        setInputValue(e.target.value)
    }

    const queryBuilder = (mod) => {
        var input = inputValue
        if (input === '' && mod.length < 1) {
            return null; //Empty search
        }
        if (mod.length > 0) {
            var appendix = mod.join('+')
            appendix = '+' + mod;
            input += appendix
        }
        dispatch(setModifiers(mod))
        dispatch(setSearchTerm(inputValue))
        return input
    }
    
    return (

        <InputGroup>
            <FormControl
                placeholder={props.placeHolderText()}
                aria-label="Search for component"
                aria-describedby="basic-addon2"
                value={inputValue}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
            />
            <InputGroup.Append>
                <Button 
                    variant="outline-secondary"
                    onClick={onClick}
                >
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
                    <Dropdown.Item onClick={onSecondary}>Search all community packages</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={onTertiary}>Search verified packages</Dropdown.Item>
                </DropdownButton>
            </InputGroup.Append>
        </InputGroup>

    )
}

export default SearchField