import Cookies from 'universal-cookie';
import axios from 'axios'
import { Route, Redirect } from "react-router-dom"
import React, { useState } from 'react'

const cookies = new Cookies();
const cuser = cookies.get('token');

const CONST = {
    // API_SERVER: "http://localhost:5000",
    
    API_SERVER: "https://trainingapi.ibc.media",
    ADMIN_SERVER: "https://learningadmin.ibc.media",
    CUSER: cuser,
    APPNAME: "IBC Media",
    APPLOGO: "logo.png",
    APPFAV: "logo.png"
}

const getPara = (parameter, isLast) => {
    return isLast ? window.location.href.split(`/${parameter}/`)[1] : window.location.href.split(`/${parameter}/`)[1].split('/')[0];
}

const getParaByPosition = (position) => {
    return decodeURI(window.location.href.split("//")[1].split('/')[position]);
}



const LOGOUT = () => {
    const cookies = new Cookies();
    // cookies.set('token', '0', { path: '/' });
    cookies.remove('_adId', { path: '/' });
    window.location.href = '/login';
}




const ProtectedRoute = ({ auth, component: Component, ...rest }) => {
    const [token, setToken] = useState();
    const cookies = new Cookies();
    const cuser = cookies.get('_adId');
    if (auth === false) {
        cookies.remove('_adId', { path: '/' })
        // console.log("Getting cookies " + cookies.getAll());
        return (
            <Route {...rest} render={(props) => {
                return (window.location.href = '/login');
            }} />
        )
    }
    if (cuser === undefined || cuser === "undefined") {
        // console.log("User logged out")
        cookies.remove('_adId', { path: '/' })
        // console.log("Getting cookies " + cookies.getAll());
        return (
            <Route {...rest} render={(props) => {
                return (window.location.href = '/login');
            }} />
        )
    }
    return (
        <Route {...rest} render={(props) => {
            // console.log(cuser);
            // if (cuser != null) return <Component {...props} />
            if (cuser === null || cuser === undefined) {
                return window.location.href = '/login';
            } else {
                return <Component {...props} />
            }
        }} />
    )

}
export { ProtectedRoute }


const MakeInput = ({ mname, setName, valu }) => {
    return <input type="text"
        value={mname}
        onChange={(e) => { setName(_ => e.target.value) }}
    />
}

export { CONST, LOGOUT, getPara, getParaByPosition, MakeInput }