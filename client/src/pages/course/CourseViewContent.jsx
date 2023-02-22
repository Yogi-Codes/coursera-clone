import React, { useState } from 'react'
import "./style.scss"
import { Link } from 'react-router-dom'

const CourseViewContent = ({ content: content }) => {
    const [menu, setMenu] = useState(0)

    if (content != undefined) {
        setTimeout(() => {
            document.getElementById("aboutContent").innerHTML = content;
        }, 1000);
    }

    return (
        <>
            <div className="row course-view-tab-manage">
                <div className="col-md-12">
                    <div className="tab">
                        <a href={"#about"} className={menu === 0 ? 'tab-menu active' : 'tab-menu'}> About </a>
                        <a href={"#instructors "} className={menu === 1 ? 'tab-menu' : 'tab-menu'}> Instructors </a>
                        {/* <a href={"#syllabus"} className={menu === 2 ? 'tab-menu active' : 'tab-menu'}> Syllabus </a> */}
                        {/* <a href={"#reviews"} className={menu === 3 ? 'tab-menu active' : 'tab-menu'}> Reviews </a> */}
                        {/* <a href={"#enrollments"} className={menu === 4 ? 'tab-menu active' : 'tab-menu'}> Enrollment Options </a> */}
                        <a href={"#faq"} className={menu === 5 ? 'tab-menu active' : 'tab-menu'}> FAQ </a>

                    </div>
                </div>

                <div className="container course-info-details-page">
                    <div className="row">
                        <div className="col-md-8">

                            <div className="row">
                                <div className="col-md-12" id='about'>
                                    <h3>About this Course </h3>
                                    <b>177,018 recent views</b>
                                    <br />
                                    <br />
                                    <div id="aboutContent"></div>
                                </div>

                                {/* <div className="col-md-12 what-you-will-learn-box row">
                                    <div className="col-md-12"><b>WHAT YOU WILL LEARN</b></div>
                                    <div className="col-md-6">
                                        <i className="icofont-check"></i> Define the Fundamental concepts of Android app development
                                    </div>
                                    <div className="col-md-6">
                                        <i className="icofont-check"></i> Set up and explore the Android Studio interface, configurations and built-in tools
                                    </div>
                                    <div className="col-md-6">
                                        <i className="icofont-check"></i> Use Kotlin Playground
                                    </div>
                                    <div className="col-md-6">
                                        <i className="icofont-check"></i> Create a simple Android app
                                    </div>
                                </div> */}

                                {/* <div className="col-md-12 skills-you-will-gain row">
                                    <div className="col-md-12"><b>SKILLS YOU WILL GAIN</b></div>
                                    <span className="tag"> Android Studio </span>
                                    <span className="tag"> Application development </span>
                                    <span className="tag"> Mobile Development </span>
                                    <span className="tag"> Android </span>
                                    <span className="tag"> App development </span>
                                    <span className="tag"> Mobile Development </span>
                                    <span className="tag"> Android Studio </span>
                                    <span className="tag"> Development </span>
                                    <span className="tag"> Mobile Development </span>
                                </div> */}

                                <div className="instractor row col-md-12" onMouseEnter={() => setMenu(1)} id={"instructors"}>
                                    <div className="col-md-3">
                                        <br />
                                        <h3>Instructor </h3>
                                    </div>
                                    <div className="col-md-9"></div>
                                    <div className="col-md-3"> <b>Instructor rating   </b>  </div>
                                    <div className="col-md-9"> <b> 4.89/5 (95 Ratings)  </b>  </div>

                                    <div className="row col-md-12">
                                        <div className="col-md-12"><br /> </div>
                                        <div className="col-md-3"> <img src="/images/company-logo.png" alt="" className='small-logo rd-10' /> </div>
                                        <div className="col-md-9">
                                            <a className='big-text'> Taught by Meta Staff </a> <br />
                                            177,904 Learners <br />
                                            49 Courses
                                        </div>
                                    </div>
                                </div>

                                <div className="instractor row col-md-12">
                                    <div className="col-md-3"> <br /><br />
                                        <h3>Offered by </h3>
                                    </div>
                                    <div className="col-md-9"></div>
                                    <div className="row col-md-12">
                                        <div className="col-md-3"> <img src="/images/company-logo.png" alt="" className='small-logo rd-10' /> </div>
                                        <div className="col-md-9">
                                            {/* <a className='big-text'> Meta </a> <br /> */}
                                            <p>
                                                IBC Media is a web 3.0 innovation company that aims to pave the way for innovation in web 3.0 in collaboration with the Government of India. Our history has been studded with some rewarding milestones such as IBC 2018, The Genesis Developer programme, partnerships with multiple state governments and the prime minister’s office, an association with the Policy Think Tank, such as Niti Aayog, of the Government of India, 60 engineering schools and top technology services companies like Tech Mahindra.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*  everything should do in this block  */}
                        </div>


                        <div className="col-md-4 sidebar">
                            <div className="row">
                                <div className="col-md-2"> <i className="icofont-book sidebar-icon"></i> </div>
                                <div className="col-md-10"> <h4 className="bold">Flexible deadlines</h4>
                                    <p>Reset deadlines in accordance to your schedule.</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-2"> <i className="icofont-certificate sidebar-icon"></i> </div>
                                <div className="col-md-10"> <h4 className="bold">Shareable Certificate</h4>
                                    <p>Earn a Certificate upon completion</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-2"> <i className="icofont-globe sidebar-icon"></i> </div>
                                <div className="col-md-10"> <h4 className="bold">100% online</h4>
                                    <p>Start instantly and learn at your own schedule.</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-2"> <i className="icofont-list sidebar-icon"></i> </div>
                                <div className="col-md-10"> <h4 className="bold">Course 1 of 13 in the</h4>
                                    <p>Meta Android Developer Professional Certificate</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-2"> <i className="icofont-bars sidebar-icon"></i> </div>
                                <div className="col-md-10"> <h4 className="bold">Beginner Level</h4>
                                    <p>You do not need prior development experience. You only need to have basic internet navigation skills and an eagerness to get started with coding.</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-2"> <i className="icofont-clock-time sidebar-icon"></i> </div>
                                <div className="col-md-10"> <h4 className="bold">Approx. 12 hours to complete</h4>
                                    <p> <br /> <br /> </p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-2"> <i className="icofont-ui-text-chat sidebar-icon"></i> </div>
                                <div className="col-md-10"> <h4 className="bold">English</h4>
                                    <p> <br /><br /> </p>
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-md-2"> <i className="icofont-check sidebar-icon"></i> </div>
                                <div className="col-md-10"> <h4 className="bold">Could your company benefit from training employees on in-demand skills?</h4>
                                    <p> </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CourseViewContent