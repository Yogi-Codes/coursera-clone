import React, { useState } from 'react'
import Footer from '../widgets/Footer'
import Header from '../widgets/Header'
import Sidebar from '../widgets/Sidebar'
import { CONST } from '../constant'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
const StudentTrashed = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [courses, setCourses] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)

    if (isLoaded === false) {
        setIsLoaded(true)
        getCourses();
    }
    async function getCourses() {
        setIsLoading(true)
        const formData = new FormData();
        formData.append('action', 'getCategory');
        const rsp = await axios.post(CONST.API_SERVER + '/admin/students/trashed', formData, {
            'Content-Type': 'text/plain',
        });
        setIsLoaded(true)
        try {
            if (rsp.data.message.length > 0 && rsp.data.message === "Success") {
                setCourses(rsp.data.result)
                setIsLoading(false)
            } else {
                setIsLoading(false)
            }
        } catch (error) {
        }
    }


    async function deleteUser(uid) {
        setIsLoading(true)
        const formData = new FormData();
        formData.append('action', 'DeleteUser');
        formData.append('uid', uid);
        const rsp = await axios.post(CONST.API_SERVER + '/admin/students/delete-parmanantly', formData, {
            'Content-Type': 'text/plain',
        });
        setIsLoaded(true)
        try {
            if (rsp.data.status.length > 0 && rsp.data.status === "Success") {
                setIsLoaded(false)
            } else {
                setIsLoading(false)
            }
        } catch (error) {
        }
    }

    async function recoverUser(uid) {
        setIsLoading(true)
        const formData = new FormData();
        formData.append('action', 'RecoverUser');
        formData.append('uid', uid);
        const rsp = await axios.post(CONST.API_SERVER + '/admin/students/recover', formData, {
            'Content-Type': 'text/plain',
        });
        setIsLoaded(true)
        try {
            if (rsp.data.status.length > 0 && rsp.data.status === "Success") {
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
            <title>Blocked Students</title>
        </Helmet>
        {isLoading ? <div className='LoaderClass'></div> : null}
            <Header />
            <div className="page-wrapper default-version">
                <Sidebar act={4} />

                <div class="body-wrapper">
                    <div class="bodywrapper__inner">
                        <div class="row align-items-center mb-30 justify-content-between">
                            <div class="col-lg-6 col-sm-6">
                                <h6 class="page-title"> Blocked Students </h6>
                            </div>
                            <div class="col-lg-6 col-sm-6">
                                <a href={"/users/new"} className='btn btn--primary float-right' > Add New Student </a>
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
                                                        <th> Name </th>
                                                        <th> Email </th>
                                                        <th> Designation </th>
                                                        <th> Action </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {courses.map((course, i) =>
                                                        <tr>
                                                            <td> {i + 1} </td>
                                                            <td> {course.name} </td>
                                                            <td> {course.email} </td>
                                                            <td> {course.designation} </td>
                                                            <td>
                                                                <button className='btn btn-success' onClick={() => { recoverUser(course.id) }}>Recover</button> &nbsp; 
                                                                <button className='btn btn-danger' onClick={() => { deleteUser(course.id) }}>Delete</button>
                                                            </td>
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

export default StudentTrashed