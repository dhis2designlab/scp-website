import React from 'react';
import { useSelector } from 'react-redux';
import 'purecss/build/pure.css';
import '../stylesheets/main.css';
import PackageList from '../components/PackageList'
import SearchField from '../components/SearchField'

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

const Main = () => {
  const packages = useSelector(state => state.packages)

  return (
    <>
      <div className="pure-g-r content">
        <div className="l-box">
          <h1>Main page</h1>
        </div>
        <div className="pure-u-1-1 pure-u-md-1-1 search">
          <div className="l-box">
            <SearchField searchButtonText="Search"/>
          </div>
        </div>
        <div className="pure-u-1-1 pure-u-md-1-1">
          <div className="l-box">
            <PackageList style={packageListStyle} packages={packages} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
