import React, { useEffect, useState } from "react";
import FacilityAssistApi from "../api/api";
import { DateTime } from 'luxon';


function Tickler({facility}) {
    const [ infoLoaded, setInfoLoaded ] = useState(false);
    const [ reportDates, setReportDates ] = useState([]);
    
    // useEffect(function loadUserDocs() {
    //     async function getDocsByAuthor() {
    //         setUserDocs([])
    //         if (userDocs.length === 0) {
    //             try {
                    
    //                 const res = await FacilityAssistApi.findDocsByFacility(facilityName);
    //                 setUserDocs(res);
    //             } catch (err) {
    //                 console.error("Facilities loadUserDocs: problem loading docs", err);
    //                 setUserDocs(null);
    //             }
    //         }
    //         setInfoLoaded(true);
    //     }
        
    //     setInfoLoaded(false);
    //     getDocsByAuthor();
    // }, [facilityName]);
    
    useEffect( function loadFacilityReportDates() {
        async function getReportDatesByFacility() {
            setReportDates([])
            if (reportDates.length === 0) {
                try {
                    const res = await FacilityAssistApi.fetchReportDates(facility);
                    setReportDates(res);
                } catch (err) {
                    console.error("Tickler fetchReportDates: problem loading reportDates", err);
                    setReportDates(null);
                }
            }
            setInfoLoaded(true);
        }

        setInfoLoaded(false);
        getReportDatesByFacility();
    }, [])
    reportDates.forEach((record) => console.log(DateTime.fromISO(record.dateSubmitted).toLocaleString()))
    const dueDates = reportDates.map((report) => 
        (
            <div className="row" key={report.id}>
                <div className="col-md-3">
                    <p>Document Type:</p>
                    <p>{report.docType}</p>
                </div>
                <div className="col-md-3">
                    <p>Date Submitted:</p>
                    <p>{DateTime.fromISO(report.dateSubmitted).toLocaleString()}</p>
                </div>
                <div className="col-md-3">
                    <p>Submitted by:</p>
                    <p>{report.author}</p>
                </div>
                <div className="col-md-3">
                    <p>Next Due Date:</p>
                    <p>{report.dueDate}</p>
                </div>
            </div>
        )
    )

    return (
        <>
            <div className="row">
                <h2>Deadlines for {facility}</h2>
                <div className="due-date-records">
                    {dueDates}
                </div>
            </div>
        </>
    )
}

export default Tickler;