import React from 'react'
import {
  Link,
  useLocation
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'purecss/build/pure.css'
import '../stylesheets/navigation.css'
import { useHistory } from 'react-router-dom'
import { Navbar, Nav as Navigation } from 'react-bootstrap'
import SearchField from './SearchField'

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
  const history = useHistory();
  const onLanding = location.pathname === '/';

  return (
    <>
      <Navbar collapseOnSelect expand="lg" variant="dark" style={onLanding ? navBarBackground.transparent : navBarBackground.dark}>
        <Navbar.Brand as={Link} to="/scp-website"><img alt="DHIS2 logo" src={process.env.PUBLIC_URL + '/img/dhis2-logo.png'} /></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <div className="w-50 mr-auto">
            <SearchField searchButtonText="Search" navigateTo={() => history.push("/scp-website/")}/>
          </div>
          <Navigation >
            <Navigation.Link as={Link} to="/scp-website/information">Information</Navigation.Link>
            <Navigation.Link as={Link} to="/scp-website/contact">Contact us</Navigation.Link>
          </Navigation>
        </Navbar.Collapse>
      </Navbar>
    </>
  )
}

export default Nav