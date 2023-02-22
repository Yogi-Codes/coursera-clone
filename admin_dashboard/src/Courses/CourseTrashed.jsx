import React, { useState } from 'react'
import Footer from '../widgets/Footer'
import Header from '../widgets/Header'
import Sidebar from '../widgets/Sidebar'
import { CONST } from '../constant'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
const CourseTrashed = () => {
    const [showMessage, setShowMessage] = useState(false)
    const [message, setMessage] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const [courses, setCourses] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)

    async function getCourses() {
        setIsLoading(true)
        const formData = new FormData();
        formData.append('action', 'getCategory');
        const rsp = await axios.post(CONST.API_SERVER + '/admin/course/trashed', formData, {
            'Content-Type': 'text/plain',
        });
        setIsLoaded(true)
        try {
            if (rsp.data.message.length > 0 && rsp.data.message === "Success") {
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

    if (isLoaded === false) {
        setIsLoaded(true)
        getCourses();
    }
    const recoverCourse = async (id) => {
        setIsLoading(true)
        const formData = new FormData();
        formData.append('action', 'getCategory');
        formData.append('id', id);
        const rsp = await axios.post(CONST.API_SERVER + '/admin/course/recover', formData, {
            'Content-Type': 'text/plain',
        });
        try {
            if (rsp.data.status.length > 0 && rsp.data.status === "Success") {
                setMessage("Course recovered! To publish course again please visit add content page")
                setShowMessage(true)
                setIsLoading(false)
                setIsLoaded(false)
                setTimeout(() => {
                    setShowMessage(false)
                }, 5000);
            } else {
                setIsLoading(false)
            }
        } catch (error) {
        }
    }

    const pDelete = async (id) => {
        setIsLoading(true)
        const formData = new FormData();
        formData.append('action', 'getCategory');
        formData.append('id', id);
        const rsp = await axios.post(CONST.API_SERVER + '/admin/course/p-delete', formData, {
            'Content-Type': 'text/plain',
        });
        try {
            if (rsp.data.status.length > 0 && rsp.data.status === "Success") {
                setMessage("Course deleted successfully!")
                setShowMessage(true)
                setIsLoading(false)
                setIsLoaded(false)
                setTimeout(() => {
                    setShowMessage(false)
                }, 5000);
            } else {
                setIsLoading(false)
            }
        } catch (error) {
        }
    }

    return (
        <>
        <Helmet>
            <title>Trashed courses</title>
        </Helmet>
        {isLoading ? <div className='LoaderClass'></div> : null}
            <Header />
            <div className="page-wrapper default-version">
                <Sidebar act={3} />

                <div class="body-wrapper">
                    <div class="bodywrapper__inner">
                        <div class="row align-items-center mb-30 justify-content-between">
                            <div class="col-lg-6 col-sm-6">
                                <h6 class="page-title"> Trashed Courses </h6>
                            </div>
                            <div class="col-lg-6 col-sm-6">
                                <a href={"/courses/new"} className='btn btn--primary float-right' > Add New Course </a>
                            </div>
                        </div>

                        {showMessage ?
                            <div className="col-md-12 p-5">
                                <div className="card p-3">
                                    <center><h4> {message} </h4></center>
                                </div>
                            </div>
                            : null}

                        <div class="row">
                            <div class="col-lg-12">
                                <div class="card b-radius--10">
                                    <div class="card-body p-10">
                                        <div className="row">
                                            <table className='table'>
                                                <thead>
                                                    <tr>
                                                        <th> SL </th>
                                                        <th> Course name </th>
                                                        <th> Price </th>
                                                        <th> Category </th>
                                                        <th> Author </th>
                                                        <th> Action </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {courses.map((course, i) =>
                                                        <tr>
                                                            <td> {i + 1} </td>
                                                            <td> {course.title} </td>
                                                            <td> {course.price} </td>
                                                            <td> {course.category} </td>
                                                            <td> {course.author} </td>
                                                            <td>
                                                                <button className='btn btn-primary' onClick={() => { recoverCourse(course.id) }} > Recover </button> &nbsp;
                                                                <button className='btn btn-danger' onClick={() => { pDelete(course.id) }} >Delete</button> </td>
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
            <Footer />
        </>
    )
}

export default CourseTrashed