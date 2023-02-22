import React from 'react'
import google from "../../images/google.png";
import ibm from "../../images/ibm.png";
import danone from "../../images/danone.png";
import duke from "../../images/duke.png";
import meta from "../../images/meta.png";
import Salesforce from "../../images/Salesforce.com_logo.png";

const Towards = () => {
    return (
        <div className='row towards-section'>
            <div className="col-md-12">
                <center> <h2 className='card-title'>Take the first step toward your new career</h2> <br />
                    <p>Get professional-level training and earn a credential recognized by leading companies.</p>
                </center>
            </div>
            <div className="flex-box">
                <img src={google} alt="" />
                <img src={meta} alt="" />
                <img src={ibm} alt="" />
                <img src={danone} alt="" />
                <img src={duke} alt="" />
                <img src={Salesforce} alt="" />
            </div>

            <div className="row-towards-section">
                <div className="container">
                    <div className="row">
                        <div className="col-md-3 mr4">
                        <i className="icofont-bullseye"></i> <br />
                            <b>Prior experience optional</b> <br />
                            <p>Build job-ready skills, even if you’re new to the field</p>
                            <hr />
                            <big>2,284,150</big> <br />
                            <p>job openings across entry-level Professional Certificate fields¹</p>
                        </div>
                        <div className="col-md-3 mr4">
                        <i className="icofont-license"></i> <br />
                            <b>Earn a valuable credential</b> <br />
                            <p>Apply your new skills to real-world projects using the latest industry tools and techniques.</p>
                            <hr />
                            <big>4.7/5</big> <br />
                            <p>average rating given by 200,000+ global learners enrolled in an entry-level Professional Certificate²</p>
                        </div>
                        <div className="col-md-3 mr4">
                        <i className="icofont-clock-time"></i> <br />
                            <b>Learn at your own pace</b> <br />
                            <p>Complete the training in less than 6 months while working a full-time job.</p>
                            <hr />
                            <big>Under 10 hours</big> <br />
                            <p>of flexible study per week³</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Towards