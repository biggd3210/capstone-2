import React from "react";
import { NavLink } from 'react-router-dom';
import { 
    Nav,
    Navbar,
    NavbarBrand,
    NavItem 
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import './NavBar.css';


function NavBar() {

    return (
        <div>
            <Navbar expand="md">
                <NavLink exact="true" to="/" className="navbar-brand">
                    <img
                        id="company-logo"
                        alt="logo"
                        src="../CTH-Logo.webp"
                    />
                    
                </NavLink>
            
                <Nav className="m1-auto" navbar>
                    <NavItem>
                        <NavLink to='/'>Home</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink to='/login'>Login</NavLink>
                    </NavItem>
                </Nav>
            </Navbar>
        </div>
    )
}

export default NavBar;