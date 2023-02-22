import React from 'react'
import Footer from '../../components/Footer'
import Nav from '../../components/NavBar'
import "./style.scss"
import Cookies from 'universal-cookie'
import { Helmet } from 'react-helmet'
import { CONST } from '../../constants'

const EditProfile = () => {
    const cookies = new Cookies();
    const uname = cookies.get('_tname');

    return (
        <>
            <Nav />
            <Helmet>
                <title> Edit Profile - {CONST.APPNAME} </title>
            </Helmet>
            <div className="row">
                <div className="container padding-50">
                    <div className="row col-md-12">

                        <div className="col-md-2"></div>
                        <div className="col-md-8 row" style={{ background: '#eee', borderRadius: "5px" }}>

                            <div className="col-md-12 row" style={{ padding: "25px" }}>
                                <div className="col-md-9"><h3>Edit profile</h3></div>
                                <div className="col-md-3"> <a className='btn btn-primary float-right text-light' href="/profile">View Profile</a> </div>
                                <div className="col-md-12"><hr /></div>
                            </div>

                            <div className="col-md-12 row padding-25" >
                                <div className="col-md-12" style={{ paddingBottom: "15px" }}><h3>Personal Info.</h3> </div>
                                <div className="col-md-3">
                                    <p>Full Name</p>
                                </div>
                                <div className="col-md-9">
                                    <input type="text" className='form-control' placeholder='Full Name' />
                                </div>
                            </div>
                            <div className="col-md-12 row">
                                <div className="col-md-3">
                                    <p>Profile Photo</p>
                                </div>
                                <div className="col-md-9 row">
                                    <div className="col-md-4">
                                        <img src="" alt="profie photo" id='myIMG' onClick={() => { document.getElementById("myFile").click() }} className="profile-photo-img-small" />
                                        <input type="file" id='myFile' style={{ display: 'none' }} accept="image/*" onChange={(e) => { document.getElementById("myIMG").src = URL.createObjectURL(e.target.files[0]) }} />
                                    </div>
                                    <div className="col-md-8">
                                        <button className="btn btn-primary"> Update Photo </button> <br />
                                        <small>Maximum size of 1MB. JPG, GIF, or PNG.</small>
                                    </div>
                                </div>
                                <hr />
                                <div className="col-md-12 row">
                                    <div className="col-md-12"><h3>Work Experience and Education</h3>
                                        <p>Tell us about your experience and education to get a personalized learning experience with course recommendations.</p>
                                    </div>

                                    <div className="col-md-12 row">
                                        <div className="col-md-3">Employment Status</div>
                                        <div className="col-md-9">
                                            <select class="form-control" name="employment_status">
                                                <option value="-1">Select your current status</option>
                                                <option value="1">Employed full time (35 or more hours per week)</option>
                                                <option value="2">Employed part time (less than 35 hours per week)</option>
                                                <option value="3">Self-employed full time (35 or more hours per week)</option>
                                                <option value="4">Self-employed part time (less than 35 hours per week)</option>
                                                <option value="5">Homemaker, taking care of a family member, or on maternity/paternity leave</option>
                                                <option value="6">Unemployed and looking for work</option><option value="7">Unemployed and not looking for work</option>
                                                <option value="8">Retired</option><option value="9">Unable to work</option></select>
                                        </div>
                                    </div>
                                    <div className="col-md-12 row">
                                        <div className="col-md-3">Industry</div>
                                        <div className="col-md-9">
                                            <input type="text" name="" id="" className='form-control' />
                                        </div>
                                    </div>
                                    <div className="col-md-12 row">
                                        <div className="col-md-3">Employer</div>
                                        <div className="col-md-9">
                                            <input type="text" name="" id="" className='form-control' />
                                        </div>
                                    </div>
                                    <div className="col-md-12 row">
                                        <div className="col-md-3">Occupation</div>
                                        <div className="col-md-9">
                                            <input type="text" name="" id="" className='form-control' />
                                        </div>
                                    </div>
                                    <div className="col-md-12 row">
                                        <div className="col-md-3">Experience Level</div>
                                        <div className="col-md-9">
                                            <input type="text" name="" id="" className='form-control' />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row padding-25">
                                <div className="col-md-12">
                                    <small>Note: Discussion forum posts and peer review submissions will always show your name and profile image to other learners in your courses. Course ratings and reviews you submit may show your profile image to anyone viewing Coursera’s catalog. Read our Privacy Policy to learn more.</small>
                                    <br />
                                    <center><button type="submit" className='btn btn-primary'> Save Changes </button></center>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <Footer />
        </>
    )
}

export default EditProfile