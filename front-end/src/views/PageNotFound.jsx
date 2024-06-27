import React from "react";
import { Card, 
        CardHeader, 
        CardBody, 
        CardTitle,
        CardText,
        Button,
        CardFooter } from 'reactstrap';
import { NavLink } from "react-router-dom";

function PageNotFound() {

    return (
        <Card className="not-found-card">
            <CardHeader></CardHeader>
            <CardBody>
                <CardTitle tag="h4">
                    Page Not Found
                </CardTitle>
                <CardText>
                We're sorry, but it appears the page you are looking for is unavailable or does not exist.
                </CardText>
                <NavLink to="/">
                    <Button>Return to Home</Button>
                </NavLink>
            </CardBody>
            <CardFooter></CardFooter>
        
        
        </Card>
    )
}

export default PageNotFound;