import React from 'react'
import { Link } from 'react-router-dom';
import '../css/style.css';
function Header() {
    return (
        <div className="container-fluid header-banner" style={{overflowX:"hidden"}}>
            <div className="row">
                <div className="col-md-12 col-sm-12">
                    <div className="header-text-content">
                        <div className="row">
                            <div className="col-md-7 col-sm-12">
                            <div data-aos="zoom-in"><h1 id="uniqheader">Your Course To Success</h1></div>
                            <p id="uniqpara">Build skills with courses, certificates, and degrees online from world-class universities and companies</p>
                            <a href={"/signup"}> <button id ="uniqbutton">Join for Free</button> </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
           
        </div>
    )
}

export default Header
