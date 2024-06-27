import React, { useContext } from "react";
import UserContext from "../auth/UserContext";

import { Navigate, useNavigate } from "react-router-dom";

function AuthCheck () {
    const currentUser = useContext(UserContext);

    if (!currentUser) {
        useNavigate('/login');
    }

    return (
        <Navigate to='/dashboard' replace='true' />
    )
}

export default AuthCheck;