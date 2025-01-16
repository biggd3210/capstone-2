import React, { useEffect, useState } from "react";
import FacilityAssistApi from "../api/api";
import { DateTime, Interval } from 'luxon';
import './Tickler.css';


function Tickler({facilityId, facilityName}) {
    const [ infoLoaded, setInfoLoaded ] = useState(false);
    const [ reportDates, setReportDates ] = useState([]);
    
    useEffect( function loadFacilityReportDates() {
        async function getReportDatesByFacility() {
            setReportDates([])
            if (reportDates.length === 0) {
                try {
                    const res = await FacilityAssistApi.fetchReportDates(facilityId);
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
    
    const dueDates = reportDates.map((report) => {
        // let deadline = Interval.fromDateTimes(DateTime.now(), DateTime.fromFormat(report.dueDate, "dd-MM-YYYY"));
        // console.log('deadline is ', deadline);
        
        return (
            <div className="row entry-row" key={report.id}>
                <div className="col-md-3">
                    <p>{report.docType}</p>
                </div>
                <div className="col-md-3">
                    <p>{DateTime.fromISO(report.dateSubmitted).toLocaleString()}</p>
                </div>
                <div className="col-md-3">
                    <p>{report.author}</p>
                </div>
                <div className="col-md-3">
                    <p>{report.dueDate}</p>
                </div>
            </div>
        )
})


    return (
        <>
            <div className="row deadline-header">
                <h2>Deadlines for {facilityName}</h2>
            </div>
            <div className="due-date-records">
                <div className="row head-row">
                    <div className="col-md-3 title-cell">
                        <p className="title">Document Type:</p>
                    </div>
                    <div className="col-md-3 title-cell">
                        <p className="title">Date Submitted:</p>
                    </div>
                    <div className="col-md-3 title-cell">
                        <p className="title">Submitted By:</p>
                    </div>
                    <div className="col-md-3 title-cell">
                        <p className="title">Next Due Date:</p>
                    </div>
                </div>
                {dueDates}
            </div>
        </>
    )
}

export default Tickler;