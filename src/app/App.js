import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Nav from '../components/Nav'
import Main from '../pages/Main'
import Other from '../pages/Other'
import PackageInfo from '../pages/PackageInfo'
import '../stylesheets/grids-responsive-min.css'
import 'prismjs/components/prism-jsx';
import 'prismjs/themes/prism-okaidia.css';

const App = () => {
  return (
    <Router>
      <Nav/>
      <Switch>
        <Route exact path='/' component={Main}/>
        <Route path='/other' component={Other}/>
        <Route path='/packageinfo' component={PackageInfo}/>
      </Switch>
    </Router>
  );
}

export default App;
