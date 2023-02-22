import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import "../../constants"
import Cookies from 'universal-cookie';
import '../../css/style.css';
import { CONST } from '../../constants';
import axios from 'axios'
import loading from "../../images/loading.gif" 
import Nav from '../../components/NavBar';
import Footer from '../../components/Footer';
import { Helmet } from 'react-helmet';


function Login({ setToken }) {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [up, setUp] = useState(0);

    function setToken(userToken) {
        sessionStorage.setItem('token', JSON.stringify(userToken));
    }
    const handleSubmit = async e => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('loginAction', 'true');
        formData.append('email', email);
        formData.append('password', password);
        const rsp = await axios.post(CONST.API_SERVER + '/login', formData, {
            'Content-Type': 'text/plain',
            onUploadProgress: progressEvent => {
                const perc = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                setUp(parseInt(perc));

                // clear percentage 
                setTimeout(() => {
                    if (perc === 100) {
                        setUp(0);
                    }
                }, 1000);
            }
        });

        // const token = await loginUser({
        //     email,
        //     password
        // });
        // setToken(token);
        try {
            if (rsp.data.result.length > 0) {
                // // got id 
                const uid = rsp.data.result[0]['id'];
                const cookies = new Cookies();
                cookies.set('token', uid, { path: '/' });
                window.location.href = '/';
            } else {
                console.log("Login failed! ");
                document.getElementsByClassName("message")[0].innerHTML = `<center><p style='color:red'> Login failed! Please check info </p></center>`;
                setTimeout(() => {
                    document.getElementsByClassName("message")[0].innerHTML = ``;
                }, 10000);
            }
        } catch (error) {
            console.log("Login failed! ");
            document.getElementsByClassName("message")[0].innerHTML = `<center><p style='color:red'> Login failed! Please check info </p></center>`;
            setTimeout(() => {
                document.getElementsByClassName("message")[0].innerHTML = ``;
            }, 5000);
        }

    }

    return (
        <>
            <Helmet>
                <title> Login - {CONST.APPNAME} </title>
            </Helmet>
            <Nav />
            <div className="container-fluid loginScreen">
                <div className="row">
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                        <div className="signup-box">
                            <h3 className="text-center">Log In</h3><br />
                            {/* <button id="facebtn"><i class ="fa fa-facebook">&nbsp;&nbsp;Continue With Facebook</i></button><br/>
                        <button id="applebtn"><i class ="fa fa-apple">&nbsp;&nbsp;Continue With Apple</i></button> */}
                            <hr />
                            {/* <p class ="text-center">Or</p> */}
                            <form onSubmit={handleSubmit} >
                                <div className='message'> </div>
                                <div className="form-item">
                                    <p>EMAIL</p>
                                    <input type="text" onChange={e => setEmail(e.target.value)} />
                                </div>
                                <div className="form-item">
                                    <p>PASSWORD</p>
                                    <input type="password" onChange={e => setPassword(e.target.value)} />
                                </div>
                                <a href="/forget-password"><p>Forgot Password ?</p></a>
                                {up > 0 ? <div > <img src={loading} alt="" className='loading-icon-small' />  </div> :
                                    <button id="signjoin">Log In</button>}
                            </form>
                            <br />
                            <p className="text-center">Or</p>
                            <a href="/signup"><p className="text-center">Don't Have an Account ?</p></a>
                            {/* <a href="/"><p className="text-center">Log In with your Organisation</p></a> */}
                        </div>
                    </div>
                </div>
                <br />
                <br />
                <br />
            </div>
            <Footer />
        </>
    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}

export default Login


async function loginUser(credentials) {

    return fetch(CONST.API_SERVER + '/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(data => data.json())
}