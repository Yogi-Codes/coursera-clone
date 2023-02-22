import React, { useState } from 'react'
import Header from '../../widgets/Header'
import Footer from '../../widgets/Footer'
import Sidebar from '../../widgets/Sidebar'
import { CONST, getPara } from '../../constant'
import axios from 'axios'
import Cookies from 'universal-cookie';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Helmet } from 'react-helmet'

const CertificateUpload = () => {
    const cookies = new Cookies();
    const uid = cookies.get('_adId');

    const [isLoading, setIsLoading] = useState(true)
    const [isLoaded, setIsLoaded] = useState(false)
    const [category, setCategory] = useState([])
    const [img, setIMG] = useState('')
    const [file, setFile] = useState();
    const [title, setTitle] = useState();
    const [price, setPrice] = useState();
    const [type, setType] = useState();
    const [description, setDescription] = useState();
    const [user, setUser] = useState([])
    const [thumbnail, setThumbnail] = useState()
    async function getUser() {
        const formData = new FormData();
        formData.append('action', 'user');
        formData.append('uid', getPara('uid'));
        const rsp = await axios.post(CONST.API_SERVER + '/user/userInfo', formData, {
            'Content-Type': 'text/plain',
        });
        try {
            if (rsp.data.message.length > 0 && rsp.data.message === "Success") {
                setUser(rsp.data.result)
            } else {
            }
        } catch (error) {
        }
    }

    async function getCourse() {
        setIsLoading(true)
        const formData = new FormData();
        formData.append('action', 'getCategory');
        formData.append('course_id', getPara("certificate"));
        formData.append('user_id', getPara("uid"));
        const rsp = await axios.post(CONST.API_SERVER + '/course/my-courses/transaction', formData, {
            'Content-Type': 'text/plain',
        });

        try {
            if (rsp.data.status.length > 0 && rsp.data.status === "Success") {
                setCategory(rsp.data.result)
                console.log("Loaded :: " + rsp.data.result)
                setIsLoading(false)
            } else {
                setIsLoading(false)
            }
        } catch (error) {
        }
        setIsLoaded(true)
    }

    if (isLoaded === false) {
        getUser();
        getCourse();
        setIsLoaded(true)
    }

    async function submitForm() {
        setIsLoading(true)
        const formData = new FormData();
        formData.append('action', 'addPost');
        formData.append('thumbnail', thumbnail);
        formData.append('course_id', getPara("certificate"));
        formData.append('uid', getPara("uid"));

        const rsp = await axios.post(CONST.API_SERVER + '/admin/certificate_post/update', formData, {
            'Content-Type': 'text/plain',
        });
        console.log("Got data " + rsp.data.status);
        if (rsp.data.status === "Success") {
            window.location.href = '/courses/enrolled/' + getPara("certificate");
        }
        setIsLoaded(true)
    }

    return (
        <>
        <Helmet>
            <title>Upload certificate</title>
        </Helmet>
        {isLoading ? <div className='LoaderClass'></div> : null}

            <Header />
            <div className="page-wrapper default-version">
                <Sidebar act={3} />

                <div class="body-wrapper">
                    <div class="bodywrapper__inner">
                        <div class="row align-items-center mb-30 justify-content-between">
                            <div class="col-lg-6 col-sm-6">
                                <h6 class="page-title"> Upload certificate </h6>
                            </div>
                        </div>
                        <div class="row">
                            {user.length > 0 && category.length > 0 ? <div class="col-lg-4">
                                <div class="card b-radius--10">
                                    <div class="card-body p-10">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <table className="table">
                                                    <tr> <th> Name </th> <td> {user[0].name} </td> </tr>
                                                    <tr> <th> Designation </th> <td> {user[0].designation} </td> </tr>
                                                    <tr> <th> Enrolled Date </th> <td> {category[0].date} </td> </tr>
                                                    <tr> <th> Course Completed </th> <td> {category[0].progress}% </td> </tr>
                                                    <tr> <th> Select Certificate </th> <td>  <input type="file" name="" id="" className='file-control' onChange={(e) => { setIMG(URL.createObjectURL(e.target.files[0])); console.log(e.target.files[0].name); setThumbnail(e.target.files[0]) }} accept="image/*" /> </td> </tr>
                                                </table>
                                            </div>


                                            <div className="col-md-12">
                                                <br />
                                                <center><button className='btn btn-primary' onClick={() => { submitForm() }}> Add Certificate </button> </center>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div> : null}
                            <div className="col-md-4">
                                {/* <iframe src={img} frameborder="0" style={{ height: "100%", width: '100%' }}  id="imgBox"></iframe> */}
                                <img src={img} alt="" />
                            </div>
                        </div>
                    </div>
                </div>



            </div>
            <Footer />
        </>
    )
}

export default CertificateUpload