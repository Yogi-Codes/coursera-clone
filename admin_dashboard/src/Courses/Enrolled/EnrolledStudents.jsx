import React, { useState } from 'react'
import Footer from '../../widgets/Footer'
import Header from '../../widgets/Header'
import Sidebar from '../../widgets/Sidebar'
import axios from 'axios'
import { CONST, getPara } from '../../constant'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'

const EnrolledStudents = () => {

    const [message, setMessage] = useState()
    const [showMessage, setShowMessage] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [courses, setCourses] = useState([]) 
    const [isLoaded, setIsLoaded] = useState(false) 

    const [transaction, setTransaction] = useState([])

    const [isTransactionLoaded, setIsTransactionLoaded] = useState(false)

    async function getCourses() {
        setIsLoading(true)
        const formData = new FormData();
        formData.append('action', 'getCategory');
        formData.append('id', getPara('enrolled'));
        const rsp = await axios.post(CONST.API_SERVER + '/admin/course/get-single', formData, {
            'Content-Type': 'text/plain',
        }); 
        setIsLoaded(true)
        try {
            if (rsp.data.message.length > 0 && rsp.data.message === "Success") { 
                setCourses(rsp.data.result)
                setIsLoaded(true)
                setIsLoading(false) 
            } else {
                setIsLoading(false)
            }
        } catch (error) {
        }
    }

    async function getCourseTransactions() {
        setIsLoading(true)
        const formData = new FormData();
        formData.append('action', 'getCategory');
        formData.append('id', getPara('enrolled'));
        const rsp = await axios.post(CONST.API_SERVER + '/admin/course/enrolled', formData, {
            'Content-Type': 'text/plain',
        });
        setIsLoaded(true)
        try {
            if (rsp.data.message.length > 0 && rsp.data.message === "Success") {
                setTransaction(rsp.data.result)
                setIsTransactionLoaded(true)
                setIsLoading(false)
            } else {
                setIsLoading(false)
            }
        } catch (error) {
        }
    }



    if (isLoaded === false) {
        getCourses();
        setIsLoaded(true)
    }

    if (isLoaded === true && isTransactionLoaded === false) {
        setIsTransactionLoaded(true)
        getCourseTransactions();

    }


    const deleteChapter = async (id) => {
        setIsLoading(true)
        const formData = new FormData();
        formData.append('action', 'getCategory');
        formData.append('id', id);
        const rsp = await axios.post(CONST.API_SERVER + '/admin/weeks/delete', formData, {
            'Content-Type': 'text/plain',
        }); 
        setIsLoaded(true)
        try {
            if (rsp.data.message.length > 0 && rsp.data.message === "Success") { 
                window.location.reload() 
            } else {
                setIsLoading(false)
            }
        } catch (error) {
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
            <title>Enrolled Students</title>
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
                                        <h6 class="page-title"> Enrolled Students ( <b>{courses[0].title}</b> ) </h6>
                                    </div>
                                    <div class="col-lg-6 col-sm-6">
                                        <button className='btn btn--warning float-right' onClick={() => { window.location.href = '/courses/content-add/' + getPara('enrolled') }} style={{ marginLeft: "30px" }} > Go Back  </button>
                                    </div>

                                </div>
                                {showMessage ?
                                    <div className="col-md-12 p-5">
                                        <div className="card p-3">  {message} </div>
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
                                                                <th> Name </th>
                                                                <th> Designation </th>
                                                                <th> Enrolled on </th>
                                                                <th> Certificate </th>
                                                                <th> Progress </th>
                                                                <th> Certificate </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {transaction.map((course, i) =>
                                                                <StudentRow id={course.user_id} counter={i} ext={course} />
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


const StudentRow = ({ id: id, counter: counter, ext: ext }) => {

    const [isLoading, setIsLoading] = useState(true)
    const [user, setUser] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)

    async function getStudentData() {
        setIsLoading(true)
        const formData = new FormData();
        formData.append('action', 'getCategory');
        formData.append('id', id);
        const rsp = await axios.post(CONST.API_SERVER + '/admin/course/student-single', formData, {
            'Content-Type': 'text/plain',
        });
        setIsLoaded(true)

        try {
            if (rsp.data.message.length > 0 && rsp.data.message === "Success") {
                console.log(rsp.data.result[0].name)
                setUser(rsp.data.result)
                setIsLoading(false)
            } else {
                setIsLoading(false)
            }
        } catch (error) {
        }
    }

    // const removeCandidate = async (id) => {
    //     setIsLoading(true)
    //     const formData = new FormData();
    //     formData.append('action', 'getCategory');
    //     formData.append('user_id', id);
    //     formData.append('course_id', id);
    //     const rsp = await axios.post(CONST.API_SERVER + '/admin/weeks/delete', formData, {
    //         'Content-Type': 'text/plain',
    //     });
    //     // console.log("Got data " + rsp.data.result);
    //     setIsLoaded(true)
    //     try {
    //         if (rsp.data.message.length > 0 && rsp.data.message === "Success") {
    //             // setIsLoading(false)
    //             window.location.reload()
    //             // setIsLoaded(false)
    //         } else {
    //             setIsLoading(false)
    //         }
    //     } catch (error) {
    //     }
    // }

    if (isLoaded === false) {
        getStudentData();
        setIsLoaded(true)
    }

    return (

        <>
            {user.length > 0 ?
                <tr>
                    <td> {counter + 1} </td>
                    <td> {user[0].name} </td>
                    <td> {user[0].designation} </td>
                    <td> {ext.date} </td>
                    <td> {ext.certificate_uploaded === "Yes" ? <img src={"/uploads/certificates/" + ext.certificate} style={{ height: "90px" }} onClick={() => { window.open("/uploads/certificates/" + ext.certificate) }} /> : "Not uploaded"} </td>

                    <td> {ext.progress}% </td>

                    <td> <a href={"/upload/certificate/" + getPara("enrolled") + "/uid/" + user[0].id}> <button className='btn btn-success'> Upload/Change </button> </a>  </td>
                </tr>

                : null
            }
        </>

    )
}


export default EnrolledStudents