
import '../css/style.css';



import React from 'react'

const Accessibilitypromo = () => {
    return (
        <div class="container section3">
            <div class="row">
                <div class="col-md-1"></div>
                <div class="col-md-5">
                    <br /><br />
                    <img id="mobileimg" src={"/images/offerings2.png"} alt="" />
                </div>
                <div class="col-md-5 col-sm-12">
                    <div class="section3-con-box" style={{ marginTop: "20%" }}>
                        <p style={{ color: "grey" }}><b>ACCESSIBLE</b></p>
                        <p style={{ fontSize: "25px" }}>Find flexible, affordable options</p>
                        <div style={{ backgroundColor: "#2a73cc", width: "20%", height: "2px" }}></div><br />
                        <p style={{ fontSize: "20px" }}>Nostrud reprehenderit voluptate aliquip veniam exercitation ut dolor proident.Est nostrud nulla laboris commodo qui eiusmod cupidatat aliqua minim incididunt adipisicing est.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Accessibilitypromo