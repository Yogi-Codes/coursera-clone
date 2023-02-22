import React, { Component, useState } from 'react'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import "./style.scss"
import { RelatedCoursesList } from '../../data/RelatedCourses';
import { Link } from 'react-router-dom';
import axios from 'axios'
import { CONST } from '../../constants';
import Loader from '../../Loader';

const RelatedCourses = () => {

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
            items: 4
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
        <div className='related-courses-section row padding-50'>
            <h2>Explore our career-changing Professional Certificates</h2>

            {!isLoaded ? <Loader /> :
                <div className="realted-courses">
                    <Carousel responsive={responsive}>
                        {  courses.map((post, ind) => (
                            <div className='related-course-card'>
                                <img src={ CONST.ADMIN_SERVER + "/admin_dashboard/public/uploads/"+ post.thumbnail }  className='thumbnail-photo' />
                                <div className="desc">
                                    <div className="rotate-overflow">

                                    </div>
                                    <img src={"/images/company-logo.png"} alt="companyName" className='this-is-card-partner-photo' />
                                    <div className="main-desc"> <br /> <br />
                                        <a href={"/course/"+post.category+"/"+post.id+"/"+post.title } ><p className='card-ttile'>{post.title}</p> </a>  <br />
                                        <p className="certificate-type">
                                            <b> {post.certificate_type} </b>
                                        </p>
                                    </div>
                                </div>

                            </div>
                        ))}


                    </Carousel>
                </div>
            }
        </div>
    )
}

export default RelatedCourses