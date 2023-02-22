import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import './leftSide.scss'
import { getPara, getParaByPosition } from '../../constants'
import Cookies from 'universal-cookie'
import axios from 'axios'
import { CONST } from '../../constants';

const LeftSideMenu = ({ courseid: courseId }) => {
    const [cMat, setCMat] = useState(-1);

    console.log("Course id :: " + courseId)

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

    const getAuth = () => {
        const cookies = new Cookies();
        const uid = cookies.get('token');
        setSideAuthId(uid)
    }
    if (!isSideChecked) {
        getAuth();
        setIsSideChecked(true)
    }


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
        formData.append('course_id', courseId);
        const rsp = await axios.post(CONST.API_SERVER + '/course/my-courses-cid/chapters', formData, {
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
        <> {isSideLoaded ?
            course.length > 0 ?
                <div className="left-sidebar-my-course col-md-3">
                    <div className="thumb">
                        <img src={ CONST.ADMIN_SERVER+ "/images/logo.png"} alt="" />
                    </div>
                    <p className="partner-name fs-19 bold">  {course[0].title} </p>
                    <p className="partner-name fs-19">  {CONST.APPNAME} </p>

                    <div className="course-material">
                        <h3 className="course-material-title" onClick={() => toggleCourseMaterial()}>

                            <i className={cMat === 1 ? "icofont-curved-down" : "icofont-curved-right"} >  </i>  Course Material</h3>
                        <ul className={cMat === 1 ? 'course-material-content course-material-content-active' : 'course-material-content'}>
                            {sideChapters.length > 0 ? sideChapters.map((chapter, i) => <li> <a href={"/my-course/" + courseId + "/" + getPara(courseId) + "/chapter/" + chapter.title}> <i className="fa-solid fa-circle-dot"></i> {chapter.title}  </a> </li>) : null}
                        </ul>
                    </div>

                    <h3 className="bold"> Grades </h3>
                    <h3 className="bold"> Notes </h3>
                    <h3 className="bold"> Discussion Forums </h3>
                    <h3 className="bold"> Messages  </h3>
                    <h3 className="bold"> Course Info  </h3>
                </div>
                : null : null}
        </>
    )
}

export default LeftSideMenu