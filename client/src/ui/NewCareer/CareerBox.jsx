import React from 'react'
import { Link } from 'react-router-dom'
import { CareerList } from '../../data/CareerList'

const CareerBox = () => {
    return (
        <div className='row career-box' id='explore-career'>
            <div className="col-md-12">
                <center>
                    <h2 className="card-title">Find a career that works for you</h2>
                    <p>Whatever your background or interests are, Professional Certificates have you covered.</p>
                    <br />
                    <b>Filter by job category</b>
                </center>

                <div className="flex-box">
                    <button> All Careers(21) </button>
                    <button> Software Engineering & IT (10) </button>
                    <button> Sales & Marketing(6) </button>
                    <button> Date Science & Analytics(3) </button>
                    <button> Business(3) </button>
                </div>
                {CareerList.length > 0 ?
                    <div className="courses-3-divs row">

                        {CareerList.map((post, index) => (
                            <div className="course-card col-md-3">
                                <div className="thumb">
                                    <img src={post.thumbnail} alt="" />
                                </div>
                                <div className="desc">
                                    <a  className='course-link' > {post.title} </a> <br />
                                    <p> {post.short} </p>
                                    <b>Great if you like:</b> <br />

                                    {post.tags.map((tag, ind) => (
                                        <span className="tags"> {tag.tag} </span>
                                    ))}


                                    <hr />
                                    <strong>$ {post.salary}</strong> median salary¹ <br />
                                    <strong> {post.jobs}  </strong>jobs available¹ <hr />
                                    <b>Credentials from leading partners</b>
                                    <br />
                                    <div className="flex-in-post-card row">
                                        <div className="col-md-2"> <img src={post.partner_photo} alt="" className='partner-photo-in-post-card' />  </div>
                                        <div className="col-md-10">
                                            <a > {post.partner_name} <i className="icofont-long-arrow-right"></i> </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}


                    </div>
                    : null}

                    <center> <br />
                        {/* <a  className='view-all-btn explor-btn'>  View all(9 more) </a> <br />  */}
                        <p className='career-page-p-tag-text'>
                        Salary data (median with 0-2 years experience) and job opening data are sourced from US Burning Glass Labor Insight Report. <br />
                        Data for job roles relevant to featured programs (4/01/2021 - 3/31/22) <br />
                        Coursera Platform Data, all time <br />
                        Most designed to be completed in 6 months, with 10 hours or less of work per week
                        </p>
                    </center>
            </div>
        </div>
    )
}

export default CareerBox