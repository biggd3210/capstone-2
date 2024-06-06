import React, { useState } from "react";

/* Styles and image imports */
import './Home.css'
import reactLogo from '../assets/react.svg'
import cthLogo from '/CTH-Logo.webp'
import { NavLink } from "react-router-dom";

function Home() {
    
    return (
        <>
            <div>
                <a href="https://cthohio.org" target="_blank">
                    <img src={cthLogo} className="logo" alt="CTH logo" />
                </a>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
            </div>
            <h1>Facility Assist</h1>
            <div className="card">
                <p>Please login to access facility documents.</p>
                <NavLink to="/login">
                    <button>Login</button>
                </NavLink>
                
            </div>
           
      </>
    )
}

export default Home;