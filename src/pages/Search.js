import React from 'react';
import 'purecss/build/pure.css';
import '../stylesheets/main.css';
import '../stylesheets/search.css'
import PackageList from '../components/PackageList'
import ComponentList from '../components/ComponentList'
import SearchField from '../components/SearchField'
import Badge from 'react-bootstrap/Badge'
import ListGroup from 'react-bootstrap/ListGroup'
import { useSelector, useDispatch } from 'react-redux'
import { getPackages, setOffset, setDisplayOffset, setFilters, setVerified, setModifiers } from '../actions/npms'

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
  const dispatch = useDispatch();
  //Change when more is known about req search functionality
  const mod = useSelector(state => state.query.modifiers)
  const community = mod[0] === 'keywords:dhis2';
  const verified = mod[0] === 'scope:dhis2';
  const searchTerm = useSelector(state => state.query.searchTerm)

  // const onSearch = (inputValue) => {
  //   if (inputValue.length > 0) {
  //     dispatch(setDisplayOffset(0))
  //     dispatch(setOffset(0));
  //     dispatch(getPackages(inputValue))
  //   }
  // }

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
            <SearchField searchButtonText="Search"/>
            {verified &&
              <Badge className="badge"variant="success">You are browsing verified community packages</Badge>
            }
            {community &&
              <Badge className="badge" variant="primary">You are browsing unverified community packages</Badge>
            }
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
