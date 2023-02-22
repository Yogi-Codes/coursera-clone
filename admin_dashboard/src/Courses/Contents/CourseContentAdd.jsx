import React, { useState } from 'react'
import Footer from '../../widgets/Footer'
import Header from '../../widgets/Header'
import Sidebar from '../../widgets/Sidebar'
import axios from 'axios'
import Cookies from 'universal-cookie';
import { CONST, getPara } from '../../constant'
import { Link } from 'react-router-dom'
import "./style.scss"
import { Helmet } from 'react-helmet'

const CourseContentAdd = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [courses, setCourses] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)
    const [message, setMessage] = useState()
    const [showMessage, setShowMessage] = useState(false)

    async function getCourses() {
        setIsLoading(true)
        const formData = new FormData();
        formData.append('action', 'getCategory');
        const rsp = await axios.post(CONST.API_SERVER + '/admin/course/get', formData, {
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

    if (isLoaded === false) {
        setIsLoaded(true)
        getCourses();
    }

    const deleteCourse = async (id) => {
        setIsLoading(true)
        const formData = new FormData();
        formData.append('action', 'getCategory');
        formData.append('id', id);
        const rsp = await axios.post(CONST.API_SERVER + '/admin/course/delete', formData, {
            'Content-Type': 'text/plain',
        });
        // console.log("Got data " + rsp.data.result);
        setIsLoaded(true)
        try {
            if (rsp.data.status.length > 0 && rsp.data.status === "Success") {
                setIsLoading(false)
                setIsLoaded(false)
            } else {
                setIsLoading(false)
            }
        } catch (error) {
        }
    }

    return (
        <>
        <Helmet>
            <title>Manage course content</title>
        </Helmet>
         {isLoading ? <div className='LoaderClass'></div> : null}
            <Header />
            <div className="page-wrapper default-version">
                <Sidebar act={3} />

                <div class="body-wrapper">
                    <div class="bodywrapper__inner">
                        <div class="row align-items-center mb-30 justify-content-between">
                            <div class="col-lg-6 col-sm-6">
                                <h6 class="page-title"> Course Info  </h6>
                            </div>
                            { /* <div class="col-lg-6 col-sm-6">
                                <a href={"/courses/new"} className='btn btn--primary float-right' > Add Content </a>
                            </div>*/ }

                        </div>
                        {showMessage ? <div className="col-md-12 p-5">
                            <div className="card p-3"> {message} </div>
                        </div> : null}

                        <div className="row col-md-12">
                            <div className="col-md-3 card p-2" onClick={() => { window.location.href = '/course/edit/' + (getPara('content-add')) }}> Edit Course </div>
                            <div className="col-md-3 card p-2" onClick={() => { window.location.href = '/courses/weeks/' + (getPara('content-add')) }} > Weeks/Chapters </div>
                            <div className="col-md-3 card p-2" onClick={() => { window.location.href = '/courses/manage-contents/' + (getPara('content-add')) }} > Manage Contents </div>
                            <div className="col-md-3 card p-2" onClick={() => { window.location.href = '/courses/enrolled/' + (getPara('content-add')) }} > Enrolled Students </div>

                        </div>
                        {/*
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
                                                            <td> {course.uid} </td>
                                                            <td>
                                                                <a href={"/courses/content-add/" + course.id}> <button className='btn btn-primary'>Add Content </button> </a> &nbsp;
                                                                <button className='btn btn-danger' onClick={() => { deleteCourse(course.id) }}>Delete Course</button> </td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                                                    */ }
                    </div>
                </div>

            </div>
            <Footer />
        </>
    )
}

export default CourseContentAdd