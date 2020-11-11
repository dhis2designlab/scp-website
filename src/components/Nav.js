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
        <Navbar.Brand as={Link} to="/scp-website"><img id="logo" alt="DHIS2 logo" src={process.env.PUBLIC_URL + '/img/dhis2-logo.png'} /></Navbar.Brand>
        <div className="order-lg-second w-50" >
          <SearchField searchButtonText="Search" navigateTo={() => history.push("/scp-website/")} />
        </div>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" >
          <Navigation className="container-fluid justify-content-end">
            <Navigation.Item>
              <Navigation.Link as={Link} to="/scp-website/information">Information</Navigation.Link>
            </Navigation.Item>
            <Navigation.Item>
              <Navigation.Link as={Link} to="/scp-website/contact">Contact us</Navigation.Link>
            </Navigation.Item>
          </Navigation>
        </Navbar.Collapse>
      </Navbar>
    </>
  )
}

export default Nav