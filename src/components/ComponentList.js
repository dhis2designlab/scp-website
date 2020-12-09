import React from 'react'
import { useSelector } from 'react-redux'
import ComponentGrid from './ComponentGrid'
import 'purecss/build/pure.css'
import '../stylesheets/explore.css'
import '../stylesheets/package-list.css'


const ComponentList = ({ componentsPerPage }) => {
    const searchedComponents = useSelector(state => state.components.searched);
    const displayOffset = useSelector(state => state.filter.displayOffset)

    if (searchedComponents.length === 0) return (<p>No hits</p>)

    const paginatedPackages = searchedComponents.slice(displayOffset, displayOffset + componentsPerPage)

    return (
        <>
            <p>Showing {searchedComponents.length} components</p>
            <ComponentGrid packages={paginatedPackages} />
        </>
    )
}

export default ComponentList