import React, { useContext } from "react";
import UserContext from "../auth/UserContext"; 
import { NavLink } from 'react-router-dom';
import { 
    Nav,
    Navbar,
    NavbarBrand,
    NavItem 
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import './NavBar.css';


function NavBar({ logout }) {
    const { currentUser } = useContext(UserContext);
    
    const loggedInNav = (
        <>
            <NavItem>
                <NavLink to='/tickler'>Tickler</NavLink>
            </NavItem>
            <NavItem>
                <NavLink to='/' onClick={logout}>Log out</NavLink>
            </NavItem>
        </>
    )
    

    const loggedOutNav = (
            <>
            <NavItem>
                <NavLink to='/login'>Login</NavLink>
            </NavItem>
            </>
        )
    
    return (
        <>
            <Navbar className="navbar" expand="md">
                <NavLink exact="true" to="/" className="navbar-brand">
                    <img
                        id="company-logo"
                        alt="logo"
                        src="../CTH-Logo.webp"
                    />
                </NavLink>
                <h1>Facility Assist</h1>            
                <Nav className="m1-auto" navbar>
                    <NavItem>
                        <NavLink to='/'>Home</NavLink>
                    </NavItem>
                {currentUser ? loggedInNav : loggedOutNav }
                </Nav>
            </Navbar>
        </>
    )
}

export default NavBar;