import React from 'react'
import { Link } from 'react-router-dom'
import { enquiryFormDataCourses, enquiryFormDataCategory } from './data';

const SelectProgram = () => {
    const sample = 0;
    return (
        <>
            <div className="row mr-top-20 find-online-degree">
                <div className="col-md-12 mr-top-20 mt-10">
                    <center> <br /><br /> <h2>Find the right online degree program for you</h2></center>
                </div>
                <div className="col-md-12 row align-content-center">


                    <div className="col-md-3 card">
                        <h3 className='card-title'>Bachelor's Degrees</h3>
                        <span className="body-text">
                            Study in-demand fields and learn job-ready skills with an online bachelor’s degree from an accredited university designed with flexibility in mind.
                        </span>
                        <br />
                       <a> View all Bachelor's degree programs </a>
                    </div>

                    <div className="col-md-3 card">
                        <h3 className='card-title'>Master's Degrees</h3>
                        <span className="body-text">
                            Build your expertise to advance or switch your career. Earn an online master’s degree from an accredited university specifically designed for working professionals.
                        </span>
                        <br />
                       <a> View all Master's degree programs </a>
                    </div>

                    <div className="col-md-3 card">
                        <h3 className='card-title'>Bachelor's Degrees</h3>
                        <span className="body-text">
                            Already have your bachelor’s degree? Expand your knowledge and gain practical skills to achieve your career goals with an accelerated postgraduate certificate or diploma from an accredited university.
                        </span>
                        <br />
                       <a> View all postgraduate programs </a>
                    </div>

                </div> {/* Row Closing    */}

                {/* Universities  */}

                <div className="row col-md-12 padding-50 degree-universities">
                    <div className="col-md-12"> <br /> <h3>Degrees from leading universities</h3> </div>

                    <div className="col-md-6 row">
                        <div className="col-md-10">
                            <h4 className='fs-19'>Master of Applied Data Science</h4>
                            <p className='fs-14'>
                                #1 Public Research University in the U.S. (QS World Rankings, 2022)
                            </p>
                            <b>
                                <a href={""}> Go to degree </a>
                            </b>
                        </div>
                        <div className="col-md-2">
                            <img src="/images/Google-G_360x360.png" alt="Google" className='s50-50 sh3-5 padding-10 rd-5' />
                        </div>
                    </div>
                    <div className="col-md-6 row">
                        <div className="col-md-10">
                            <h4 className='fs-19'>Master of Applied Data Science</h4>
                            <p className='fs-14'>
                                #1 Public Research University in the U.S. (QS World Rankings, 2022)
                            </p>
                            <b>
                                <a href={""}> Go to degree </a>
                            </b>
                        </div>
                        <div className="col-md-2">
                            <img src="/images/Google-G_360x360.png" alt="Google" className='s50-50 sh3-5 padding-10 rd-5' />
                        </div>
                    </div>
                    <div className="col-md-6 row">
                        <div className="col-md-10">
                            <h4 className='fs-19'>Master of Applied Data Science</h4>
                            <p className='fs-14'>
                                #1 Public Research University in the U.S. (QS World Rankings, 2022)
                            </p>
                            <b>
                                <a href={""}> Go to degree </a>
                            </b>
                        </div>
                        <div className="col-md-2">
                            <img src="/images/Google-G_360x360.png" alt="Google" className='s50-50 sh3-5 padding-10 rd-5' />
                        </div>
                    </div>
                    <div className="col-md-6 row">
                        <div className="col-md-10">
                            <h4 className='fs-19'>Master of Applied Data Science</h4>
                            <p className='fs-14'>
                                #1 Public Research University in the U.S. (QS World Rankings, 2022)
                            </p>
                            <b>
                                <a href={""}> Go to degree </a>
                            </b>
                        </div>
                        <div className="col-md-2">
                            <img src="/images/Google-G_360x360.png" alt="Google" className='s50-50 sh3-5 padding-10 rd-5' />
                        </div>
                    </div>
                    <div className="col-md-6 row">
                        <div className="col-md-10">
                            <h4 className='fs-19'>Master of Applied Data Science</h4>
                            <p className='fs-14'>
                                #1 Public Research University in the U.S. (QS World Rankings, 2022)
                            </p>
                            <b>
                                <a href={""}> Go to degree </a>
                            </b>
                        </div>
                        <div className="col-md-2">
                            <img src="/images/Google-G_360x360.png" alt="Google" className='s50-50 sh3-5 padding-10 rd-5' />
                        </div>
                    </div>
                    <div className="col-md-6 row">
                        <div className="col-md-10">
                            <h4 className='fs-19'>Master of Applied Data Science</h4>
                            <p className='fs-14'>
                                #1 Public Research University in the U.S. (QS World Rankings, 2022)
                            </p>
                            <b>
                                <a href={""}> Go to degree </a>
                            </b>
                        </div>
                        <div className="col-md-2">
                            <img src="/images/Google-G_360x360.png" alt="Google" className='s50-50 sh3-5 padding-10 rd-5' />
                        </div>
                    </div>


                </div>
                {/* select university */}

                <div className="col-md-12 explore-by-category">
                    <div className="row col-md-12">
                        <div className="col-md-12">
                            <center> <h3>Explore more degrees by category</h3> </center>
                        </div>

                        {enquiryFormDataCategory.map((e, i) =>
                            <>
                                <div className="col-md-6">
                                    <div className="category-card" style={{ background: "url(" + e.background + ")" }} >
                                        <a href={"/degree/category/" + e.title}>   {e.title} </a>
                                    </div>
                                    <p> {e.courses} degree programs available </p>
                                </div>
                            </>
                        )}

                    </div>
                </div>

            </div>
        </>
    )
}

export default SelectProgram