import React from 'react'
import {
  Link,
  useLocation
} from "react-router-dom";
import 'purecss/build/pure.css'
import '../stylesheets/navigation.css'


const Nav = (props) => {
  const location = useLocation();
  const onLanding = location.pathname === '/';
  return (
    <div className="pure-g-r">
      <div className={onLanding ? 'menu pure-u-1 landing-style' : 'menu pure-u-1 general'}>
          <div className="pure-menu pure-menu-horizontal">
            <ul className="pure-menu-list">
              <li className="pure-menu-item">
                <Link className="pure-menu-link" to="/">Home</Link>
              </li>
              <li className="pure-menu-item">
                <Link className="pure-menu-link" to="/search">Search</Link>
              </li>
              <li className="pure-menu-item">
                <Link className="pure-menu-link" to="/packageinfo">Package info</Link>
              </li>
              <li className="pure-menu-item">
                <Link className="pure-menu-link" to="/help">Help</Link>
              </li>
            </ul>
        </div>
      </div>
    </div>
  )
}

export default Nav