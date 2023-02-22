import React from 'react'
import "./track.scss"
import Footer from '../../components/Footer'
import Nav from '../../components/NavBar'
import FAQ from '../../ui/FAQ/FAQ'
import MasterTrackBanner from './MasterTrackBanner'
import MasterTrackCourses from './MasterTrackCourses'
const MasterTrack = () => {
    return (
        <>
            <Nav />
            <MasterTrackBanner
                uri={"MasterTrack® Certificates"}
                title={"MasterTrack® Certificates"}
                description={"Master’s Degree Learning Within Reach"}
            />
            <MasterTrackCourses />
            <FAQ />
            <Footer />
        </>
    )
}

export default MasterTrack