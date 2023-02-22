import React from 'react'
import { Link } from 'react-router-dom'

const AuthHero = () => {
    return (
        <div className='auth-hero row'>
            <div className="container row">
                <div className="col-md-12"><h2>Welcome back!</h2></div>
                <div className="col-md-8 welcome-div-1 row">

                    <div className="row col-md-7">
                        <div className="col-md-12"><p className='fs-19'>Tell us about yourself</p></div>
                        <div className="col-md-3"><p className="label-text">I am currently a</p></div>
                        <div className="col-md-9"> <input type="text" name="" id="" placeholder='Software Developer/Engineer' /> </div>
                        <button>Save to profile</button>
                    </div>
                    <div className="row col-md-5 sidebar-of-hero-inner-text">
                        <p className="fs-16 bold">SET YOUR LEARNING GOALS</p> 
                        <a  className='bold fs-16'> <i className='icofont-laptop bold fs-19 icons'></i>  Change my career </a>
                        <a  className='bold fs-16'> <i className="icofont-chart-histogram bold fs-19 icons"></i>  Level up  my skills </a>
                    </div>
                </div>
                <div className="col-md-4 bg-white margin-l-10 hero-second-welcome-box">
                    <p className="fs-16 bold"> October activity </p>
                    <p className="fs-14">Here you will find insights and data if you have learned on Coursera within the last 2 months.</p>
                </div>
            </div>
        </div>
    )
}

export default AuthHero