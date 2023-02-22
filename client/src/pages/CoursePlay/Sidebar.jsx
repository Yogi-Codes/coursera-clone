import React, { useState } from 'react'
import { CONST, getPara } from '../../constants'
import Cookies from 'universal-cookie';
import axios from 'axios';
import { Link } from 'react-router-dom';
const Sidebar = ({ courseid: courseId, contentId: contentId, chapter: chapter }) => {

    const [cMat, setCMat] = useState(1);

    const toggleCourseMaterial = () => {
        setCMat(1);
        if (cMat === 1) {
            setCMat(-1);
        } else {

        }
    }

    const [sideAuthId, setSideAuthId] = useState()
    const [sideCourses, setSideCourses] = useState([])
    const [isSideChecked, setIsSideChecked] = useState(false)
    const [isSideLoaded, setIsSideLoaded] = useState(false)
    const [isSideChapterLoaded, setIsSideChapterLoaded] = useState(false)
    const [sideChapters, setSideChapters] = useState([])
    const [course, setCourse] = useState([])
    const [isSideLoading, setIsSideLoading] = useState(true)


    const getSideMyCourses = async () => {
        const formData = new FormData();
        formData.append('action', 'true');
        formData.append('course_id', courseId);
        const rsp = await axios.post(CONST.API_SERVER + '/course/my-courses-cid', formData, {
            'Content-Type': 'text/plain',
        });
        setIsSideLoaded(true)
        try {
            if (rsp.data.status === 'Success') {
                setCourse(rsp.data.result)

            } else {

            }
        } catch (error) {

        }
    }

    const getSideChapters = async () => {
        const formData = new FormData();
        formData.append('action', 'true');
        formData.append('course_id', getPara('play'));
        formData.append('chapter', decodeURI(getPara('chapter')));
        const rsp = await axios.post(CONST.API_SERVER + '/course/my-courses-content', formData, {
            'Content-Type': 'text/plain',
        });

        setIsSideLoaded(true)
        try {
            if (rsp.data.status === 'Success') {
                setSideChapters(rsp.data.result)
            } else {

            }
        } catch (error) {

        }
    }


    if (!isSideLoaded) {
        getSideMyCourses();
        setIsSideLoaded(true);
    }
    if (!isSideChapterLoaded) {
        getSideChapters();
        setIsSideChapterLoaded(true);
    }


    return (
        <>

            {isSideLoaded && course.length > 0 ?
                <div className="left-sidebar-my-course col-md-3">
                    <p className="partner-name fs-16 bold">  {course[0].title} </p>

                    <div className="course-material">
                        <h3 className="course-material-title" onClick={() => toggleCourseMaterial()}>

                            <i className={cMat === 1 ? "icofont-curved-down" : "icofont-curved-right"} >  </i>  Course Material</h3>
                        <ul className={cMat === 1 ? 'course-material-content course-material-content-active' : 'course-material-content'}>
                            {sideChapters.length > 0 ? sideChapters.map((chapter, i) => <li> <a href={"/my-course/play/" + courseId + "/cnt/" + chapter.id + "/material/" + chapter.title + "/chapter/" + chapter.chapter}> <i className="fa-solid fa-circle-dot"></i> {chapter.title}  </a> </li>) : null}
                        </ul>

                        <br />
                        <a href={'/my-course/' + courseId + "/download/certificate/"}> <h3 className="bold"> Download Certificate  </h3> </a>
                    </div>
                </div>
                : null}
        </>
    )
}

export default Sidebar