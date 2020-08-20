import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Nav from '../components/Nav'
import Main from '../pages/Main'
import Other from '../pages/Other'
import Help from '../pages/Help'
import Landing from '../pages/Landing'
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
        <Route path='/landing' component={Landing}/>
        <Route path='/other' component={Other}/>
        <Route path='/packageinfo' component={PackageInfo}/>
        <Route path='/help' component={Help}/>
      </Switch>
    </Router>
  );
}

export default App;
