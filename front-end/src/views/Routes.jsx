import React from "react";
import { Routes as Switch, Route, Link } from 'react-router-dom';

//component imports
import Home from "../components/Home";
import LoginPage from "./LoginPage";

function Routes () {


    return (
        <>
            <Switch>
                <Route exact path='/' element={<Home />} />
                <Route exact path='/login' element={<LoginPage />} />
                <Route exact path='/account'>Account</Route>
                <Route exact path='/dashboard'>Dashboard</Route>
            </Switch>
        </>
    )
}

export default Routes;