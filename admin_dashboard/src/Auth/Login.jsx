import React, { useState } from 'react'
import Cookies from 'universal-cookie';
import './style.scss'
import axios from "axios"
import { CONST } from '../constant'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet';

const Login = () => {
    const [email, setEmail] = useState();
    const [pass, setPass] = useState();


    async function submitLogin() {
        const formData = new FormData();
        formData.append('loginAction', 'true');
        formData.append('email', email);
        formData.append('password', pass);
        const rsp = await axios.post(CONST.API_SERVER + '/admin/login', formData, {
            'Content-Type': 'text/plain',
        });

        console.log("DATA :: " + rsp.data.result + " ::  Message : " + rsp.data.message);
        try {
            if (rsp.data.result.length > 0) {
                // // got id 
                const uid = rsp.data.result[0]['id'];
                const name = rsp.data.result[0]['name'];
                const cookies = new Cookies();
                cookies.set('_adId', uid, { path: '/' });
                cookies.set('_adName', name, { path: '/' });
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
                <title>Login - {CONST.APPNAME}</title>
            </Helmet>
            <main>
                <div class="wrapper">
                    <div class="heading">
                        <h1>Login</h1>
                    </div>
                    <form class="form-group">
                        <p id="message" className='message'></p>
                        <input type="text" placeholder="email" class="email" onChange={(e) => { setEmail(e.target.value); }} />
                        <input type="password" placeholder="password" class="passwd" onChange={(e) => { setPass(e.target.value); }} />
                        <input type="button" onClick={() => submitLogin()} value="Login" class="btn btn-primary" />
                        <a href="/forgot-password" class="btn btn-forget">Forget your password?</a>
                    </form>
                </div>
            </main>
        </>
    )
}

export default Login