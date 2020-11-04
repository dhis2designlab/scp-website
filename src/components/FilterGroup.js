import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import { setFilterAndSearch } from '../actions/filters'


const FilterGroup = () => {
    const dispatch = useDispatch()

    const { framework } = useSelector(state => state.filter)

    const handleFramework = ( newFramework ) => {
        dispatch(setFilterAndSearch({framework: newFramework}))
    }

    return (
        <DropdownButton id="dropdown-basic-button" title="Framework">
            <Dropdown.Item onClick={() => handleFramework('react')}>React</Dropdown.Item>
            <Dropdown.Item onClick={() => handleFramework('angular')}>Angular</Dropdown.Item>
        </DropdownButton>
    )
}

export default FilterGroup