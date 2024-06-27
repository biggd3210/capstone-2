import React, { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import UserContext from "../auth/UserContext";

/** component wrapper for private routes.
 * 
 * This will check if there is a valid current user before displaying route. If no valid current user, this will redirect to the login view.
 */

function PrivateRoute() {
    const { currentUser } = useContext(UserContext);

    if (!currentUser) {
        return <Navigate to="/login" replace="true" />;
    }

    return <Outlet />;
}

export default PrivateRoute;