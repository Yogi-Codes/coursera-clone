import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { getParaByPosition } from '../../constants'
import { CONST } from '../../constants'
import Cookies from 'universal-cookie'
import axios from 'axios'
const CourseViewHeader = ({ title, category, thumbnail, price }) => {

    const [authId, setAuthId] = useState()
    const [isChecked, setIsChecked] = useState(false)
    const [loginModal, setLoginModal] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [courseId, setCourseId] = useState(getParaByPosition(3))
    const [enroll, setEnroll] = useState(false)
    const [month, setMonth] = useState(3)
    const getAuth = () => {
        const cookies = new Cookies();
        const uid = cookies.get('token');
        setAuthId(uid)
    }
    if (!isChecked) {
        getAuth();
        setIsChecked(true)
    }
    const loginNow = async (e) => {
        const formData = new FormData();
        formData.append('loginAction', 'true');
        formData.append('email', email);
        formData.append('password', password);
        const rsp = await axios.post(CONST.API_SERVER + '/login', formData, {
            'Content-Type': 'text/plain',
            onUploadProgress: progressEvent => {
                const perc = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            }
        });

        try {
            if (rsp.data.result.length > 0) {
                // // got id 
                const uid = rsp.data.result[0]['id'];
                const cookies = new Cookies();
                cookies.set('token', uid, { path: '/' });
                window.location.reload();
            } else {
                document.getElementsByClassName("message")[0].innerHTML = `<center><p style='color:red'> Login failed! Please check info </p></center>`;
                setTimeout(() => {
                    document.getElementsByClassName("message")[0].innerHTML = ``;
                }, 10000);
            }
        } catch (error) {
            document.getElementsByClassName("message")[0].innerHTML = `<center><p style='color:red'> Login failed! Please check info </p></center>`;
            setTimeout(() => {
                document.getElementsByClassName("message")[0].innerHTML = ``;
            }, 5000);
        }
    }

    const enrollCourse = async () => {
        const formData = new FormData();
        formData.append('action', 'true');
        formData.append('user_id', authId);
        formData.append('course_id', courseId);
        const rsp = await axios.post(CONST.API_SERVER + '/course/assign', formData, {
            'Content-Type': 'text/plain',
            onUploadProgress: progressEvent => {
                const perc = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            }
        });

        try {
            if (rsp.data.status === 'Success') {
                window.location = '/';
            } else {
                alert("We can not process right now!")
            }
        } catch (error) {
            alert("We can not process right now!")
        }
    }

    return (
        <div className='course-view-header padding-25'>
            <div className="row">
                <div className="col-md-12">
                    {/*<a> Browse </a> <i class="icofont-curved-right"></i>
                   <a> {category} </a> <i class="icofont-curved-right"></i> */}
                    <span> Browse </span> <i class="icofont-curved-right"></i>
                    <span> {category} </span> <i class="icofont-curved-right"></i>
                    <span> {title} </span>
                </div>
            </div>

            <div className="row">
                <div className="col-md-8"> <br /><br />
                    <img src={"/images/company-full-logo.png"} alt="" className='company-logo-for-course-view' /> <br />
                    <h2> {title} </h2>
                    <p>This is your path to a career in data analytics. In this program, you’ll learn in-demand skills that will have you job-ready in less than 6 months. No degree or experience required. </p>
                    <p>Instructor <a href={'/provider/'}> Google Career Certificates </a> </p>
                    <br />
                    {isChecked && authId > 0 ?
                        <button className="btn btn-primary" onClick={() => setEnroll(true)} > Enroll for Free <br /> <small> Starts Dec4 </small> </button> :
                        <button className="btn btn-primary" onClick={() => { setLoginModal(true) }} > Enroll for Free <br /> <small> Starts Dec4 </small> </button>}

                    &nbsp; &nbsp;
                    <a> <b>Financial aid available</b>  </a>
                </div>
                <div className="col-md-4"> <br />
                    <img src={CONST.ADMIN_SERVER + "/uploads/" + thumbnail} alt="" className='rd-10 custom-height-width-course-thumb-box' />
                </div>
                {/* <div className="col-md-12 row my-custom-box-for-course">
                    <div className="col-md-2">
                        <h5 className='bold'> 4.8/5 </h5>
                        92,953 ratings  <br />
                        1500 already enrolled
                    </div>
                    <div className="col-md-2">
                        <h5 className='bold'> 6 Months </h5>
                        Under 10 hours of study a week
                    </div>
                    <div className="col-md-2">
                        <h5 className='bold'>English </h5>
                        Subtitles: English
                    </div>
                    <div className="col-md-2">
                        <h5 className='bold'>Beginner Level </h5>
                        No prior experience required.
                    </div>
                    <div className="col-md-2">
                        <h5 className='bold'>100% Self-Paced </h5>
                        Learn on your own time
                    </div>

                </div> */}
            </div>

            {loginModal ? <div className='login-modal'>
                <div className="login-modal-body">
                    <i className="icofont-close login-form-close" onClick={() => { setLoginModal(false) }} ></i>
                    <h3>Welcome back</h3>
                    <br />
                    <p className="message text-danger"></p>
                    <p>Email</p>
                    <input type="email" name="" id="" onChange={(e) => setEmail(e.target.value)} />
                    <p>Password</p>
                    <input type="password" name="" id="" onChange={(e) => setPassword(e.target.value)} />
                    <a href={"/forget-password"}>Forgot password?</a>
                    <button className="btn btn-primary w-100" type='submit' onClick={() => { loginNow() }} > Login </button>

                    <br /> <br /><br />
                    <center>
                        <small> Having trouble logging in? <a href={"/help"}> Learner help center </a>  </small> <br />
                        <small>This site is protected by reCAPTCHA Enterprise and  <br />
                            the Google <a href={"/privacy-policy"}> Privacy Policy </a> and <a href={"/terms-and-conditions"} > Terms of Service </a> apply.
                        </small>
                    </center>
                </div>
            </div> : null}


            {enroll ? <div className="enroll-container-course-page">
                <div className="select-window">
                    <div className="body">
                        <div className="header">
                            <i className="icofont-close float-right" onClick={() => { setEnroll(false) }} ></i>
                            <h3>Enroll in this 13-course Professional Certificate </h3>
                        </div>
                        <div className="content">
                            <p>Introduction to Android Mobile Application Development is a 13-course Professional Certificate.</p>
                            <p className="bold">This Professional Certificate includes: </p>
                            <div className="row">
                                <div className="col-md-12 row">
                                    <div className="col-md-6"> <i className="icofont-check"></i> Unlimited access to all 13 courses </div>
                                    <div className="col-md-6"> <i className="icofont-check"></i> EMI payment options </div>
                                    <div className="col-md-6"> <i className="icofont-check"></i> Shareable certificate of completion from Meta </div>
                                    <div className="col-md-6"> <i className="icofont-check"></i>14 day refund period </div>
                                </div>
                                <div className="col-md-12 finishing row">
                                    <div className="col-md-12"><h4 className='bold'>How much time do you need to finish?</h4> </div>
                                    <div className="row col-md-12 select-choise">
                                        <div className="col-md-4" onClick={() => { setMonth(1) }}> <div className={month === 1 ? "selectBox-active" : "selectBox"}> <big>1</big> month </div></div>
                                        <div className="col-md-4" onClick={() => { setMonth(3) }}> <div className={month === 3 ? "selectBox-active" : "selectBox"}> <big>3</big> months </div></div>
                                        <div className="col-md-4" onClick={() => { setMonth(6) }}> <div className={month === 6 ? "selectBox-active" : "selectBox"}> <big>6</big> months </div></div>
                                    </div>

                                    <div className="col-md-12">
                                        <div className="estimated row col-md-12">
                                            <div className="col-md-9">
                                                <p>ESTIMATED STUDY TIME </p>
                                                <span className="big-bold">20+</span> <big>hours/week</big>
                                            </div>

                                            <div className="col-md-3">
                                                <b>₹ {price / month} </b>/month <br />
                                                Total ₹{price}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="footer">
                        <button className="btn btn-primary bold w-25" onClick={() => { enrollCourse() }} > Continue </button>
                    </div>
                </div>
            </div> : null}
        </div >
    )
}

export default CourseViewHeader