import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import '../Styles/Header.css';

class Header extends React.Component {
    render() {
      return (
        <Navbar id="navigation" sticky="top" collapseOnSelect expand="lg">
        <Container>
          <Navbar.Brand id="logo" href="#hero-container">User</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto justify-content-end" id="items" style={{ width: "100%" }}>
         
           
            <div className='headerbtn'>
            <LogoutButton />
            </div>
          </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
        )
    }
  }
  
  export default Header;