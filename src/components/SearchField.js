import React, { useState } from 'react'
import 'purecss/build/pure.css'
import { InputGroup, FormControl } from 'react-bootstrap'
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
        </InputGroup>

    )
}

export default SearchField