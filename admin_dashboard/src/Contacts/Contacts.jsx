import React, { useState } from 'react'
import Footer from '../widgets/Footer'
import Header from '../widgets/Header'
import Sidebar from '../widgets/Sidebar'
import { CONST } from '../constant'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'


const Contacts = () => {

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
        const rsp = await axios.post(CONST.API_SERVER + '/admin/contacts/get', formData, {
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
        formData.append('id', uid);
        const rsp = await axios.post(CONST.API_SERVER + '/contacts/delete', formData, {
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
            <title>Contacts - { CONST.APPNAME }</title>
        </Helmet>
        {isLoading ? <div className='LoaderClass'></div> : null}
            <Header />
            <div className="page-wrapper default-version">
                <Sidebar act={6} />

                <div class="body-wrapper">
                    <div class="bodywrapper__inner">
                        <div class="row align-items-center mb-30 justify-content-between">
                            <div class="col-lg-6 col-sm-6">
                                <h6 class="page-title"> All Contacts </h6>
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
                                                        <th> Date </th>
                                                        <th> Subject </th>
                                                        <th> Action </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {courses.map((course, i) =>
                                                        <tr>
                                                            <td> {i + 1} </td>
                                                            <td> {course.name} </td>
                                                            <td> {course.email} </td>
                                                            <td> {course.date} </td>
                                                            <td> {course.subject} </td>
                                                            <td>
                                                               <a href={"/contacts/read/"+course.id}>  <button className='btn btn-success'>Read</button>  </a> 
                                                                    &nbsp; 
                                                                 <button className='btn btn-danger' onClick={() => { deleteUser(course.id) }}>Delete</button> </td>
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

export default Contacts