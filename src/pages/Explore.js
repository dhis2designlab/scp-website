import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { setDisplayOffset } from '../actions/filters'
import 'purecss/build/pure.css';
import '../stylesheets/main.css';
import '../stylesheets/search.css'
import '../stylesheets/explore.css'
import '../stylesheets/package-list.css'
import ComponentList from '../components/ComponentList'
import FilterGroup from '../components/FilterGroup'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleLeft, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons'
import ReactPaginate from 'react-paginate'

const packageListStyle = {
  item: {
    height: '100%',
    minHeight: '180px',
    borderBottom: '1px solid #f2f2f2'
  },
  description: {
    color: 'gray',
  }
}

const Search = () => {

  const dispatch = useDispatch()
  const searchedComponents = useSelector(state => state.components.searched);
  const componentsPerPage = 6; //Hardcoded

  const handlePageClick = (data) => {
    let selected = data.selected;
    let offset = Math.ceil(selected * componentsPerPage);
    dispatch(setDisplayOffset(offset))
  };


  return (
    <div className="wrapper">
      <div className="pure-g content">
        <div className="pure-u-1">
          <div className="l-box">
            <FilterGroup />
          </div>
        </div>
        <div className="pure-u-1">
          <div className="l-box">
            <ComponentList style={packageListStyle} componentsPerPage={componentsPerPage} />
          </div>
        </div>
      </div>
      <div className="footer pure-u-1">
        <div id="react-paginate" className="footer-content">
          <ReactPaginate
            pageCount={Math.ceil(searchedComponents.length / componentsPerPage)}
            previousLabel={<FontAwesomeIcon icon={faAngleDoubleLeft} />}
            nextLabel={<FontAwesomeIcon icon={faAngleDoubleRight} />}
            onPageChange={handlePageClick}
            breakClassName={'break-me'}
            containerClassName={'pagination'}
            subContainerClassName={'pages pagination'}
            activeClassName={'active'}
          />
        </div>
      </div>
    </div>
  );
}

export default Search;
