import React from 'react'


import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import "./style.scss"
import { RelatedCoursesList } from '../../data/RelatedCourses';
import { Link } from 'react-router-dom';

const EarnDegree = () => {

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
        <div className='earn-degree-section row'>
            <h2>Earn Your Degree</h2>
            <div className="earn-degree">
                <Carousel responsive={responsive}>
                    {RelatedCoursesList.map((post, ind) => (
                        <div className='earn-degree-card'>
                            <img src="https://images.unsplash.com/photo-1659536540455-161b929e650c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60" className='thumbnail-photo' />
                            <div className="desc">

                                <div className="main-desc"> <br /> <br />
                                   <a><p className='card-ttile'>{post.title}</p> </a>
                                    <p className="certificate-type">
                                        <b> {post.certificate_type} </b>
                                    </p>
                                    <p className="provider"> 100% online class with certificate </p>
                                </div>
                                
                                <div className="rotate-overflow">

                                </div>
                            </div>

                        </div>
                    ))}


                </Carousel>
            </div>
        </div>
    )
}

export default EarnDegree