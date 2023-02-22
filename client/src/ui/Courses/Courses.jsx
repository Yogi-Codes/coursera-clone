import React, { useState } from 'react'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import "./style.scss"
import axios from 'axios'
import { CONST } from '../../constants';
import { RelatedCoursesList } from '../../data/RelatedCourses';
import { Link } from 'react-router-dom';

const Courses = () => {

    const [isLoading, setIsLoading] = useState(true)
    const [courses, setCourses] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)

    async function getCourses() { 
        setIsLoading(true)
        const formData = new FormData();
        formData.append('action', 'getCategory');
        const rsp = await axios.post(CONST.API_SERVER + '/admin/course/get', formData, {
            'Content-Type': 'text/plain',
        }); 
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

    if (isLoaded === false) {
        setIsLoaded(true)
        getCourses();
    }

    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 5
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };
    return (
        <div className='new-courses-section row padding-50'>
            <h2>Explore our career-changing Professional Certificates</h2>
            <div className="new-courses">
                <Carousel responsive={responsive}>
                    {RelatedCoursesList.map((post, ind) => (
                        <div className='new-courses-card' key={ind}>
                            <img src="https://images.unsplash.com/photo-1659536540455-161b929e650c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60" className='thumbnail-photo' />
                            <div className="desc">

                                <img src={post.partner_photo} alt="companyName" className='this-is-card-partner-photo' />
                                <div className="main-desc"> <br /> <br />
                                   <a><p className='card-ttile'>{post.title}</p> </a>
                                    <p className='fs-14 margin-top--13px'> {post.certificate_type} </p>
                                    <br />
                                    <p className="certificate-type">
                                        <b> {post.certificate_type} </b>
                                    </p>
                                </div>
                            </div>

                        </div>
                    ))}


                </Carousel>
            </div>
        </div>
    )
}

export default Courses