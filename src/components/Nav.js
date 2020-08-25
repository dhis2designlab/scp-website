import React from 'react'
import {
  Link,
  useLocation
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'purecss/build/pure.css'
import '../stylesheets/navigation.css'
import { Navbar, Nav as Navigation } from 'react-bootstrap'

const navBarBackground = {
  transparent: {
    backgroundColor: 'transparent',
  },
  dark: {
    backgroundColor: '#343a40',
  }
}


const Nav = (props) => {
  const location = useLocation();
  const onLanding = location.pathname === '/';
  return (
    <>
      <Navbar collapseOnSelect expand="lg" variant="dark" style={onLanding ? navBarBackground.transparent : navBarBackground.dark}>
        <Navbar.Brand>Scp</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Navigation className="mr-auto">
            <Navigation.Link as={Link} to="/">Home</Navigation.Link>
            <Navigation.Link as={Link} to="/search">Search</Navigation.Link>
            <Navigation.Link as={Link} to="/packageinfo">Package info</Navigation.Link>
            <Navigation.Link as={Link} to="/help">Help</Navigation.Link>
          </Navigation>
        </Navbar.Collapse>
      </Navbar>
    </>
  )
}

export default Nav