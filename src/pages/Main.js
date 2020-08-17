import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPackages } from '../actions/npms'
import PackageList from '../components/PackageList'

const Main = () => {
  const dispatch = useDispatch();
  const packages = useSelector(state => state.packages)

  useEffect(() => {
    dispatch(getPackages())
  }, [dispatch])

  return (
    <div>
      <h1>Main page</h1>
      <PackageList packages={packages} />
    </div>
  );
}

export default Main;
