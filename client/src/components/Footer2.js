import React from 'react'; 
import playstore from '../images/playstore.png';
import facebook from '../images/facebook.png';
import twitter from '../images/twitter.png';
import linkedin from '../images/linkedin.png';
import instagram from '../images/instagram.png';
import '../css/style.css';
import { Link } from 'react-router-dom';
function Footer2() {
    return (
        <div className=" container">
            <div className="row">
                <div className="col-md-7 col-sm-12">
                        <div className="row">
                            <div className="col-md-4 col-sm-12">
                                <ul style ={{listStyle:"none"}}><li><b>Mycourse</b></li></ul>
                                <ul style ={{listStyle:"none"}}>
                                    <a href={"/about-us"}> <li>About</li> </a>
                                    <li>Leadership</li>
                                    <li>Careers</li>
                                    <li>Catalog</li>
                                    <li>Certificates</li>
                                    <li>Degrees</li>
                                </ul>
                            </div>
                            <div className="col-md-4 col-sm-12">
                            <ul style ={{listStyle:"none"}}><li><b>Community</b></li></ul>
                            <ul style ={{listStyle:"none"}}>
                                    <li>About</li>
                                    <li>Leadership</li>
                                    <li>Careers</li>
                                    <li>Catalog</li>
                                    <li>Certificates</li>
                                    <li>Degrees</li>
                                </ul>
                            </div>
                            <div className="col-md-4 col-sm-12">
                            <ul style ={{listStyle:"none"}}><li><b>More</b></li></ul>
                            <ul style ={{listStyle:"none"}}>
                                    <li>About</li>
                                    <li>Leadership</li>
                                    <li>Careers</li>
                                    <li>Catalog</li>
                                    <li>Certificates</li>
                                    <li>Degrees</li>
                                </ul>
                            </div>
                        </div>
                </div>
                   <div className="col-md-5 col-sm-12">
                        <div>
                            <ul style ={{listStyle:"none"}}>
                                <li><img src ={"/images/download_on_the_app_store_badge_en.svg"} alt="" width="200" height="60"/></li>
                                <li><img src ={playstore} alt=""width="200" height="60"/></li>
                            </ul>
                        </div>
                   </div>
                </div>
                <hr/>
                <div className="row">
                    <div className="col-md-9 col-sm-12">
                        <p>© 2020 Mycourse Inc. All rights reserved.</p>
                    </div>
                    <div className="col-md-3 col-sm-12">
                        <img src ={facebook} alt="" style={{padding:"10px"}}/>
                        <img src ={linkedin} alt="" style={{padding:"10px"}}/>
                        <img src ={twitter} alt="" style={{padding:"10px"}}/>
                        <img src ={instagram} alt="" style={{padding:"10px"}}/>
                    </div>
                </div>
            </div>
    )
}

export default Footer2
