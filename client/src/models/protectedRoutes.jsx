import { Route, Redirect } from "react-router-dom"
import React, { useState } from 'react'
import Cookies from 'universal-cookie'

const ProtectedRoute = ({ auth, component: Component, ...rest }) => {
    const [token, setToken] = useState();
    const cookies = new Cookies();
    const cuser = cookies.get('token');
    if (auth === false) {
        cookies.remove('token', { path: '/' })
        // console.log("Getting cookies " + cookies.getAll());
        return (
            <Route {...rest} render={(props) => {
                return (window.location.href = '/');
            }} />
        )
    }
    if (cuser === undefined || cuser === "undefined") {
        // console.log("User logged out")
        cookies.remove('token', { path: '/' })
        // console.log("Getting cookies " + cookies.getAll());
        return (
            <Route {...rest} render={(props) => {
                return (window.location.href = '/');
            }} />
        )
    }
    return (
        <Route {...rest} render={(props) => {
            // console.log(cuser);
            // if (cuser != null) return <Component {...props} />
            if (cuser === null || cuser === undefined) {
                return window.location.href = '/';
            } else {
                return <Component {...props} />
            }
        }} />
    )

}



export { ProtectedRoute }