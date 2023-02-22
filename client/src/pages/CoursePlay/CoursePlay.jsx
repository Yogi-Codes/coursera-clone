import React, { useState } from 'react'
import Sidebar from './Sidebar'
import Content from './Content'
import Nav from '../../components/NavBar'
import { CONST, getPara } from '../../constants'
import axios from 'axios'
import Cookies from 'universal-cookie'

const CoursePlay = (props) => {
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

    const getMyCourseWithChapters = async () => {
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
        const cookies = new Cookies();
        cookies.remove('perc');
        getMyCourseWithChapters();
        setIsLoaded(true);
    }

    return (
        <>
            <Nav />
            {/* {isLoaded ? courses.length > 0 ? */}
            <div className="row MyCourseWithChapterPage" style={{ marginLeft: "0" }} >
                {/* <LeftSideMenu courseid={courses[0].id} /> */}
                <Sidebar courseid={decodeURI(getPara('play'))} contentId={decodeURI(getPara('cnt'))} chapter={decodeURI(getPara('chapter'))} />
                <Content courseid={decodeURI(getPara('play'))} materialid={decodeURI(getPara('cnt'))} />

            </div>
            {/* : <div onClick={() => { window.history.back() }} className='d404-no-data-found'> <h3> No data found! </h3> </div> : null} */}
        </>
    )
}

export async function getServerSideProps(context) {
    return {
        props: { test: "Hello Dear!" }, // will be passed to the page component as props
    }
}

export default CoursePlay