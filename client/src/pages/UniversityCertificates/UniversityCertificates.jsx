import React from 'react'
import Nav from '../../components/NavBar'
import Footer from '../../components/Footer'
import MasterTrackBanner from '../MasterTrack/MasterTrackBanner'
import FAQ from '../../ui/FAQ/FAQ'
import UniCertificates from './UniCertificates'
const UniversityCertificates = () => {
    return (
        <>
            <Nav />
            <MasterTrackBanner 
                title={"University Certificates"} 
                description={"Begin developing expertise in your chosen field of study"} 
                uri={"University Certificates"} 
            />
            <UniCertificates />
            <FAQ />
            <Footer />
        </>
    )
}

export default UniversityCertificates