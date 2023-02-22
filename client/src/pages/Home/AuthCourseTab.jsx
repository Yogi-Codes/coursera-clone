import React, { useState } from 'react'

import { COURSES, TAB_DATA } from './tabData'
import Cookies from 'universal-cookie'
import axios from 'axios'
import { CONST } from '../../constants'
import CourseList from './CourseList';
import MyTest from './MyTest'
import { Helmet } from 'react-helmet'
const AuthCourseTab = () => {
  const [tabOp, setTabOp] = useState(0);
  const [authId, setAuthId] = useState()
  const [courses, setCourses] = useState([])
  const [isChecked, setIsChecked] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)


  const getAuth = () => {
    const cookies = new Cookies();
    const uid = cookies.get('token');
    setAuthId(uid)
  }
  if (!isChecked) {
    getAuth();
    setIsChecked(true)
  }
  const getData = async (type, ind) => {
    setTabOp(ind);


    const formData = new FormData();
    formData.append('action', 'true');
    formData.append('user_id', authId);
    formData.append('type', type);
    const rsp = await axios.post(CONST.API_SERVER + '/course/my-courses/type', formData, {
      'Content-Type': 'text/plain',
      onUploadProgress: progressEvent => {
        const perc = Math.round((progressEvent.loaded * 100) / progressEvent.total);
      }
    });

    try {
      if (rsp.data.status === 'Success') {
        setCourses(rsp.data.result)
        setIsLoaded(true)
      } else {
        // console.log("We can not process right now!")
      }
    } catch (error) {
      // console.log("We can not process right now!")
    }


  }

  const getMyCourses = async () => {
    const formData = new FormData();
    formData.append('action', 'true');
    formData.append('user_id', authId);
    const rsp = await axios.post(CONST.API_SERVER + '/course/my-courses', formData, {
      'Content-Type': 'text/plain',
      onUploadProgress: progressEvent => {
        const perc = Math.round((progressEvent.loaded * 100) / progressEvent.total);
      }
    });

    try {
      if (rsp.data.status === 'Success') {
        setCourses(rsp.data.result)
        setIsLoaded(true)
      } else {
        // console.log("We can not process right now!")
      }
    } catch (error) {
      // console.log("We can not process right now!")
    }
  }

  if (!isLoaded && authId > 0) {
    getMyCourses();
    setIsLoaded(true);
  }

  const addMoreBox = (id) => {
    // document.getElementsByClassName(""+id)[0].innerHTML = `<div className='more-box-options'></div>`;
  }

  return (
    <>
      <Helmet>
        <title> Home - {CONST.APPNAME} </title>
      </Helmet>

      <div className='row tab-section col-md-12'>
        <div className="container">

          <div className="main-tabs">
            <ul className='tabs'>
              {TAB_DATA.map((cat, index) => (
                <li onClick={() => getData(cat.parameter, index)} className={tabOp === index ? 'active' : ''} > {cat.title} </li>
              ))}
            </ul>
          </div>


        </div>
        <div className="tab-contents padding-50 col-md-12 m-0">
          <div className="courses-list">
            {isLoaded && courses.length < 1 ? "" : <ul>
              {courses.map((course, indexx) => (
                <MyTest courseid={course.course_id} progress={course.progress} />
                // <CourseList courseid={course.course_id} /> 
                // <h1>Hey</h1>
              ))}
            </ul>}
          </div>
        </div>
      </div>
    </>
  )
}

export default AuthCourseTab