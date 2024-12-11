import React, { useContext } from "react";
import UserContext from "../auth/UserContext";
import "./Dashboard.css";
import ButtonLink from "../components/ButtonLink";
import { NavLink } from "react-router-dom";
import Tickler from "../components/Tickler";

function Dashboard () {
    const { currentUser } = useContext(UserContext);
    
    return (
        <div className="Dashboard">
            <div className="welcome-banner">
                <h2>Welcome, {currentUser.firstName}</h2>
            </div>
            <div className="container">
            <div className="nav-left-pane">
                <ButtonLink path="/facilities" text="Your Facilities" />
                {/* <ButtonLink path="/user/documents" text="Your Documents" /> */}
                <ButtonLink path="/documents/new" text="Submit Document" />
                {/* <ButtonLink path="/team-notes" text="Team Notes" /> */}
                <a href="https://mylisa.com/depo-provera/">Depo-Provera</a>
            </div>
            <div className="facility-tickler">
                <Tickler facilityId={currentUser.facilities[0]['id']} facilityName={currentUser.facilities[0]['facility_name']} />
            </div>
            </div>
        </div>
    )
}

export default Dashboard;