import React from 'react';
import 'purecss/build/pure.css';
import '../stylesheets/main.css';
import '../stylesheets/search.css'
import PackageList from '../components/PackageList'
import SearchField from '../components/SearchField'
import Badge from 'react-bootstrap/Badge'
import { useSelector, useDispatch } from 'react-redux'
import { getPackages } from '../actions/npms'

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
  const community = useSelector(state => state.query.modifiers)[0] === 'keywords:dhis2';
  const verified = useSelector(state => state.query.modifiers)[0] === 'scope:dhis2';
  const searchTerm = useSelector(state => state.query.searchTerm)

  const onSearch = (inputValue) => {
    if (inputValue.length > 0) {
      dispatch(getPackages(inputValue))
    }
  }

  //display different placeholders based on context
  const placeHolderText = () => {
    var defaultText = "Search for component";
    return  (searchTerm == null)
            ? defaultText
            : (searchTerm !== '')
            ? searchTerm
            : !(community || verified)
            ? defaultText
            : verified
            ? "All verified community packages"
            : "All unverified community packages";
  }


  return (
    <>
      <div className="pure-g content">
        <div className="pure-u-1-1 pure-u-md-4-5 pure-u-lg-4-5 search">
          <div className="l-box">
            <SearchField placeHolderText={placeHolderText} searchButtonText="Search" onSearch={onSearch}/>
            {verified &&
              <Badge className="badge"variant="success">You are browsing verified community packages</Badge>
            }
            {community &&
              <Badge className="badge" variant="primary">You are browsing unverified community packages</Badge>
            }
          </div>
        </div>
        <div className="pure-u-1-1 pure-u-md-4-5 pure-u-lg-4-5">
          <div className="l-box">
            <PackageList style={packageListStyle} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Search;
