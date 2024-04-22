import React from "react";

import {
    FormGroup,
    Input,
    Label,
    Col
} from "reactstrap";

function FormInput({ type, name }) {

    return (
        <div>
            <FormGroup row>
                <Label  sm={2} htmlFor={name.toLowerCase()}>{name}:</Label>
                <Col sm={6}>
                <Input  id={name.toLowerCase()} name={name.toLowerCase()} type={type} />
                </Col>
            </FormGroup>
        </div>
    )

}

export default FormInput;