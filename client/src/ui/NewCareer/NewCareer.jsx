import React from 'react'
import HeroBanner from './HeroBanner'
import Towards from './Towards'
import "./career.scss"
import CareerBox from './CareerBox'
import Testimonial from '../Testimonial/Testimonial'
import Certificate from './Certificate'
import RelatedCourses from '../RelatedCourses/RelatedCourses'
import FAQ from '../FAQ/FAQ'
import Nav from '../../components/NavBar'
import Footer from '../../components/Footer'

const NewCareer = () => {
  return (
    <>
    <Nav/>
      <HeroBanner />
      <Towards />
      <CareerBox />
      <Testimonial />
      <Certificate />
      <RelatedCourses/>
      <FAQ />
      <Footer/>
    </>
  )
}

export default NewCareer