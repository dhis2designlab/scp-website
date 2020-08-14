import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Nav from '../components/Nav'
import Main from '../pages/Main'
import Other from '../pages/Other'
import PackagePage from '../pages/PackagePage'

const App = () => {
  return (
    <Router>
      <Nav/>
      <Switch>
        <Route exact path='/' component={Main}/>
        <Route path='/other' component={Other}/>
        <Route path='/packageinfo' component={PackagePage}/>
      </Switch>
    </Router>
  );
}

export default App;
