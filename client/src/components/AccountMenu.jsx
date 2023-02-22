import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { LOGOUT } from '../constants'
import './accountMenu.scss'
import Cookies from 'universal-cookie';
import axios from 'axios'
import { CONST } from '../constants'

const AccountMenu = ({ uid }) => {

  const [name, setMyName] = useState("...");
  const cookies = new Cookies();
  const cuser = cookies.get('token');

  async function getUSER(uid) {
    const formData = new FormData();
    formData.append('getSingleUserInfo', 'true');
    formData.append('uid', uid);
    const rsp = await axios.post(CONST.API_SERVER + '/user', formData, {
      'Content-Type': 'text/plain',
    });
    // console.log("Getting data " + rsp.data.message);  
    if (rsp.data.message.length > 0 && rsp.data.message === "Success") {
      const uid = rsp.data.result[0]['id'];
      const cookies = new Cookies();

      cookies.set('_tname', rsp.data.result[0]['name'], { path: '/' });
      // console.log("Name :: " + rsp.data.result[0]['name']);
      setMyName(rsp.data.result[0]['name']);
      // setMyName("sd");
    } else {
      console.log("Data recieve failed! ");
    }

  }

  getUSER(uid);

  // useEffect(() => {
  //   const formData = new FormData();
  //   formData.append('getSingleUserInfo', 'true');
  //   formData.append('uid', uid);

  //   axios.post(CONST.API_SERVER + '/user', formData, {
  //     'Content-Type': 'text/plain',
  //   }).then((rsp) => {
  //     console.log("Getting data " + rsp.data.result);
  //     if (rsp.data.message.length > 0 && rsp.data.message === "Success") {
  //       const uid = rsp.data.result[0]['id'];
  //       const cookies = new Cookies();
  //       console.log("Name :: " + rsp.data.result[0]['name']);
  //       setMyName(rsp.data.result[0]['name']);
  //       // setMyName("sd");
  //     } else {
  //       console.log("Data recieve failed! ");
  //     }
  //   }).catch((err) => console.log(err))


  // })


  // setName(rss);
  return (
    <div className='accountMenu'>
      <span className='menu-bar-right-side'> <div className="main-account-menu"><i className="icofont-user"></i>    {name} </div>
        <div className="dropdown-account-menu-right">
          <ul>
            <li> <a href={"/"}> My Courses </a> </li>
            <li> <a href={"/profile"} > Profile </a> </li>
            {/* <li> <a href={"/purchases"}> My Purchases </a> </li> */}
            {/* <li> <a href={"/settings"}> Settings </a> </li> */}
            {/* <li> <a href={"/new-updates"}> Updates </a> </li> */}
            <li> <a href={"/help"}> Help Center </a> </li>
            <li> <a href={"/"} onClick={LOGOUT} > Logout Account </a> </li>
          </ul>
        </div>
      </span>
    </div>
  )
}

export default AccountMenu