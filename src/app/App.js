import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import Nav from '../components/Nav'
import Loader from '../components/Loader'
import Explore from '../pages/Explore'
import Information from '../pages/Information'
import Contact from '../pages/Contact'
import '../stylesheets/grids-responsive-min.css'
import 'prismjs/components/prism-jsx';
import 'prismjs/themes/prism-okaidia.css';
import { getPackages } from '../actions/npms'
import { fetchVerified } from '../actions/github'

const App = () => {
  const dispatch = useDispatch();
  const searched = useSelector(state => state.packages.searched)

  useEffect(() => {
    if(searched === false){
      dispatch(fetchVerified())
      dispatch(getPackages())
    }
    
  }, [searched, dispatch])

  return (
    <Router>
      <Nav/>
      {searched ? (
        <Switch>
          <Route exact path='/scp-website' component={Explore}/>
          <Route path='/scp-website/information' component={Information}/>
          <Route path='/scp-website/contact' component={Contact}/>
        </Switch>
      ) : (
      <Loader />
    )}
      
    </Router>
  );
}

export default App;
