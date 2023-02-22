import React from 'react'
import { Link } from 'react-router-dom'

const MasterTrackBanner = ({ uri, title, description }) => {
  return (
    <>
      <div className="row padding-50 master-track-hero">
        <div className="col-md-8">
          <p className="bred-cump"> <a href={"/certificates"}> <b>Certificates</b> </a><i class="icofont-curved-right"></i>{uri} </p>
          <h2> {title} </h2>
          <big> {description} </big>
        </div>

        <div className="col-md-4">
          <div className="learn-more-box">
            <h5>Learn more</h5>
            Sign up to receive the latest information and updates.  <br /> <br />
            <button className='btn btn-primary w-100'>Email me more info</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default MasterTrackBanner