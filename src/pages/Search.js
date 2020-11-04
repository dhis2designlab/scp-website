import React from 'react';
import 'purecss/build/pure.css';
import '../stylesheets/main.css';
import '../stylesheets/search.css'
import ComponentList from '../components/ComponentList'
import FilterGroup from '../components/FilterGroup'
import Badge from 'react-bootstrap/Badge'
import InputGroup from 'react-bootstrap/InputGroup'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import { useSelector } from 'react-redux'

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
  const mod = useSelector(state => state.query.modifiers)
  const community = mod[0] === 'keywords:dhis2';
  const verified = mod[0] === 'scope:dhis2';

  // //display different placeholders based on context
  // const placeHolderText = () => {
  //   var defaultText = "Search for component";
  //   return  (searchTerm == null)
  //           ? defaultText
  //           : (searchTerm !== '')
  //           ? searchTerm
  //           : !(community || verified)
  //           ? defaultText
  //           : verified
  //           ? "All verified community packages"
  //           : "All unverified community packages";
  // }

  // const toggleFilter = (e) => {
  //   if (e.target.id !== mod[0]) {
  //     console.log(e.target.id)
  //     var md = [];
  //     switch (e.target.id) {
  //       case 'verified':
  //         md = ['scope:dhis2']
  //         break;
  //       case 'unverified':
  //         md = ['keywords:dhis2']
  //         break;
  //     }
  //     dispatch(setModifiers(md))
  //     //dispatch(getPackages(searchTerm))
  //     onSearch(searchTerm);
  //   }
  // }


  return (
    <>
      <div className="pure-g content">
        <div className="pure-u-1-1 pure-u-md-4-5 pure-u-lg-4-5 search">
          <div className="l-box">
            <FilterGroup />
          </div>
        </div>
        <div className="pure-u-4-5 pure-u-md-4-5 pure-u-lg-4-5">
          <div className="l-box">
            <ComponentList style={packageListStyle} />
          </div>
        </div>
        <div className="pure-u-1-5">
          <div className="l-box">
            {/* <ListGroup variant="flush">
              <ListGroup.Item id='all' action onClick={toggleFilter}>Toggle all</ListGroup.Item>
              <ListGroup.Item id='unverified' action onClick={toggleFilter}>Toggle Unverified</ListGroup.Item>
              <ListGroup.Item id='verified' action onClick={toggleFilter}>Toggle verified</ListGroup.Item>
            </ListGroup> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Search;
