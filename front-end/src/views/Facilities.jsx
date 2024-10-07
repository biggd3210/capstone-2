import React, { useContext, useState, useEffect } from "react";
import FacilityAssistApi from "../api/api";
import UserContext from "../auth/UserContext";
import DocumentCard from "../components/DocumentCard";

import {quantum} from 'ldrs';

quantum.register();

function Facilities() {
    
    const { currentUser } = useContext(UserContext);
    const [infoLoaded, setInfoLoaded] = useState(false);
    const [userDocs, setUserDocs] = useState([]);
    const [ facilityName, setFacilityName ] = useState(currentUser.facilities[0]['id'])

    useEffect(function loadUserDocs() {
        async function getDocsByAuthor() {
            setUserDocs([])
            if (userDocs.length === 0) {
                try {
                    
                    const res = await FacilityAssistApi.findDocsByFacility(facilityName);
                    setUserDocs(res);
                } catch (err) {
                    console.error("Facilities loadUserDocs: problem loading docs", err);
                    setUserDocs(null);
                }
            }
            setInfoLoaded(true);
        }
        
        setInfoLoaded(false);
        getDocsByAuthor();
    }, [facilityName]);

    async function updateFacilityName(evt) {
        setUserDocs([]);
        setFacilityName(evt.target.getAttribute("data-id"));
    }
    const docs = userDocs.map((doc) => 
        (
            <div className="col-md-4" key={doc.id}>
                <DocumentCard doc={doc} />
            </div>
        )
    )
    return (

        <div>
            {(infoLoaded) ?
            <div>
                <h3>Your facilities are listed below.</h3>
                <div className="row">
                    {currentUser.facilities.map((facility) => <button className="facilityButton" key={facility['facility_name']} data-id={facility['id']} onClick={updateFacilityName}>{facility['facility_name']}</button>)}
                </div>
                <div className="row">
                {docs}
                </div>
                
            </div>
            : <l-quantum
                size="200"
                speed="5"
                color='rgb(56,159,255)'
            ></l-quantum>
            }
        </div>          
    )
}

export default Facilities;