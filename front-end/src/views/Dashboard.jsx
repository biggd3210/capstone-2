import React, { useContext } from "react";
import UserContext from "../auth/UserContext";
import "./Dashboard.css";
import ButtonLink from "../components/ButtonLink";
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
                <ButtonLink path="/user/documents" text="Your Documents" />
                <ButtonLink path="/documents/new" text="Submit Document" />
                <ButtonLink path="/team-notes" text="Team Notes" />
            </div>
            <div className="facility-tickler">
                <Tickler facility="wolfe" />
            </div>
            </div>
        </div>
    )
}

export default Dashboard;