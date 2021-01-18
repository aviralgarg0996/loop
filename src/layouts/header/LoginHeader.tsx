import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.svg';
import close from '../../assets/images/icons/close.svg';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
} from 'reactstrap';

  const LoginHeader = () => {

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const navToggle = () => setIsOpen(false);
    
    return (
        <header>
            <Navbar expand="md">
                <div className="navbar-brand">
                    <Link to="/home"><img alt=''src={logo} /></Link>
                </div>
                {!isOpen && <NavbarToggler onClick={toggle}/>}
                {isOpen && <img alt=''src={close} onClick={toggle} className="close-btn"/>}
                <Collapse isOpen={isOpen} navbar>
                    <Nav navbar>
                        <NavItem>
                            <Link to="/sign-in" className="signin-btn" onClick={navToggle}>Sign In</Link>
                        </NavItem>
                        <NavItem>
                            <Link to="/sign-up" className="create-acc-btn" onClick={navToggle}>Create Account</Link>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </header>
    )
} 

export default LoginHeader;
