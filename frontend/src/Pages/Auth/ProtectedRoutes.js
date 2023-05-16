import React from 'react';

import { Navigate, Outlet } from "react-router-dom";



function ProtectedRoutes() {

    return (
        <>
            {
                localStorage.getItem('auth_token')? <Outlet /> : <Navigate to="/" />
            }
        </>
    )
}

export default ProtectedRoutes;