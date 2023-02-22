import React, { useState } from 'react'
import Nav from '../../components/NavBar'
import { getPara, getParaByPosition } from '../../constants'
import CourseBody from '../MyCourse/CourseBody'
import RightSideMenu from '../MyCourse/RightSideMenu'
import LeftSideMenu from '../MyCourse/LeftSideMenu'
import Cookies from 'universal-cookie'
import axios from 'axios'
import { CONST } from '../../constants'
import DownloadBody from './DownloadBody'
const DownloadCertificate = () => {
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
        const cookies = new Cookies();
        const uid = cookies.get('token');

        const formData = new FormData();
        formData.append('action', 'true');
        formData.append('user_id', uid);
        formData.append('course_id', getPara('my-course'));
        const rsp = await axios.post(CONST.API_SERVER + '/course/my-courses/single', formData, {
            'Content-Type': 'text/plain',
            onUploadProgress: progressEvent => {
                const perc = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            }
        });
        console.log(rsp.data.result)
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
                    <DownloadBody />
                    <RightSideMenu />
                </div>
                : <div onClick={() => { window.history.back() }} className='d404-no-data-found'> <h3> No data found! </h3> </div> : null}
        </>
    )
}


export default DownloadCertificate