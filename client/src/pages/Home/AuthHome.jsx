import React from 'react'
import Footer from '../../components/Footer'
import Nav from '../../components/NavBar'
import Courses from '../../ui/Courses/Courses'
import EarnDegree from '../../ui/Degree/EarnDegree'
import RelatedCourses from '../../ui/RelatedCourses/RelatedCourses'
import AuthCourseTab from './AuthCourseTab'
import AuthHero from './AuthHero'
import "./style.scss"

const AuthHome = () => {
    return (
        <>
            <Nav />
            <AuthHero />
            <AuthCourseTab />
            {/* <EarnDegree /> */}
            <RelatedCourses />
            {/* <Courses />
            <Courses />
            <Courses /> */}
            <Footer/>
        </>
    )
}

export default AuthHome