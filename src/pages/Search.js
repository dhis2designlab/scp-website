import React from 'react';
import { useSelector } from 'react-redux';
import 'purecss/build/pure.css';
import '../stylesheets/main.css';
import PackageList from '../components/PackageList'
import SearchField from '../components/SearchField'
import { useDispatch } from 'react-redux'
import { getPackages, setModifiers } from '../actions/npms'


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
  const packages = useSelector(state => state.packages.currPackages)
  const dispatch = useDispatch();

  const onSearch = (inputValue) => {
    dispatch(getPackages(inputValue))
  }

  const setMods = (modList) => {
    dispatch(setModifiers(modList))
  }
  return (
    <>
      <div className="pure-g content">
        <div className="pure-u-1-1 pure-u-md-4-5 pure-u-lg-4-5 search">
          <div className="l-box">
            <SearchField searchButtonText="Search" onSearch={onSearch} setMods={setMods} />
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
