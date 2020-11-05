import React from 'react';
import 'purecss/build/pure.css';
import '../stylesheets/main.css';
import '../stylesheets/search.css'
import ComponentList from '../components/ComponentList'
import FilterGroup from '../components/FilterGroup'

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
  return (
    <>
      <div className="pure-g content">
        <div className="pure-u-1-1 pure-u-md-4-5 pure-u-lg-4-5 search">
          <div className="l-box">
            <FilterGroup />
          </div>
        </div>
        <div className="pure-u-4-5 pure-u-md-4-5 pure-u-lg-4-5 mt-3">
          <div className="l-box">
            <ComponentList style={packageListStyle} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Search;
