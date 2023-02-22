import React, { useState } from 'react'
import Footer from '../../components/Footer'
import Nav from '../../components/NavBar'
import CourseViewHeader from './CourseViewHeader'
import CourseViewContent from './CourseViewContent'
import "./style.scss"
import axios from 'axios'
import { CONST, getParaByPosition } from '../../constants'

import FAQ from '../../ui/FAQ/FAQ'
import { Helmet } from 'react-helmet'

const CourseView = () => {



    const [id, setID] = useState('')
    const [category, setCategory] = useState('')
    const [title, setTitle] = useState('')
    const [isSet, setIsSet] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [courses, setCourses] = useState([])

    const getSingleCourse = async () => {
        var id = getParaByPosition(3);
        setID(id)

        setIsLoading(true)
        const formData = new FormData();
        formData.append('action', 'GetSingleCourse');
        formData.append('id', id);
        const rsp = await axios.post(CONST.API_SERVER + '/admin/course/get-single', formData, {
            'Content-Type': 'text/plain',
        });
        console.log(":: Data :: " + rsp.data.result[0].title)
        console.log("Data count " + rsp.data.result.length)
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

    if (!isLoaded) {
        setIsLoaded(true)
        getSingleCourse()
    }
    return (
        <>
            <Nav />
            {courses.length > 0 ? <Helmet>
                <title>{courses[0].title} - {CONST.APPNAME}  </title>
            </Helmet> : null}
            {courses.length > 0 ?
                <CourseViewHeader title={courses[0].title} category={courses[0].category} thumbnail={courses[0].thumbnail} price={courses[0].price} /> : null}

            {courses.length > 0 ?
                <CourseViewContent content={courses[0].description} /> : null}

            <FAQ />
            <br /> <br />
            <Footer />
        </>

    )
}

export default CourseView