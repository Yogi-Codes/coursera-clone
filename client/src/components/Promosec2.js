import React from 'react'
import '../css/style.css';
import secphoto from '../images/secondary-consumer-hero-img.png';
import { Link } from 'react-router-dom';

function Promosec2() {
    return (
        <div class ="container-fluid Promosec2" style ={{backgroundColor:"#FCF4CF",paddingBottom:"60px"}}>
            <div class ="row">
                <div class ="col-md-2 col-sm-12"></div>
                <div class ="col-md-4 col-sm-12">
                    <img id="mobileimg"src ={secphoto} alt=""/>
                </div>
                <div class ="col-md-5 col-sm-12">
                    <h2 style ={{fontWeight:"400"}}><b>Take the next step</b> toward<br/> your personal and professional<br/> goals with Mycourse.</h2>
                    <p style={{fontSize:"20px"}}>Join now to receive personalized recommendations from the full Mycourse catalog.</p>
                    <a href={"/courses"} ><button id ="joinbtn">Join for Free</button> </a>
                </div>
            </div> 
        </div>
    )
}

export default Promosec2
