/** Imports from NPM Modules */
import React, { useState, useContext } from "react";

// API
import FacilityAssistApi from "../api/api";

/** Imports for styling components with reactstrap */
import {Form,
        FormGroup,
        Label,
        Input,
        FormText,
        Button
        } from 'reactstrap';

/** Imports from Components and Views */
import FormInput from "../components/FormInput";

/** Imports from Helpers and Styling*/
import UserContext from "../auth/UserContext";
import "./NewFacilityDocumentForm.css";

function NewFacilityDocumentForm() {
    const { currentUser } = useContext(UserContext);
    const [ formData, setFormData ] = useState({
        "author": currentUser.username,
        "dateTime" : "",
        "facility" : "",
        "docType" : "Fire Drill",
        "period" : "Please Choose Period",
        "year" : "2024",
        "attachments" : "No",
        "fileName" : ""
    });

    const [fileData, setFileData] = useState(null);

    function handleChange (e) {
        const { name, value } = e.target;
        setFormData(l => ({... formData, [name]: value}))
        console.log('formData is ', formData);
    }

    function handleFileChange (e) {
        const target = e.target;
        console.log("target type is ", target.files[0].type);
        console.log('target files is ', target.files);
        setFileData(target.files[0]);
        const newFormData = {... formData};
        newFormData['fileName'] = `${target.files[0].name}`;
        setFormData(newFormData);
    }

    async function handleSubmit (e) {
        e.preventDefault();
        const data = {
            'file' : fileData,
            'form' : formData
        }
        const res = await FacilityAssistApi.putToBucket(data);


    }

    function removeParent(e) {
        e.preventDefault();
        setFileData(null);
    }

    return (
        <div className="NewFacilityDocumentForm">
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label for="user">User</Label>
                    <Input 
                        id="user"
                        name="user"
                        type="text"
                        value={formData.author}
                        onChange={handleChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="facility">Facility</Label>
                    <Input
                        id="facility"
                        name="facility"
                        type="text"
                        value={formData.facility}
                        onChange={handleChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="docType">Document Type</Label>
                    <Input
                        id="docType"
                        name="docType"
                        type="select"
                        value={formData.docType}
                        onChange={handleChange}
                    >
                        <option>Please Select File Type</option>
                        <option>Fire Drill</option>
                        <option>On-Site Inspection</option>
                        <option>Health and Safety</option>
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label for="period">Period</Label>
                    <Input
                        id="period"
                        name="period"
                        type="select"
                        value={formData.period}
                        onChange={handleChange}
                    >
                        <option>Please Choose Appropriate Period</option>
                        <option>January</option>
                        <option>February</option>
                        <option>March</option>
                        <option>April</option>
                        <option>May</option>
                        <option>June</option>
                        <option>July</option>
                        <option>August</option>
                        <option>September</option>
                        <option>October</option>
                        <option>November</option>
                        <option>December</option>
                        <option>Quarter 1</option>
                        <option>Quarter 2</option>
                        <option>Quarter 3</option>
                        <option>Quarter 4</option>
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label for="year">Year</Label>
                    <Input
                        id="year"
                        name="year"
                        type="select"
                        value={formData.year}
                        onChange={handleChange}
                    >
                        <option>2023</option>
                        <option>2024</option>
                        <option>2025</option>
                        <option>2026</option>
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label for="attachments">Are there attachment images?</Label>
                    <Input
                        id="attachments"
                        name="attachments"
                        type="select"
                        value={formData.attachments}
                        onChange={handleChange}
                    >
                        <option>No</option>
                        <option>Yes</option>
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label for="document">Document Upload</Label>
                    <Input
                        id="document"
                        name="document"
                        type="file"
                        onChange={handleFileChange}
                                                
                    />
                </FormGroup>
                <Button type="submit">Submit New Document</Button>
                {fileData !== null
                    ?   <div className="preview-container">
                            <img className="image-preview" src={URL.createObjectURL(fileData)} />
                            <button id="remove" onClick={removeParent}>X</button>
                        </div>
                    : ''
                }                
            </Form>
        </div>
    )
}

export default NewFacilityDocumentForm;