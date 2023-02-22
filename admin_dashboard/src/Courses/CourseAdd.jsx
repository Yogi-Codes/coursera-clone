import React, { useState } from 'react'
import Header from '../widgets/Header'
import Footer from '../widgets/Footer'
import Sidebar from '../widgets/Sidebar'
import { CONST } from '../constant'
import axios from 'axios'
import Cookies from 'universal-cookie';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Helmet } from 'react-helmet'

const CourseAdd = () => {
    const cookies = new Cookies();
    const uid = cookies.get('_adId');

    const [isLoading, setIsLoading] = useState(true)
    const [isLoaded, setIsLoaded] = useState(false)
    const [category, setCategory] = useState([])

    const [file, setFile] = useState();
    const [title, setTitle] = useState();
    const [price, setPrice] = useState();
    const [type, setType] = useState();
    const [description, setDescription] = useState();



    async function getCategory() {
        setIsLoading(true)
        const formData = new FormData();
        formData.append('action', 'getCategory');
        const rsp = await axios.post(CONST.API_SERVER + '/admin/category/get', formData, {
            'Content-Type': 'text/plain',
        });
        setIsLoaded(true)
        try {
            if (rsp.data.message.length > 0 && rsp.data.message === "Success") {
                setCategory(rsp.data.result)
                setIsLoading(false)
            } else {
                setIsLoading(false)
            }
        } catch (error) {
        }
    }

    if (isLoaded === false) {
        setIsLoaded(true)
        getCategory();
    }

    async function submitForm() {
        setIsLoading(true)
        const formData = new FormData();
        formData.append('action', 'addPost');
        formData.append('file', file);
        formData.append('category', type);
        formData.append('title', title);
        formData.append('price', price);
        formData.append('description', description);
        formData.append('uid', uid);

        const rsp = await axios.post(CONST.API_SERVER + '/admin/post/add', formData, {
            'Content-Type': 'text/plain',
        });
        console.log("Got data " + rsp.data.status);
        if (rsp.data.status === "Success") {
            window.location.href = '/courses/all';
        }
        setIsLoaded(true)
    }

    return (
        <>
        <Helmet>
            <title>Add new course</title>
        </Helmet>
        {isLoading ? <div className='LoaderClass'></div> : null}

            <Header />
            <div className="page-wrapper default-version">
                <Sidebar act={3} />

                <div class="body-wrapper">
                    <div class="bodywrapper__inner">
                        <div class="row align-items-center mb-30 justify-content-between">
                            <div class="col-lg-6 col-sm-6">
                                <h6 class="page-title"> Add New Course </h6>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="card b-radius--10">
                                    <div class="card-body p-10">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <p>Enter course name/title </p>
                                                <input type="text" name="" id="" className='form-control' required onChange={(e) => { setTitle(e.target.value) }} />
                                            </div>

                                            <div className="col-md-4">
                                                <p>Select category/type </p>
                                                <span id="select_category">

                                                </span>
                                                <select name="" id="" className='form-control' onChange={(e) => { setType(e.target.value) }} >
                                                    <option value="" disabled selected >Select one </option>
                                                    {category.map((ctx, i) =>
                                                        <option value={ctx.title}> {ctx.title} </option>
                                                    )}
                                                </select>
                                            </div>

                                            <div className="col-md-4">
                                                <p>Course price in INR. (0 means free) </p>
                                                <input type="number" name="" id="" className='form-control' required onChange={(e) => { setPrice(e.target.value) }} />
                                            </div>
                                            <div className="col-md-4">
                                                <p>Course thumbnail photo </p>
                                                <input type="file" name="" id="" className='form-control' required onChange={(e) => { setFile(e.target.files[0]); }} />
                                            </div>

                                            <div className="col-md-12">
                                                <p>Course description </p>

                                                <CKEditor
                                                    editor={ClassicEditor}
                                                    data=""
                                                    onReady={editor => {
                                                        // You can store the "editor" and use when it is needed.
                                                        console.log('Editor is ready to use!', editor);
                                                    }}
                                                    onChange={(event, editor) => {
                                                        const data = editor.getData();
                                                        setDescription(data)
                                                        // console.log({ event, editor, data });
                                                        // console.log(data);
                                                    }}
                                                // onBlur={(event, editor) => {
                                                //     console.log('Blur.', editor);
                                                // }}
                                                // onFocus={(event, editor) => {
                                                //     console.log('Focus.', editor);
                                                // }}
                                                />
                                                <br /><br />
                                                <center><button className='btn btn-primary' onClick={() => { submitForm() }}> Add Course </button> </center>
                                            </div>

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

export default CourseAdd