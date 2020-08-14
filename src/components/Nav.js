import React from 'react'
import {
  Link,
} from "react-router-dom";
import 'purecss/build/pure.css'

const Nav = () => {
  return (
    <div className="pure-menu pure-menu-horizontal">
      <ul className="pure-menu-list">
        <li className="pure-menu-item">
          <Link className="pure-menu-link" to="/">Home</Link>
        </li>
        <li className="pure-menu-item">
          <Link className="pure-menu-link" to="/other">Other</Link>
        </li>
        <li className="pure-menu-item">
          <Link className="pure-menu-link" to="/packageinfo">Package info</Link>
        </li>
      </ul>
    </div>
  )
}

export default Nav