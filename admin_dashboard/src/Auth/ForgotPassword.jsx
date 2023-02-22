import React, { useState } from 'react'
import { CONST } from '../constant'
import axios from 'axios'
import Cookies from 'universal-cookie'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'

const ForgotPassword = () => {

  const [email, setEmail] = useState();
  const [pass, setPass] = useState();


  async function submitLogin() {
    const formData = new FormData();
    formData.append('loginAction', 'true');
    formData.append('email', email);
    const rsp = await axios.post(CONST.API_SERVER + '/admin/reset/password', formData, {
      'Content-Type': 'text/plain',
    });

    console.log(rsp.data.message);

    try {
      if (rsp.data.message === "Success") {
        alert("Password sent to your mail address");
        window.location.href = '/login';
        // console.log("redirect")
      } else {
        console.log("Email id not found!");
        document.getElementsByClassName("message")[0].innerHTML = `<center><p style='color:red'> Email id not found! </p></center>`;
        setTimeout(() => {
          document.getElementsByClassName("message")[0].innerHTML = ``;
        }, 10000);
      }
    } catch (error) {
      console.log("Login failed! ");
      document.getElementsByClassName("message")[0].innerHTML = `<center><p style='color:red'> Wrong info!</p></center>`;
      setTimeout(() => {
        document.getElementsByClassName("message")[0].innerHTML = ``;
      }, 5000);
    }

  }


  return (
    <>
    <Helmet><title>Forgot Password -  { CONST.APPNAME }</title></Helmet>

      <main>
        <div class="wrapper">
          <div class="heading">
            <h1>Reset Password</h1>
          </div>
          <form class="form-group">
            {/* <p class="account-heading">or use your account</p> */}
            <p className="message"></p>
            <input type="text" placeholder="Registered email" class="email" onChange={(e) => setEmail(e.target.value)} />

            <input type="button" onClick={() => submitLogin()} value="GET NEW PASSWORD" class="btn btn-primary" />

            <a href="/login" class="btn btn-forget">Got password? Login now</a>
          </form>
        </div>
      </main></>
  )
}

export default ForgotPassword