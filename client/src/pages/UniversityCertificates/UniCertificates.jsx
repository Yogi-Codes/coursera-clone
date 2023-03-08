import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { RelatedCoursesList } from '../../data/RelatedCourses';
import axios from 'axios';
import { CONST } from '../../constants';
const UniCertificates = () => {

    const [topic, setTopic] = useState(0);

    const [isLoading, setIsLoading] = useState(true)
    const [courses, setCourses] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)
    const [category, setCategory] = useState([])
    const [loadingCategory, setLoadingCategory] = useState('Arts and Humanities')
    async function getCourses() {
        setIsLoading(true)
        const formData = new FormData();
        formData.append('action', 'getCategory');
        const rsp = await axios.post(CONST.API_SERVER + '/admin/course/get', formData, {
            'Content-Type': 'text/plain',
        });
        // console.log("Got data " + rsp.data.result);
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
        getCourses();
    }
    return (
        <>
            <div className="row master-track-courses">
                <div className="selector">
                {category.map((e, i) => (
  <a
    key={i}
    onClick={() => {
      setTopic(i);
      setLoadingCategory(e.title);
    }}
    className={topic === i ? "selection-item-active selection-item" : "selection-item"}
    style={{
      boxShadow: topic === i ? "0px 2px 4px rgba(0, 0, 0, 0.25)" : "",
    }}
  >
    {e.title}
  </a>
))}

                </div>
                <div className="col-md-12"><br /><br /></div>

                {category.length > 0 ?
                    <CourseLoader category={loadingCategory} /> : null}


                <div className="col-md-12"><br /><br /></div>
                <div className="col-md-6"> <br /><br />
                    <h5>What is a MasterTrack® Certificate? </h5>
                    <p>
                        With MasterTrack® Certificates, portions of Master’s programs have been split into online modules, so you can earn a high quality university-issued career credential at a breakthrough price in a flexible, interactive format. Benefit from a deeply engaging learning experience with real-world projects and live, expert instruction. If you are accepted to the full Master's program, your MasterTrack® coursework counts towards your degree.
                    </p>
                </div>
                <div className="col-md-6">
                    <img src="/images/mod1_img.jpg" alt="" className='auto-fit' />
                </div>

                <div className="col-md-12"><br /><br /> <br /><br />
                    <center>
                        <h3>Learn More about MasterTrack® Certificates on Coursera</h3>
                    </center> <br />
                </div>

                {/*  repeat  */}
                <div className="col-md-6">
                    <img src="/images/Professionals-Discussing-Strategy.jpg" alt="" className='auto-fit' />
                </div>
                <div className="col-md-6">
                    <br /><br />
                    <h6 className="card-title">MASTER’S DEGREE LEARNING</h6>
                    <h3>The same online learning experience as Master’s degree programs on Coursera</h3>
                    <p>
                        When you enroll in a MasterTrack® program on Coursera, you’re taking an online module of a Master's degree program that features live expert instruction and feedback combined with interactive team-based learning.
                    </p>
                </div>

                <div className="col-md-12"><br /><br /><br /></div>
                {/*  repeat  */}

                <div className="col-md-6">
                    <br /><br />
                    <h6 className="card-title">BOOST YOUR CAREER</h6>
                    <h3> Gain the skills that attract attention from recruiters and hiring managers</h3>
                    <p>
                        Upon successful completion of your MasterTrack® program, you’ll receive a university-issued certificate from a top university that you can add to your resume and LinkedIn profile.
                    </p>
                </div>
                <div className="col-md-6"> <br /><br />
                    <img src="/images/MTC-Schools.png" alt="" className='auto-fit' />
                </div>

                <div className="col-md-12"><br /><br /><br /></div>
                {/*  repeat  */}
                <div className="col-md-6">
                    <img src="/images/mod2_img.jpg" alt="" className='auto-fit' />
                </div>
                <div className="col-md-6">
                    <br /><br />
                    <h6 className="card-title">BUILD YOUR PORTFOLIO</h6>
                    <h3>Collaborate with peers and get feedback from expert instructors</h3>
                    <p>
                        You’ll be able to demonstrate your skills through real-world projects and create work samples that help you stand out in your job search.
                    </p>
                </div>

                <div className="col-md-12"><br /><br /><br /></div>
                {/*  repeat  */}

                <div className="col-md-6">
                    <br /><br /> <br />
                    <h6 className="card-title">START YOUR DEGREE</h6>
                    <h3> Your MasterTrack® coursework can count towards your Master’s degree</h3>
                    <p>
                        If you are accepted to the full Master’s program, your completed coursework counts towards your degrees. Start learning today with programs like Construction Engineering and Management, Instructional Design, Machine Learning for Analaytics, Health Informatics, and more.
                    </p>
                </div>
                <div className="col-md-6"> <br /><br />
                    <img src="/images/4-MTC-ODC.png" alt="" className='auto-fit' />
                </div>
            </div>
        </>
    )
}


const CourseLoader = ({ category: categorySent }) => {
    const [category, setCategory] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const [isLoaded, setIsLoaded] = useState(false)
    const [courses, setCourses] = useState([])


    async function getPosts(cat) {
        setIsLoading(true)
        const formData = new FormData();
        formData.append('action', 'getCategory');
        formData.append('category', cat);
        const rsp = await axios.post(CONST.API_SERVER + '/admin/course/get-by-category', formData, {
            'Content-Type': 'text/plain',
        });
        setIsLoaded(true)
        try {
            if (rsp.data.message.length > 0 && rsp.data.message === "Success") {
                setCourses(rsp.data.result)
                setIsLoading(false)
            } else {
                setCourses([])
                setIsLoading(false)
            }
        } catch (error) {
            setCourses([])
        }
    }


    if (categorySent.length > 0 && categorySent !== category) {
        setCategory(categorySent)
        // console.log('Load posts :: ' + categorySent)
        getPosts(categorySent);
        setIsLoading(false)
        setIsLoaded(true)

    }

    return (
        <>
            {courses.length > 0 ?
                <div className='col-md-12 row course-view-row'>
                    {courses.map((e, i) =>
                        <div className="col-md-4 col-lg-3 col-sm-12">
                            <img src={CONST.ADMIN_SERVER + "/uploads/" + e.thumbnail} alt="" className='s150-auto' style={{ minWidth: "100%" }} />
                            <div className="flex">
                                <img src={"/images/company-logo.png"} alt="" className='s50-50' />
                                <small> {e.provider}</small>
                            </div>
                            <h5> <a href={"/course/" + e.category + "/" + e.id + "/" + e.title}>  {e.title}   </a> </h5>
                            <p>
                                {e.short_description}
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa veniam quasi cupiditate alias eius facere eligendi hic, iure dicta dolor enim in quisquam animi minus quibusdam eos debitis maiores magnam?
                            </p>
                        </div>)}
                </div>
                : <center> <h5> No course found!</h5> </center>}
        </>
    )
}


export default UniCertificates