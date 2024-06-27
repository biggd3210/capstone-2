import React from "react";

import { NavLink } from "react-router-dom";

import "./ButtonLink.css";

function ButtonLink({ text, path }) {

    return (
        <div className="ButtonLink">
            <NavLink to={path}>
                <button className="navlink-button">{text}</button>
            </NavLink>
        </div>
    )
}

export default ButtonLink;