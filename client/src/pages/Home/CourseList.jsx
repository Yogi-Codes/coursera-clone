import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie'
import axios from 'axios'
import { CONST } from '../../constants'

const CourseList = async ({ courseid: courseId }) => {

    const [course, setCourse] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isLoaded, setIsLoaded] = useState(false)

    const getMyCourses = async () => {
        const formData = new FormData();
        formData.append('action', 'true');
        formData.append('course_id', courseId);
        const rsp = await axios.post(CONST.API_SERVER + '/course/my-courses-cid', formData, {
            'Content-Type': 'text/plain',
        });
        console.log("Course Data :: " + rsp.data.result);
        setIsLoaded(true)
        try {
            if (rsp.data.status === 'Success') {
                setCourse(rsp.data.result)

            } else {
                console.log("We can not process right now! from course list")
            }
        } catch (error) {
            console.log("We can not process right now! from course list")
        }
    }




    return (
        <>  
            <h1> { courseId } </h1>
        </>
    )
}

export default CourseList