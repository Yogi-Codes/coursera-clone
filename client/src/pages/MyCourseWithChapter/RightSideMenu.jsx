import React from 'react'
import { Link } from 'react-router-dom'

const RightSideMenu = () => {
  return (
    <div className='col-md-3 right-side-menu-my-course'>
      <p className="bold">Schedule</p>
      <div className="schedule-div-content">
        Start date: October 21, 2022 IST <br />
        <p>Estimated end date: <b> November 23, 2022 IST </b></p>
      </div>
      <hr />
      <p className="bold">Upcoming</p>
      <div className="upcoming-info-div">
        <p className="fs-16"><a> React Components </a> </p>
        <p className="bold">Due Oct 30, 11:59 PM IST Graded</p>
        <p>Peer-graded Assignment</p>
      </div>
      <div className="upcoming-info-div">
        <p className="fs-16"><a> React Components </a> </p>
        <p className="bold">Due Oct 30, 11:59 PM IST Graded</p>
        <p>Peer-graded Assignment</p>
      </div>
      <hr />
      <div className="set-week-goal">
        <p className="bold">Let's set a weekly goal</p>
        <div className="flex-box">
          <div className="left-content">
            Learners who set a goal are 75% more likely to complete the course. We’ll help you track your progress.
          </div>
          <div className="right-content">
            <i className="icofont-hand-drag1"></i>
          </div>
        </div>
        <a  className='btn btn-outline-primary'> Set goal </a>
      </div>
    </div>
  )
}

export default RightSideMenu