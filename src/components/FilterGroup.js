import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import FormCheck from 'react-bootstrap/FormCheck'
import { setFilterAndSearch } from '../actions/filters'


const FilterGroup = () => {
    const dispatch = useDispatch()

    const { framework, onlyVerified } = useSelector(state => state.filter)

    const handleFramework = ( newFramework ) => {
        dispatch(setFilterAndSearch({framework: newFramework}))
    }

    const handleVerified = ( event ) => {
        dispatch(setFilterAndSearch({onlyVerified: event.target.checked}))
    }

    return (
        <div className="d-flex flex-row">
            <DropdownButton id="dropdown-basic-button" title={`Framework: ${framework}`} className="mr-1">
                <Dropdown.Item onClick={() => handleFramework('all')}>All</Dropdown.Item>
                <Dropdown.Item onClick={() => handleFramework('react')}>React</Dropdown.Item>
                <Dropdown.Item onClick={() => handleFramework('angular')}>Angular</Dropdown.Item>
            </DropdownButton>
            <FormCheck 
                id="verified-check" 
                label="Show only verified components" 
                inline={true} 
                className="ml-auto"
                type="checkbox"
                checked={onlyVerified}
                onChange={handleVerified}
            />
        </div>
    )
}

export default FilterGroup