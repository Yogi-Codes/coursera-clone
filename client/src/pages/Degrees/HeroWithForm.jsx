import React from 'react'
import { enquiryFormDataQualification, enquiryFormDataCourses } from './data'

import './form.scss'

const HeroWithForm = ({ title, category }) => {
    return (
        <>
            <div className="hero-form-banner row">
                <div className="col-md-8">
                    <h2> {title} </h2>
                </div>
                <div className="col-md-4">
                    <form action="" className='row col-md-12'>

                        <div className="col-md-12">
                            <p>I HAVE AN </p>
                            <select name="" id="">
                                <option value="" selected disabled >Select highest education</option>
                                {enquiryFormDataQualification.map((e, index) =>
                                    <option value={e.title} > {e.title} </option>
                                )}
                            </select>
                        </div>

                        <div className="col-md-12">
                            <p>I WANT A </p>
                            <select name="" id="">
                                <option value="" selected disabled >Select what degree you'd like to get</option>
                                <option value="Master's Degree">Master's Degree</option>
                                <option value="Bachelor's Degree">Bachelor's Degree</option>
                            </select>
                        </div>
                        <div className="col-md-12">
                            <p>IN </p>
                            <select name="" id="">
                                <option value="" selected disabled>Select what field you want it in</option>
                                {enquiryFormDataCourses.map((e, index) =>
                                    <option value={e.title} > {e.title} </option>
                                )}
                            </select>
                        </div>

                        <div className="col-md-12">
                            <br />
                            <button className='btn btn-secondary w-100'> See Progress </button>
                        </div>
                        <div className="col-md-12"><br />
                            <button className='btn btn-primary w-100'> Email me info </button>
                        </div>

                    </form>
                </div>
            </div>
        </>
    )
}

export default HeroWithForm