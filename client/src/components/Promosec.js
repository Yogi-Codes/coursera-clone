import React from 'react'
import promo from '../images/promoStat.png';
import redcir from '../images/pinkish-half-circle.png';
import '../css/style.css';
import { Link } from 'react-router-dom';
function Promosec() {
    return (
        <div className="container-fluid Promosec">
            <div className="row">
                <div className="col-md-6 col-sm-12">
                    <div className="redcir"><img src={redcir} alt="" /></div>
                    <div className=""><img id="promoimg" src={promo} alt="" /></div>
                </div>
                <div className="col-md-5 col-sm-12">
                    <div className="con-box2">
                        <p id="heading">Learner outcomes on Mycourse</p>
                        <p id="subheading"><b>87% of people learning </b>for professional development <b>report career benefits</b> like getting a promotion, a raise, or starting a new career</p>
                        <p>-&nbsp;Mycourse Learner Outcomes Survey (2019)</p>
                        <a href={"/signup"}><button id="joinbtn" style={{ margin: "10px" }}>Join for Free</button> </a>
                        <a href={"/courses"}>
                        <button id="trybtn" style={{ margin: "10px" }}>Try Mycourse For Business</button>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Promosec
