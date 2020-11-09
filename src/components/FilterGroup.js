import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import FormCheck from 'react-bootstrap/FormCheck'
import { setFilterAndSearch } from '../actions/filters'
import VersionFilter from './VersionFilter'

const FilterGroup = () => {
    const dispatch = useDispatch()

    const { framework, onlyVerified, dhis2Versions } = useSelector(state => state.filter)
    const { allDhis2Versions } = useSelector(state => state.packages)

    const handleFramework = ( newFramework ) => {
        dispatch(setFilterAndSearch({framework: newFramework}))
    }

    const handleVerified = ( event ) => {
        dispatch(setFilterAndSearch({onlyVerified: event.target.checked}))
    }

    const handleDhis2Version = ( version ) => {
        const newVersions = [...dhis2Versions]
        const indexOf = dhis2Versions.indexOf(version) 
        if(indexOf === -1) newVersions.push(version)
        else newVersions.splice(indexOf, 1)
        dispatch(setFilterAndSearch({dhis2Versions: newVersions}))
    }

    return (
        <div className="d-flex flex-row">
            <DropdownButton id="dropdown-basic-button" title={`Framework: ${framework}`} className="mr-1">
                <Dropdown.Item onClick={() => handleFramework('all')}>All</Dropdown.Item>
                <Dropdown.Item onClick={() => handleFramework('react')}>React</Dropdown.Item>
                <Dropdown.Item onClick={() => handleFramework('angular')}>Angular</Dropdown.Item>
            </DropdownButton>
            <VersionFilter allDhis2Versions={allDhis2Versions} dhis2Versions={dhis2Versions} handleDhis2Version={handleDhis2Version} />
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