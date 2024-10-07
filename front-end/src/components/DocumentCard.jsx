import React, { useEffect, useState } from "react";
import FacilityAssistApi from "../api/api";

import './DocumentCard.css';


function DocumentCard({doc}) {
    const [imgBlob, setImgBlob] = useState(null);
    async function retrieveThumbnail(fileName) {
        try {
            const image = await FacilityAssistApi.GetObjectFromBucket({ key: fileName });
            return image;
        } catch(e) {
            console.error("Error retrieving thumbnail")
        }
    }

    async function downloadFile(evt) {
        evt.preventDefault();
        const image = await retrieveThumbnail(evt.target.dataset.id);
        const imageURL = window.URL.createObjectURL(image);
        const element = document.createElement("a");
        element.href = imageURL;
        element.download = "image.jpg";
        element.click();
        // var win = window.open(element, '_blank');
        // win.focus();
    }
    // Original function for loading on demand. Refactored for lazy loading. Keep until lazy loading functions. 

    async function loadThumbnail(evt) {
        evt.preventDefault();
        const fileName = evt.target.dataset.id;
        const image = await retrieveThumbnail(fileName);
        const urlCreator = window.URL || window.webkitURL;
        const imageURL = urlCreator.createObjectURL(image)
        
        const thumbnail = document.createElement('img');
        thumbnail.src = imageURL;
        thumbnail.alt = "Document Preview";
        evt.target.nextSibling.appendChild(thumbnail);
        // var win = window.open(image, '_blank');
        // win.focus();
    }

    async function loadThumbnailPassive(fileName) {
        const image = await retrieveThumbnail(fileName);
        console.log('image is ', image);
        const urlCreator = window.URL || window.webkitURL;
        const imageURL = urlCreator.createObjectURL(image)
        const trueURL = imageURL.slice(5);
        console.log('image url is ', trueURL);
        return trueURL;
    }

    async function backendRetrieve(filename) {

    }
    //setImgBlob(loadThumbnail(doc.fileName));

    return (
        <div className="card">
                <div className="card-title">
                    <h4>{doc.docType} for {doc.docPeriod}, {doc.docYear}</h4>
                    <h5>{doc.facilityId.toUpperCase()}</h5>
                </div>
                <div className="card-body">
                    <p>File Name: {doc.fileName}</p>
                    <p>Next Due date: {doc.dueDate}</p>
                </div>
                <div className="card-footer">
                    <button data-id={doc.fileName} onClick={loadThumbnail}>Preview</button>
                    <div className="image-thumbnail">
                        {/* <img src={imgBlob} alt="image thumbnail"></img> */}
                        
                    </div>
                    <button data-id={doc.fileName} onClick={downloadFile}>Download File</button>
                </div>
            </div>
    )
}

export default DocumentCard;