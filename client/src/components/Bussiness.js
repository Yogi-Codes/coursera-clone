import React from 'react'
import '../css/style.css';
import { Link } from 'react-router-dom';

function Bussiness() {
    return (
        <div class ="container-fluid Bussiness" style ={{padding:"50px"}}>
            <div class ="row">
                <div class ="col-md-2 col-sm-12"></div>
                <div class ="col-md-5 col-sm-12">
                    <p id="coursesheading"><span id="boldtext">2000+</span>Mycourse for Business customers</p>
                    <div class ="row text-center">
                        <div class ="col-md-12">
                        <img  id="mobilesponsorimg"src ={"/images/loreal.svg"} alt=""  />
                        <img  id="mobilesponsorimg"src ={"/images/pandg.svg"} alt=""  />
                        <img  id="mobilesponsorimg"src ={"/images/novartis.svg"} alt=""  />
                        <img  id="mobilesponsorimg"src ={"/images/telenor.png"} alt=""  />
                        <img  id="mobilesponsorimg"src ={"/images/airbus.svg"} alt=""  />
                        <img  id="mobilesponsorimg"src ={"/images/axisbank.svg"} alt=""  />
                        <img  id="mobilesponsorimg"src ={"/images/accelya.svg"} alt=""  />
                        <img  id="mobilesponsorimg"src ={"/images/tata.svg"} alt=""  />
                        <img  id="mobilesponsorimg"src ={"/images/axa.svg"} alt=""  />
                        <img  id="mobilesponsorimg"src ={"/images/danone.png"} alt=""  />
                        <img  id="mobilesponsorimg"src ={"/images/sk.svg"} alt=""  />
                        </div>
                    </div>
                </div>
                <div class ="col-md-4 col-sm-12">
                    <div>
                        <h2><b>Mycourse for Business</b></h2>
                        <p style ={{fontSize:"18px"}}>We’ve got the solution: world-class training and development programs developed by top universities and companies. All on Mycourse for Business.</p>
                       <a href={"/business"}>  <button style ={{border:"1px solid #2a73cc",color:"#2a73cc",padding:"10px",cursor:"pointer",backgroundColor:"#ffff"}}>Learn More</button>  </a>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Bussiness
