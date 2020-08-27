import React from 'react';
import { useSelector } from 'react-redux';
import 'purecss/build/pure.css';
import '../stylesheets/main.css';
import PackageList from '../components/PackageList'
import SearchField from '../components/SearchField'
import { useDispatch } from 'react-redux'
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
  const packages = useSelector(state => state.packages)
  const dispatch = useDispatch();
  const onSearch = (inputValue) => {
    console.log(inputValue)
    dispatch(getPackages(inputValue))
  }
  return (
    <>
      <div className="pure-g content">
        <div className="pure-u-1-1 pure-u-md-3-5 search">
          <div className="l-box">
            <SearchField searchButtonText="Search" onSearch={onSearch} />
          </div>
        </div>
        <div className="pure-u-1-1 pure-u-md-3-5">
          <div className="l-box">
            <PackageList style={packageListStyle} packages={packages} packageCount={packages ? packages.length : 0} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Search;
