import React from "react";

import {
    FormGroup,
    Input,
    Label,
    Col
} from "reactstrap";

function FormInput({ type, name, handleChange, value }) {

    return (
        <div className="Form-Group">
            <FormGroup row className="form-input">
                <Label htmlFor={name.toLowerCase()}>{name}:</Label>
                <Col>
                <Input  
                    id={name.toLowerCase()} 
                    name={name.toLowerCase()} 
                    type={type}
                    value={value}
                    onChange={handleChange} 
                />
                </Col>
            </FormGroup>
        </div>
    )

}

export default FormInput;