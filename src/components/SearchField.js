import React, { useState } from 'react'
import 'purecss/build/pure.css'
import { InputGroup, Button, FormControl } from 'react-bootstrap'
import '../stylesheets/search-field.css'
import { useDispatch } from 'react-redux'
import { searchComponents, setSearchTerm, setDisplayOffset } from '../actions/filters'

const SearchField = (props) => {
    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState('');

    const onSearch = (e) => {
        e.preventDefault()
        dispatch(setDisplayOffset(0))
        dispatch(setSearchTerm(inputValue))
        dispatch(searchComponents())
        if(props.navigateTo) props.navigateTo()
    }

    // simple solution, not scalable
    // const onSearchAll = (e) => {
    //     e.preventDefault()
    //     var currMods = []
    //     dispatchTerms(currMods)
    //     props.onSearch(inputValue)
    // }

    // simple solution, not scalable
    // const onSecondary = (e) => {
    //     e.preventDefault()
    //     var currMods = ['keywords:dhis2']
    //     dispatchTerms(currMods)
    //     props.onSearch(inputValue)
    // }

    // const onTertiary = (e) => {
    //     e.preventDefault();
    //     //TODO: make this far less hardcoded when we know the req searchterms.
    //     var currMods = ['scope:dhis2']
    //     dispatchTerms(currMods)
    //     props.onSearch(inputValue)

    // }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            onSearch(e);
        }
    }

    const handleChange = (e) => {
        setInputValue(e.target.value)
    }

    return (

        <InputGroup>
            <FormControl
                placeholder="Search for components"
                aria-label="Search for components"
                aria-describedby="basic-addon2"
                value={inputValue}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
            />
            {/* <InputGroup.Append>
                <Button 
                    variant="outline-secondary"
                    onClick={onSearch}
                >
                    {props.searchButtonText !== undefined ? props.searchButtonText : `Search`}
                </Button> */}
                {/* <DropdownButton
                    as={InputGroup.Append}
                    className="dropdownbutton"
                    variant="outline-secondary"
                    title=""
                    id="input-group-dropdown-2"
                >
                    <Dropdown.Item onClick={onSearchAll}>Search all</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={onSecondary}>Search all community packages</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={onTertiary}>Search verified packages</Dropdown.Item>
                </DropdownButton> */}
            {/* </InputGroup.Append> */}
        </InputGroup>

    )
}

export default SearchField