import React from 'react'
import {
  Link,
  useLocation
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'purecss/build/pure.css'
import '../stylesheets/navigation.css'
import { Navbar, Nav as Navigation, Form, FormControl, Button } from 'react-bootstrap'
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
  const onLanding = location.pathname === '/';
  return (
    <>
      <Navbar collapseOnSelect expand="lg" variant="dark" style={onLanding ? navBarBackground.transparent : navBarBackground.dark}>
        <Navbar.Brand as={Link} to="/scp-website"><img alt="DHIS2 logo" src={process.env.PUBLIC_URL + '/img/dhis2-logo.png'} /></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <div className="w-50 mr-auto" style={{width: '200px'}}>
            <SearchField searchButtonText="Search" />
            {/* <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success">Search</Button> */}
          </div>
          <Navigation >
            {/* <Navigation.Link as={Link} to="/scp-website">Home</Navigation.Link> */}
            {/* <Navigation.Link as={Link} to="/scp-website/search">Search</Navigation.Link> */}
            <Navigation.Link as={Link} to="/scp-website/information">Information</Navigation.Link>
            <Navigation.Link as={Link} to="/scp-website/contact">Contact us</Navigation.Link>
          </Navigation>
        </Navbar.Collapse>
      </Navbar>
    </>
  )
}

export default Nav