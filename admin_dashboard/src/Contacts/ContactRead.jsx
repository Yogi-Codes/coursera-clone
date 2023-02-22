import React, { useState } from 'react'
import Footer from '../widgets/Footer'
import Header from '../widgets/Header'
import Sidebar from '../widgets/Sidebar'
import { CONST, getPara } from '../constant'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'


const ContactRead = () => {

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
        formData.append('id', getPara("read"));
        const rsp = await axios.post(CONST.API_SERVER + '/admin/contacts/single', formData, {
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


    async function deleteUser(id) {
        setIsLoading(true)
        const formData = new FormData();
        formData.append('action', 'DeleteUser');
        formData.append('id', id);
        const rsp = await axios.post(CONST.API_SERVER + '/contacts/delete', formData, {
            'Content-Type': 'text/plain',
        });
        setIsLoaded(true)
        try {
            if (rsp.data.status.length > 0 && rsp.data.status === "Success") {
                window.location.href = '/contacts'
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
            <title>Readd Contact - { CONST.APPNAME }</title>
        </Helmet>
        {isLoading ? <div className='LoaderClass'></div> : null}
            <Header />
            <div className="page-wrapper default-version">
                <Sidebar act={6} />

                <div class="body-wrapper">
                    <div class="bodywrapper__inner">
                        <div class="row align-items-center mb-30 justify-content-between">
                            <div class="col-lg-6 col-sm-6">
                                <h6 class="page-title"> Read Contact </h6>
                            </div>
                            <div class="col-lg-6 col-sm-6">
                                <button className='btn btn-danger float-right ml-50' onClick={() => { deleteUser(getPara('read')) }}> Delete </button>

                                <a href={"/contacts"} className='btn btn--primary float-right' > Back </a>

                            </div>
                        </div>
                        {courses.length > 0 ? <div class="row">
                            <div class="col-lg-12">
                                <div class="card b-radius--10">
                                    <div class="card-body p-10">
                                        <div className="col-md-12 p-5">
                                            Sender : {courses[0].name}  <br />
                                            Email :  {courses[0].email} <br />
                                            Date :  {courses[0].date} <br />
                                            Subject :  {courses[0].subject} <hr />
                                            {courses[0].description}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> : null}
                    </div>
                </div>

            </div>
            <Footer />
        </>
    )
}

export default ContactRead