import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import Nav from '../components/Nav'
import Search from '../pages/Search'
import Information from '../pages/Information'
import Landing from '../pages/Landing'
import PackageInfo from '../pages/PackageInfo'
import Contact from '../pages/Contact'
import '../stylesheets/grids-responsive-min.css'
import 'prismjs/components/prism-jsx';
import 'prismjs/themes/prism-okaidia.css';
import { getPackages } from '../actions/npms'

const App = () => {
  const dispatch = useDispatch();
  const searched = useSelector(state => state.packages.searched)

  useEffect(() => {
    if(searched === false){
      dispatch(getPackages())
    }
    
  }, [searched, dispatch])

  if(!searched) return(
    <p>Fetching components...</p>
  )

  return (
    <Router>
      <Nav/>
      <Switch>
        <Route exact path='/scp-website' component={Landing}/>
        <Route path='/scp-website/search' component={Search}/>
        <Route path='/scp-website/packageinfo' component={PackageInfo}/>
        <Route path='/scp-website/Information' component={Information}/>
        <Route path='/scp-website/contact' component={Contact}/>
      </Switch>
    </Router>
  );
}

export default App;
