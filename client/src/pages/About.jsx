import React from 'react'
import { Helmet } from 'react-helmet'
import Footer from '../components/Footer'
import Nav from '../components/NavBar'
import { CONST } from '../constants'

const About = () => {
  return (
    <>
        <Helmet>
            <title> About Us - { CONST.APPNAME } </title>
        </Helmet>
        <Nav />
        <div className="container">
            <div className="row">
                <div className="col-md-12"> <br /><br />
                    <h2>About us </h2>
                    <big>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis atque accusamus, assumenda commodi, eius sit sunt vero facilis animi perferendis nesciunt placeat porro esse provident est. Vel perferendis magni laboriosam. <br /> <br />
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis atque accusamus, assumenda commodi, eius sit sunt vero facilis animi perferendis nesciunt placeat porro esse provident est. Vel perferendis magni laboriosam. <br />
                        <br /><br />
                    </big>
                </div>
            </div>
        </div>

        <Footer />
    </>
  )
}

export default About