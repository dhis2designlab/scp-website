import React from 'react';
import { useSelector } from 'react-redux';
import PackageList from '../components/PackageList'
import SearchField from '../components/SearchField'

const Main = () => {
  const packages = useSelector(state => state.packages)

  return (
    <div>
      <h1>Main page</h1>
      <SearchField />
      <PackageList packages={packages} />
    </div>
  );
}

export default Main;
