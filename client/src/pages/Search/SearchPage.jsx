import React, { useState } from 'react'
import Nav from '../../components/NavBar'
import Footer from '../../components/Footer'
import { CONST, getPara } from '../../constants'
import { Link } from 'react-router-dom'
import axios from 'axios'
import "./style.scss"
import Loader from '../../Loader'
const SearchPage = () => {


    const [topic, setTopic] = useState(0);

    const [isLoading, setIsLoading] = useState(true)
    const [courses, setCourses] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)
    const [category, setCategory] = useState([])
    const [loadingCategory, setLoadingCategory] = useState('Arts and Humanities')
    async function getCourses() {
        setIsLoading(true)

        if (decodeURI(getPara("query")) === "any") {
            const formData = new FormData();
            formData.append('action', 'getCategory');
            formData.append('category', decodeURI(getPara("category")));
            const rsp = await axios.post(CONST.API_SERVER + '/admin/course/get-by-category', formData, {
                'Content-Type': 'text/plain',
            });
            // console.log("Got data " + rsp.data.result);
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

        } else {
            const formData = new FormData();
            formData.append('action', 'getCategory');
            formData.append('query', decodeURI(getPara("query")));
            const rsp = await axios.post(CONST.API_SERVER + '/admin/course/get-by-query', formData, {
                'Content-Type': 'text/plain',
            });
            // console.log("Got data " + rsp.data.result);
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


        const formData2 = new FormData();
        formData2.append('action', 'getCategory');
        const rsp2 = await axios.post(CONST.API_SERVER + '/admin/categories/get/all', formData2, {
            'Content-Type': 'text/plain',
        });
        if (rsp2.data.result.length > 0) {
            setCategory(rsp2.data.result)
        } else {

        }
    }



    if (isLoaded === false) {
        setIsLoaded(true)
        console.log("Category ::: " + decodeURI(getPara("query")))
        getCourses();
    }

    return (
        <>
            <Nav />
            <div className="container search-page-container">
                <div className="row">
                    <div className="col-md-12 padding-50">
                        <big className='bold'>Explore 100% online Degrees and Certificates on {CONST.APPNAME} </big>
                    </div>
                    <div className="col-md-3 color-primary">
                        <u><h3>Filter By Category</h3></u>
                        {category.length > 0 ? category.map((ct, inx) => (
                            <a href={"/search/query/any/category/" + ct.title} className='filter-links'> {ct.title} </a>
                        )) : <Loader />}
                    </div>
                    <div className="col-md-9 row">
                        <div className="col-md-12">
                            {isLoaded ? <h2> {courses.length} results for "{decodeURI(getPara("query"))}"  category <b>{decodeURI(getPara("category"))} </b> </h2> : null}
                        </div>
                        {courses.length > 0 ? courses.map((course, i) => (
                            <div className="col-md-4 my-course-card" onClick={()=>{ window.location.href="/course/" + course.category + "/" + course.id + "/" + course.title }}>
                                <img src={CONST.ADMIN_SERVER + "/uploads/" + course.thumbnail} alt="" className='course-thumbnail' />
                                <br /><br />
                                <div className="com-info">
                                    <div className="com-logo">
                                        <img src="/images/company-logo.png" alt="" />
                                    </div>
                                    <div className="com-name"> <b> {CONST.APPNAME}</b> </div>
                                </div>
                                <a href={"/course/" + course.category + "/" + course.id + "/" + course.title}> <h4> {course.title} </h4> </a>
                                <b>Category : </b><a href={"/search/query/any/category/" + course.category}> {course.category} </a> <br />
                                <span>
                                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste, saepe. Minus obcaecati delectus repellendus commodi consectetur cumque
                                </span>
                            </div>
                        )) : <> <center> <h2> No Course found! </h2> </center> </>}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default SearchPage