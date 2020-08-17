import React from 'react';
import { useSelector } from 'react-redux';
import 'purecss/build/pure.css';
import '../stylesheets/main.css';
import PackageList from '../components/PackageList'
import SearchField from '../components/SearchField'


const Main = () => {
  const packages = useSelector(state => state.packages)

  return (
    <>
      <div className="pure-g-r content">
        <h1>Main page</h1>
        <div className="pure-u-1-1 pure-u-md-1-1 search">
          <SearchField />
        </div>
        <PackageList packages={packages} />
      </div>
    </>
  );
}

export default Main;
