import React from "react";

import {
    FormGroup,
    Input,
    Label,
    Col
} from "reactstrap";

function FormInput({ type, name }) {

    return (
        <div className="Form-Group">
            <FormGroup row className="form-input">
                <Label htmlFor={name.toLowerCase()}>{name}:</Label>
                <Col>
                <Input  id={name.toLowerCase()} name={name.toLowerCase()} type={type} />
                </Col>
            </FormGroup>
        </div>
    )

}

export default FormInput;