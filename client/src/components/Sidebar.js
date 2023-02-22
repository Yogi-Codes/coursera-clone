import React from 'react'

import '../css/style.css';
import {Link} from 'react-router-dom'
import logo from '../images/download.svg';
function Sidebar() {
    return (
        <div className="mobile-nav active animated slideInLeft">
        <div class ="sidebar">
        <div class ="brand-img">
          <a href="/"><img src ={logo} alt=""/></a>
      </div>
      <div class ="side-item"><a href="/"><p>Explore</p></a></div><hr/>
      <div class ="side-item"><a href="/"><p>For Enterprise</p></a></div><hr/>
      <div class ="side-item"> <a href="/login"><p>Log in</p></a></div><hr/>
      <div class ="side-item"><a href="/signup"><p>Signup</p></a></div><hr/>
      <div class ="side-item"><a href="/"><button id="joinbtn" style ={{width:"200px"}}>Join for Free</button></a></div>
        </div>
    </div>
    )
}

export default Sidebar
