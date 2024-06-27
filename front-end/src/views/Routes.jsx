import React from "react";
import { Routes as Switch, Route, Link, Navigate } from 'react-router-dom';

//component imports
import PrivateRoute from "./PrivateRoute";
import Home from "./Home";
import LoginPage from "./LoginPage";
import Dashboard from "./Dashboard";
import PageNotFound from "./PageNotFound";
import Facilities from "./Facilities";
import NewFacilityDocumentForm from "./NewFacilityDocumentForm";
import AuthCheck from "./AuthCheck";

function Routes ({ login }) {


    return (
        <>
            <Switch>
                <Route exact path='/' element={<Home />} />
                <Route exact='true' path='/account' />
                <Route element={<PrivateRoute />}>
                    <Route exact path='/dashboard' element={<Home />} />
                </Route>
                <Route element={<PrivateRoute />}>
                    <Route exact path='/facilities' element={<Facilities />} />
                </Route>
                <Route element={<PrivateRoute />}>
                    <Route exact path='/documents/new' element={<NewFacilityDocumentForm />} />
                </Route>
                <Route exact path='/login' element={<LoginPage login={login} />} />
                <Route path='*' element={<PageNotFound />}/>
            </Switch>
        </>
    )
}

export default Routes;