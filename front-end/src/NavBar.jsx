import React from "react";
import { Nav,
    NavLink,
    NavItem 
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


function NavBar() {

    return (
        <>
            <Nav fill pills>
                <NavItem>
                    <NavLink to='/'>Home</NavLink>
                </NavItem>
            </Nav>
        </>
    )
}

export default NavBar;