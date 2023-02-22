import React, { useState } from 'react'
import Footer from '../widgets/Footer'
import Header from '../widgets/Header'
import Sidebar from '../widgets/Sidebar'
import { CONST } from '../constant'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'


const CourseAll = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [courses, setCourses] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)

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
            <title>Manage courses</title>
        </Helmet>
        {isLoading ? <div className='LoaderClass'></div> : null}
            <Header />
            <div className="page-wrapper default-version">
                <Sidebar act={3} />

                <div class="body-wrapper">
                    <div class="bodywrapper__inner">
                        <div class="row align-items-center mb-30 justify-content-between">
                            <div class="col-lg-6 col-sm-6">
                                <h6 class="page-title"> All Courses </h6>
                            </div>
                            <div class="col-lg-6 col-sm-6">
                                <a href={"/courses/new"} className='btn btn--primary float-right' > Add New Course </a>
                            </div>

                        </div>
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
                                                        {/* <th> Author </th> */}
                                                        <th> Action </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {courses.map((course, i) =>
                                                        <tr>
                                                            <td> {i + 1} </td>
                                                            <td> <a href={"/course/edit/" + course.id}>{course.title}</a>  </td>
                                                            <td> {course.price} Inr. </td>
                                                            <td> {course.category} </td>
                                                            {/* <td> {course.uid} </td> */}
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
                    </div>
                </div>

            </div>
            <Footer />
        </>
    )
}

export default CourseAll