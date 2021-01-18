import React, { useState } from 'react';
import {  Link, NavLink } from 'react-router-dom';
import logo from '../../assets/images/logo.svg';
import close from '../../assets/images/icons/close.svg';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  Container, 
} from 'reactstrap';
import Config from '../../config/Config';

  const HomeHeader = () => {

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const navToggle = () => setIsOpen(false);
    const openTab = ()  => {
        window.open(Config.BLOG_URL);
      }
    return (
        <header className="home-page-header">
            <Container>
              
            <Navbar expand="md" className="pl-0 pr-0">
                <div className="navbar-brand">
                    <Link to="/home"><img alt=''src={logo} /></Link>
                </div>
                {!isOpen && <NavbarToggler onClick={toggle}/>}
                {isOpen && <img alt=''src={close} onClick={toggle} className="close-btn"/>}
                <Collapse isOpen={isOpen} navbar>
                <Nav navbar>
                    <NavLink exact  className={window.location.hash === "#/" ? "nav-link active": "nav-link"} to="/" onClick={navToggle}>                   
                       <span>Home</span>
                    </NavLink>
                    <NavLink exact  className={window.location.hash === "#/how-it-work" ? "nav-link active": "nav-link"} to="/how-it-work" onClick={navToggle}>                   
                        <span>How it Works</span>
                    </NavLink>
                    <NavLink exact  className="nav-link" to="/subscription" onClick={navToggle}>                   
                        <span>Subscription </span>
                    </NavLink>
                    <NavLink exact  className="nav-link" to="/" target="_blank" onClick={() => { navToggle(); openTab(); }}>                   
                        <span>Blog</span>
                    </NavLink>
                    <NavItem>
                        <Link to="/sign-in" className="signin-btn" onClick={navToggle}>Sign In</Link>
                    </NavItem>
                    <NavItem>
                        <Link to="/sign-up" className="create-acc-btn" onClick={navToggle}>Create Account</Link>
                    </NavItem>
                </Nav>
                </Collapse>
            </Navbar>
          
            </Container>
            
        </header>
    )
} 

export default HomeHeader;
