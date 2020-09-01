import React from 'react';
import { useSelector } from 'react-redux';
import 'purecss/build/pure.css';
import '../stylesheets/main.css';
import '../stylesheets/search.css'
import PackageList from '../components/PackageList'
import SearchField from '../components/SearchField'
import Badge from 'react-bootstrap/Badge'
import { useDispatch } from 'react-redux'
import { getPackages } from '../actions/npms'
import { query } from '../actions/actionTypes';

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
  const packages = useSelector(state => state.packages.currPackages)
  //Change when more is known about req search functionality
  const community = useSelector(state => state.query.modifiers)[0] === 'keywords:dhis2'; //test
  const verified = useSelector(state => state.query.modifiers)[0] === 'scope:dhis2';//test

  const onSearch = (inputValue) => {
    if (inputValue === '') {
      return;
    }
    dispatch(getPackages(inputValue))
}


  return (
    <>
      <div className="pure-g content">
        <div className="pure-u-1-1 pure-u-md-4-5 pure-u-lg-4-5 search">
          <div className="l-box">
            <SearchField searchButtonText="Search" onSearch={onSearch}/>
            {verified &&
              <Badge className="badge"variant="success">You are browsing verified packages</Badge>
            }
            {community &&
              <Badge className="badge" variant="primary">You are browsing unverified community packages</Badge>
            }
          </div>
        </div>
        <div className="pure-u-1-1 pure-u-md-4-5 pure-u-lg-4-5">
          <div className="l-box">
            <PackageList style={packageListStyle} packages={packages} packageCount={packages ? packages.length : 0} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Search;
