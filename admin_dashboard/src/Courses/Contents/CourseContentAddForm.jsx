import React, { useState } from 'react'
import Footer from '../../widgets/Footer'
import Header from '../../widgets/Header'
import Sidebar from '../../widgets/Sidebar'
import axios from 'axios'
import { CONST, getPara } from '../../constant'
import { Link } from 'react-router-dom'
import "./style.scss"
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Helmet } from 'react-helmet'


const CourseContentAddForm = () => {
    const [message, setMessage] = useState()
    const [showMessage, setShowMessage] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [courses, setCourses] = useState([])
    const [weeks, setWeeks] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)
    const [isWeekLoaded, setWeekIsLoaded] = useState(false)
    const [content, setContent] = useState()
    const [type, setType] = useState()
    const [chapter, setChapter] = useState()
    const [readingTime, setReadingTime] = useState(0)
    const [title, setTitle] = useState()
    const [duration, setDuration] = useState()

    async function getCourses() {
        setIsLoading(true)
        const formData = new FormData();
        formData.append('action', 'getCategory');
        formData.append('id', getPara('add-content'));
        const rsp = await axios.post(CONST.API_SERVER + '/admin/course/get-single', formData, {
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

    async function getWeeks() {
        setIsLoading(true)
        const formData = new FormData();
        formData.append('action', 'getCategory');
        formData.append('id', getPara('add-content'));
        const rsp = await axios.post(CONST.API_SERVER + '/admin/course/weeks', formData, {
            'Content-Type': 'text/plain',
        });
        console.log("Got weeks " + rsp.data.result);
        setIsLoaded(true)
        try {
            if (rsp.data.message.length > 0 && rsp.data.message === "Success") {
                const ttl = rsp.data.result[0]['title'];
                // console.log("ttl" + ttl);
                setWeeks(rsp.data.result)
                setIsLoading(false)
            } else {
                setIsLoading(false)
            }
        } catch (error) {
        }
    }

    if (isLoaded === false) {
        setWeekIsLoaded(true)
        getCourses();
    }

    if (isWeekLoaded === false) {
        setIsLoaded(true)
        getWeeks();
    }


    function changeTime(e) {
        if (e >= 60) {
            var tim = (e / 60).toFixed(0)
            var min = (e % 60).toFixed(0)
            if (min < 10) {
                min = '0' + min
                document.getElementById("hrs").innerText = `` + tim + ":" + min + " hrs"
            } else {
                document.getElementById("hrs").innerText = `` + tim + ":" + min + " hrs"
            }

        } else {
            if (e < 10) {
                document.getElementById("hrs").innerText = "0:0" + e + " hrs"
            } else {
                document.getElementById("hrs").innerText = "0:" + e + " hrs"
            }

        }
    }


    async function addContent() {
        setIsLoading(true)
        const formData = new FormData();
        formData.append('action', 'getCategory');
        formData.append('id', getPara('add-content'));
        formData.append('title', title);
        formData.append('content', content);
        formData.append('type', type);
        formData.append('chapter', chapter);
        formData.append('reading_time', readingTime);
        const rsp = await axios.post(CONST.API_SERVER + '/admin/course/add-content', formData, {
            'Content-Type': 'text/plain',
        });
        // console.log("Got weeks " + rsp.data.result);
        setIsLoaded(true)
        try {
            if (rsp.data.message.length > 0 && rsp.data.message === "Success") {
                window.location.href = '/courses/manage-contents/' + getPara("add-content")
            } else {
                setIsLoading(false)
            }
        } catch (error) {
        }
    }

    const addWeek = async () => {
        if (title != undefined && duration != undefined) {
            setIsLoading(true)
            const formData = new FormData();
            formData.append('action', 'getCategory');
            formData.append('id', getPara("weeks"));
            formData.append('title', title);
            formData.append('duration', duration);
            const rsp = await axios.post(CONST.API_SERVER + '/admin/weeks/add', formData, {
                'Content-Type': 'text/plain',
            });
            // console.log("Got data " + rsp.data.result);
            setIsLoaded(true)
            setWeekIsLoaded(true)
            try {
                if (rsp.data.message.length > 0 && rsp.data.message === "Success") {
                    window.location.reload()
                    // setIsLoading(false)
                    // setIsLoaded(false)
                    // setIsFormOpen(false)
                } else {
                    setIsLoading(false)
                }
            } catch (error) {
            }
        } else {
            setMessage("Please fill all fields")
            setShowMessage(true)
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
            <title>Add Course Content</title>
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
                                        <h6 class="page-title"> Course Contents ( <b>{courses[0].title}</b> ) </h6>
                                    </div>
                                    <div class="col-lg-6 col-sm-6">
                                        <button className='btn btn--warning float-right' onClick={() => { window.location.href = '/courses/content-add/' + getPara('add-content') }} style={{ marginLeft: "30px" }} > Go Back  </button>
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
                                                    <div className="col-md-12">
                                                        <p>Enter content title </p>
                                                        <input type="text" className='form-control' onChange={(e) => { setTitle(e.target.value) }} />
                                                    </div>
                                                    <div className="col-md-6">
                                                        <p>Select content type </p>
                                                        <select name="" id="" className='form-control' onChange={(e) => { setType(e.target.value) }} >
                                                            <option defaultValue={""} selected disabled >Select</option>
                                                            <option value={"Text Content"} >Text Content</option>
                                                            <option value={"Video Content"} >Video Content</option>
                                                            <option value={"YouTube Video"} >YouTube Video</option>
                                                            <option value={"PDF Content"} >PDF Content</option>
                                                        </select>
                                                    </div>

                                                    <div className="col-md-6">
                                                        <p>Select chapter </p>
                                                        <select name="" id="" className='form-control' onChange={(e) => { setChapter(e.target.value) }} >
                                                            <option defaultValue={""} selected disabled >Select</option>

                                                            {weeks.map((week, i) => <option value={week.title} >{week.title}</option>)}


                                                        </select>
                                                    </div>

                                                    <div className="col-md-6 row">
                                                        <div className="col-md-12"><p>Estimated reading time (in mins ) </p></div>
                                                        <div className="col-md-6">
                                                            <input type="number" className='form-control' onChange={(e) => { changeTime(e.target.value); setReadingTime(e.target.value) }} defaultValue={0} />
                                                        </div>
                                                        <div className="col-md-6">
                                                            <b id="hrs">0:00 hrs.</b>
                                                        </div>
                                                    </div>

                                                    {type === "Text Content" ?
                                                        <div className="col-md-12">
                                                            <p>Enter Content </p>
                                                            <CKEditor
                                                                editor={ClassicEditor}
                                                                data=""
                                                                onReady={editor => {
                                                                    // console.log('Editor is ready to use!', editor);
                                                                }}
                                                                onChange={(event, editor) => {
                                                                    const data = editor.getData();
                                                                    setContent(data)
                                                                    // console.log({ event, editor, data });
                                                                    // console.log(data);
                                                                }}

                                                            />
                                                        </div>
                                                        : type === "Video Content" ?
                                                            <div className="col-md-12">
                                                                <p>Select video file </p>
                                                                <input type="file" name="" id="" onChange={(e) => setContent(e.target.files[0])} accept='video/*' className='form-control' />
                                                            </div>
                                                            : type === "YouTube Video" ?
                                                                <div className="col-md-12"> <p>Enter youtube video URL</p>
                                                                    <input type="url" name="" id="" onChange={(e) => { setContent(e.target.value) }} className='form-control' />
                                                                </div> : type === "PDF Content" ?
                                                                    <div className="col-md-12"> <p>Select PDF file </p>
                                                                        <input type="file" name="" id="" onChange={(e) => setContent(e.target.files[0])} className='form-control' accept='.pdf' /> </div> : null
                                                    }
                                                    <div className="col-md-12">
                                                        <br />
                                                        <center>
                                                            <button className='btn btn--primary' onClick={() => { addContent() }} > Add Content </button>
                                                        </center>
                                                        <br />
                                                    </div>
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

export default CourseContentAddForm