import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setDisplayOffset } from '../actions/filters'
import ComponentCard from './ComponentCard'
import ReactPaginate from 'react-paginate'
import 'purecss/build/pure.css'
import '../stylesheets/paginate.css'
import '../stylesheets/package-list.css'
import '../stylesheets/component-grid.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleLeft, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons'


const ComponentList = (props) => {
    const { style } = props;
    const dispatch = useDispatch()
    const searchedComponents = useSelector(state => state.components.searched);
    const displayOffset = useSelector(state => state.filter.displayOffset)
    const componentsPerPage = 5;

    if (searchedComponents.length === 0) return (<p>No hits</p>)

    const paginatedPackages = searchedComponents.slice(displayOffset, displayOffset + componentsPerPage)

    const handlePageClick = (data) => {
        let selected = data.selected;
        let offset = Math.ceil(selected * componentsPerPage);
        dispatch(setDisplayOffset(offset))
    };

    return (
        <>
            <p>Showing {searchedComponents.length} components</p>
            <div className="grid" >
                {paginatedPackages.map((p, i) => 
                    <ComponentCard p={p} style={style}/>
                )}
            </div>
            <div id="react-paginate" className="center"><ReactPaginate
                pageCount={Math.ceil(searchedComponents.length / componentsPerPage)}
                previousLabel={<FontAwesomeIcon icon={faAngleDoubleLeft} />}
                nextLabel={<FontAwesomeIcon icon={faAngleDoubleRight} />}
                onPageChange={handlePageClick}
                breakClassName={'break-me'}
                containerClassName={'pagination'}
                subContainerClassName={'pages pagination'}
                activeClassName={'active'} /></div>
        </>
    )
}

export default ComponentList