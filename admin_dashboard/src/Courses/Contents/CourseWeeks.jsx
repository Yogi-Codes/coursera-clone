import React, { useState } from 'react'
import Footer from '../../widgets/Footer'
import Header from '../../widgets/Header'
import Sidebar from '../../widgets/Sidebar'
import axios from 'axios'
import { CONST, getPara } from '../../constant'
import { Link } from 'react-router-dom'
import "./style.scss"
import { Helmet } from 'react-helmet'
const CourseWeeks = () => {

    const [message, setMessage] = useState()
    const [showMessage, setShowMessage] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [courses, setCourses] = useState([])
    const [weeks, setWeeks] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)
    const [isWeekLoaded, setWeekIsLoaded] = useState(false)
    const [isFormOpen, setIsFormOpen] = useState(false)

    const [title, setTitle] = useState()
    const [duration, setDuration] = useState()

    async function getCourses() {
        setIsLoading(true)
        const formData = new FormData();
        formData.append('action', 'getCategory');
        formData.append('id', getPara('weeks'));
        const rsp = await axios.post(CONST.API_SERVER + '/admin/course/get-single', formData, {
            'Content-Type': 'text/plain',
        });
        // console.log("Got data " + rsp.data.result);
        setIsLoaded(true)
        try {
            if (rsp.data.message.length > 0 && rsp.data.message === "Success") {
                const ttl = rsp.data.result[0]['title'];
                // console.log("ttl" + ttl);
                setCourses(rsp.data.result)
                setIsLoading(false)
                document.getElementById("select_category").innerHTML = `
                
                `;
            } else {
                setIsLoading(false)
            }
        } catch (error) {
        }
    }

    async function getWeeks() {
        setIsLoading(true)
        const formData = new FormData();
        formData.append('action', 'getCategory');
        formData.append('id', getPara('weeks'));
        const rsp = await axios.post(CONST.API_SERVER + '/admin/course/weeks', formData, {
            'Content-Type': 'text/plain',
        });
        console.log("Got weeks " + rsp.data.result);
        setIsLoaded(true)
        try {
            if (rsp.data.message.length > 0 && rsp.data.message === "Success") {
                const ttl = rsp.data.result[0]['title'];
                // console.log("ttl" + ttl);
                setWeeks(rsp.data.result)
                setIsLoading(false)
            } else {
                setIsLoading(false)
            }
        } catch (error) {
        }
    }

    if (isLoaded === false) {
        setWeekIsLoaded(true)
        getCourses();
    }

    if (isWeekLoaded === false) {
        setIsLoaded(true)
        getWeeks();
    }


    const deleteChapter = async (id) => {
        setIsLoading(true)
        const formData = new FormData();
        formData.append('action', 'getCategory');
        formData.append('id', id);
        const rsp = await axios.post(CONST.API_SERVER + '/admin/weeks/delete', formData, {
            'Content-Type': 'text/plain',
        });
        // console.log("Got data " + rsp.data.result);
        setIsLoaded(true)
        try {
            if (rsp.data.message.length > 0 && rsp.data.message === "Success") {
                // setIsLoading(false)
                window.location.reload()
                // setIsLoaded(false)
            } else {
                setIsLoading(false)
            }
        } catch (error) {
        }
    }

    const addWeek = async () => {
        if (title != undefined && duration != undefined) {
            setIsLoading(true)
            const formData = new FormData();
            formData.append('action', 'getCategory');
            formData.append('id', getPara("weeks"));
            formData.append('title', title);
            formData.append('duration', duration);
            const rsp = await axios.post(CONST.API_SERVER + '/admin/weeks/add', formData, {
                'Content-Type': 'text/plain',
            });
            // console.log("Got data " + rsp.data.result);
            setIsLoaded(true)
            setWeekIsLoaded(true)
            try {
                if (rsp.data.message.length > 0 && rsp.data.message === "Success") {
                    window.location.reload()
                    // setIsLoading(false)
                    // setIsLoaded(false)
                    // setIsFormOpen(false)
                } else {
                    setIsLoading(false)
                }
            } catch (error) {
            }
        } else {
            setMessage("Please fill all fields")
            setShowMessage(true)
        }
    }

    if (showMessage) {
        setTimeout(() => {
            setShowMessage(false)
        }, 5000);
    }

    return (
        <>
            <Helmet>
                <title>Course duration/chapter </title>
            </Helmet>
            {isLoading ? <div className='LoaderClass'></div> :
                <>
                    <Header />
                    <div className="page-wrapper default-version">
                        <Sidebar act={3} />

                        <div class="body-wrapper">
                            <div class="bodywrapper__inner">
                                <div class="row align-items-center mb-30 justify-content-between">
                                    <div class="col-lg-6 col-sm-6">
                                        <h6 class="page-title"> Course Weeks ( <b>{courses[0].title}</b> ) </h6>
                                    </div>
                                    <div class="col-lg-6 col-sm-6">
                                        <button className='btn btn--warning float-right' onClick={() => { window.location.href = '/courses/content-add/' + getPara('weeks') }} style={{ marginLeft: "30px" }} > Go Back  </button>
                                        <button className='btn btn--primary float-right' onClick={() => { isFormOpen ? setIsFormOpen(false) : setIsFormOpen(true) }} > Add Chapter  </button>
                                        &nbsp;
                                        &nbsp; &nbsp;
                                    </div>

                                </div>
                                {showMessage ?
                                    <div className="col-md-12 p-5">
                                        <div className="card p-3">  {message} </div>
                                    </div>
                                    : null}
                                {isFormOpen ?
                                    <div className="row col-lg-12 card p-2" style={{ marginLeft: "0", marginBottom: "20px" }}>
                                        <div className="col-lg-12 row">
                                            <div className="col-md-4"> <input type="text" onChange={(e) => { setTitle(e.target.value) }} name="" id="" className='form-control' placeholder='Title' /> </div>

                                            <div className="col-md-4"> <input type="text" onChange={(e) => { setDuration(e.target.value) }} name="" id="" className='form-control' placeholder='Expected Duration in days' /> </div>

                                            <div className="col-md-4">
                                                <button type="button" onClick={() => { addWeek() }} className='btn btn--primary'>Save</button> &nbsp;
                                                <button type="button" onClick={() => { setIsFormOpen(false) }} className='btn btn--secondary'>Cancel</button>
                                            </div>

                                        </div>
                                    </div> : null}


                                <div class="row">
                                    <div class="col-lg-12">
                                        <div class="card b-radius--10">
                                            <div class="card-body p-10">
                                                <div className="row">
                                                    <table className='table'>
                                                        <thead>
                                                            <tr>
                                                                <th> SL </th>
                                                                <th> Time Quantam  </th>
                                                                <th> Duration in Days </th>
                                                                <th> Action </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {weeks.map((course, i) =>
                                                                <tr>
                                                                    <td> {i + 1} </td>
                                                                    <td> {course.title} </td>
                                                                    <td> {course.duration} </td>
                                                                    <td>
                                                                        <a href={"/courses/content-add/" + course.id}> <button className='btn btn-primary'> Edit </button> </a> &nbsp;
                                                                        <button className='btn btn-danger' onClick={() => { deleteChapter(course.id) }}>Delete</button> </td>
                                                                </tr>
                                                            )}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <Footer /></>
            }
        </>
    )
}

export default CourseWeeks