import React, { useState } from 'react'
import Nav from '../../components/NavBar'
import Footer from '../../components/Footer'
import { Link } from 'react-router-dom'
import Cookies from 'universal-cookie'
import axios from 'axios'
import loading from "../../images/loading.gif"
import { CONST } from '../../constants';
import '../../css/style.css';
import { Helmet } from 'react-helmet'

const ForgotPassword = () => {

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [up, setUp] = useState(0);
    const handleSubmit = async e => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('loginAction', 'true');
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);

        const rsp = await axios.post(CONST.API_SERVER + '/register', formData, {
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

        console.log("User Id " + rsp.data.result[0]['id']);

        if (rsp.data.result.length > 0 && rsp.data.result[0]['id'] !== undefined && rsp.data.result[0]['id'] !== "undefined") {
            // // got id 
            const uid = rsp.data.result[0]['id'];
            const cookies = new Cookies();
            cookies.remove('token');
            cookies.set('token', uid, { path: '/' });
            window.location.href = '/';
        } else {
            console.log("Login failed! ");
            document.getElementsByClassName("message")[0].innerHTML = `<center><p style='color:red'> ` + rsp.data.result + `</p></center>`;
            setTimeout(() => {
                document.getElementsByClassName("message")[0].innerHTML = ``;
            }, 10000);
        }
    }

    return (
        <>
          <Helmet>
                <title> Reset password - {CONST.APPNAME} </title>
            </Helmet>
            <Nav />
            <div class="container-fluid loginScreen">
                <div class="row">
                    <div class="col-md-4"></div>
                    <div class="col-md-4">
                        <div class="signup-box">
                            <h3 class="text-center">Reset Password</h3><br />
                            {/* <button id="facebtn"><i class ="fa fa-facebook">&nbsp;&nbsp;Continue With Facebook</i></button><br/>
                        <button id="applebtn"><i class ="fa fa-apple">&nbsp;&nbsp;Continue With Apple</i></button> */}
                            <hr />
                            {/* <p class ="text-center">Or</p> */}
                            <form onSubmit={handleSubmit}>
                                <div className='message'> </div>
                                <div class="form-item">
                                    <p>ENTER REGISTERED EMAIL ID</p>
                                    <input type="email" onChange={e => setEmail(e.target.value)} />
                                </div>
                                <br />
                                {up > 0 ? <div > <img src={loading} alt="" className='loading-icon-small' />  </div> :
                                    <button id="signjoin">Get Password</button>}
                            </form>
                            <br />
                            <br />
                            <a href="/login"><p class="text-center">Account recovered? Login now</p></a>
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

export default ForgotPassword