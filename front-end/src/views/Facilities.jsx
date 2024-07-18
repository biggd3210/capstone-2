import React from "react";
import FacilityAssistApi from "../api/api";


function Facilities() {

    return (
        <div>
            <h1>These are the listed facilities.</h1>
            <button onClick={FacilityAssistApi.ListObjectsInBucket}>List All Objects</button>
        </div>
    )
}

export default Facilities;