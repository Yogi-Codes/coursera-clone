import React, { useState } from 'react'
import Header from '../widgets/Header'
import Footer from '../widgets/Footer'
import Sidebar from '../widgets/Sidebar'
import { CONST, getPara } from '../constant'
import axios from 'axios'
import Cookies from 'universal-cookie';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Helmet } from 'react-helmet'

const CourseEdit = () => {
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
    const [course, setCourse] = useState([])
    const [set, setSET] = useState(false)


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
        const formData2 = new FormData();
        formData2.append('action', 'getCategory');
        formData2.append('id', getPara('edit'));
        const rsp2 = await axios.post(CONST.API_SERVER + '/admin/course/get-single', formData2, {
            'Content-Type': 'text/plain',
        });
        if (rsp2.data.result.length > 0) {
            setCourse(rsp2.data.result);
            setSET(false)
        }
    }

    if (isLoaded === false) {
        setIsLoaded(true)
        getCategory();
    }

    async function submitForm() {
        if (file != undefined && file != null) {
            setIsLoading(true)
            const formData = new FormData();
            formData.append('action', 'addPost');
            formData.append('file', file);
            formData.append('category', type);
            formData.append('title', title);
            formData.append('price', price);
            formData.append('description', description);
            formData.append('uid', uid);
            formData.append('cid', getPara('edit'));

            const rsp = await axios.post(CONST.API_SERVER + '/admin/post/update', formData, {
                'Content-Type': 'text/plain',
            });
            console.log("Got data " + rsp.data.status);
            if (rsp.data.status === "Success") {
                window.location.href = '/courses/all';
            }
            setIsLoaded(true)
        }
    }
    if (!set && course.length > 0) {
        setTitle(course[0].title)
        setType(course[0].category)
        setPrice(course[0].price)
        setDescription(course[0].description)
        setSET(true)
    }

    return (
        <>
        <Helmet>
            <title>Edit course</title>
        </Helmet>
        {isLoading && course.length > 0 ? <div className='LoaderClass'></div> : null}

            <Header />
            <div className="page-wrapper default-version">
                <Sidebar act={3} />

                <div class="body-wrapper">
                    <div class="bodywrapper__inner">
                        <div class="row align-items-center mb-30 justify-content-between">
                            <div class="col-lg-6 col-sm-6">
                                <h6 class="page-title"> Edit Course <b>{course.length > 0 ? course[0].title : ''} </b> </h6>
                            </div>
                        </div>
                        {course.length > 0 ? <div class="row">
                            <div class="col-lg-12">
                                <div class="card b-radius--10">
                                    <div class="card-body p-10">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <p>Enter course name/title </p>
                                                <input type="text" defaultValue={course[0].title} className='form-control' required onChange={(e) => { setTitle(e.target.value) }} />
                                            </div>

                                            <div className="col-md-4">
                                                <p>Select category/type </p>
                                                <span id="select_category">

                                                </span>
                                                <select className='form-control' onChange={(e) => { setType(e.target.value) }} >
                                                    <option value={course[0].category} disabled selected > {course[0].category} </option>
                                                    {category.map((ctx, i) =>
                                                        <option value={ctx.title}> {ctx.title} </option>
                                                    )}
                                                </select>
                                            </div>

                                            <div className="col-md-4">
                                                <p>Course price (0 means free) </p>
                                                <input type="number" defaultValue={course[0].price} className='form-control' required onChange={(e) => { setPrice(e.target.value) }} />
                                            </div>
                                            <div className="col-md-4">
                                                <p>Course thumbnail photo </p>
                                                <input type="file" name="" id="" className='form-control' required onChange={(e) => { setFile(e.target.files[0]); }} />
                                            </div>

                                            <div className="col-md-12">
                                                <p>Course description </p>

                                                <CKEditor
                                                    editor={ClassicEditor}
                                                    data={course[0].description}
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
                                                <br />
                                                <center>
                                                    <p className="text-danger">Select thumbnail image also if don't selected! It is required </p> <br />
                                                    <button className='btn btn-primary' onClick={() => { submitForm() }}> Update Course </button> </center>
                                            </div>

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

export default CourseEdit