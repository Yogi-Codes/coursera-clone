import React from 'react'
import { Link } from 'react-router-dom'
import heroLogo from "../../images/learner-header-image-4x.png"
import "./hero.scss"; 

const HeroBanner = () => {
  return (
    <div className='hero-banner'>
      <div className="row banner-section">
        <div className="col-md-7">
          <h3>Launch your new career with a Professional Certificate on Coursera</h3>
          <p>Professional certificates offer flexible, online training designed to get you job-ready for high-growth fields.</p> 

          <div className="flex-texts">
            <div className="flex-1">7 day free trial</div>
            <div className="flex-2">Starting at $39 per month</div>
            <div className="flex-3">Less than 6 months at your own pace</div>
          </div>

          <a className='explor-btn' href='#explore-career' > Explore Careers </a>
        </div>
        <div className="col-md-5">
          <img src={heroLogo} alt="" />
        </div>
      </div>
    </div>
  )
}

export default HeroBanner