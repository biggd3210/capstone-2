import React, { useState, useContext } from "react";
import UserContext from "../auth/UserContext";
/* Styles and image imports */
import './Home.css'
import { NavLink } from "react-router-dom";
import Dashboard from "./Dashboard";

function Home() {
    const { currentUser } = useContext(UserContext);
    
    const homeView = (
        <div>
            <h3>Welcome to Facility Assist, a one stop app to upload, store, and recall your facility files.</h3>

            <p>Your trust in our service is important to us. If you experience any issues, please reach out for assistance. Otherwise, feel free to login and get started. Happy filing!</p>
        </div>
    )

    
    
    return (
        <>
            {currentUser
            ? <Dashboard />
            : homeView }
        </>
    )
}

export default Home;