import React, { useState } from 'react'
import Footer from '../../components/Footer'
import Nav from '../../components/NavBar'
import { useParams } from 'react-router-dom'
import { getPara, getParaByPosition } from '../../constants'
import LeftSideMenu from './LeftSideMenu'
import { RelatedCoursesList } from '../../data/RelatedCourses'
import CourseBody from './CourseBody'
import RightSideMenu from './RightSideMenu'
import Cookies from 'universal-cookie'
import axios from 'axios'
import { CONST } from '../../constants'

const MyCourse = () => {
    const courseId = getPara('my-course');
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

    const getMyCourses = async () => {
        const formData = new FormData();
        formData.append('action', 'true');
        formData.append('user_id', authId);
        formData.append('course_id', courseId);
        const rsp = await axios.post(CONST.API_SERVER + '/course/my-courses/single', formData, {
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

    return (
        <>
            <Nav />
            {isLoaded ? courses.length > 0 ?
                <div className="row MyCoursePage">
                    {/* <LeftSideMenu courseid={courses[0].id} /> */}
                    <CourseBody />
                    <RightSideMenu />
                </div>
                : <div onClick={() => { window.history.back() }} className='d404-no-data-found'> <h3> No data found! </h3> </div> : null}
        </>
    )
}


export default MyCourse