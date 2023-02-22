import Cookies from 'universal-cookie';
import axios from 'axios'

const cookies = new Cookies();
const cuser = cookies.get('token');

const CONST = {
    // API_SERVER: "http://localhost:5000", 
    API_SERVER: "https://trainingapi.ibc.media",
    ADMIN_SERVER: "https://learningadmin.ibc.media",
    // ADMIN_SERVER: "http://localhost:2345",
    PLAYSTORE: "",
    APPLESTORE: "",
    CUSER: cuser,
    APPNAME: "IBC Media",
    APPLOGO: "logo.png",
    APPFAV: "company-logo.png"
}

const getPara = (parameter, isLast) => {
    return isLast ? window.location.href.split(`/${parameter}/`)[1] : window.location.href.split(`/${parameter}/`)[1].split('/')[0];
}

const getYouTubePara = (link) => {
    return link.split(`watch?v=`)[1].split('/')[0];
}

const getParaByPosition = (position) => {
    return decodeURI(window.location.href.split("//")[1].split('/')[position]);
}



const LOGOUT = () => {
    const cookies = new Cookies();
    // cookies.set('token', '0', { path: '/' });
    cookies.remove('token', { path: '/' });
    window.location.href = '/';
}
export { CONST, LOGOUT, getPara, getParaByPosition, getYouTubePara }