import React, { useState } from 'react'
import '../css/style.css';
import Footer2 from './Footer2';
import playstore from '../images/playstore.png';
import { CONST } from '../constants';
import axios from 'axios'
import { Link } from 'react-router-dom';

function Footer() {

    const [isLoading, setIsLoading] = useState(true)
    const [courses, setCourses] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)
    const [category, setCategory] = useState([])
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
        const rsp2 = await axios.post(CONST.API_SERVER + '/admin/categories/get', formData2, {
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
        <div className="container-fluid" style={{ backgroundColor: "#F8F8F8", padding: "40px" }}>
            <div className="row">
                <div className="col-md-3 col-sm-12">
                    <ul style={{ listStyle: "none" }}>
                        <li> <img src={CONST.ADMIN_SERVER + "/images/" + CONST.APPLOGO} alt="" style={{ height: "90px" }} /> </li>
                        <br />
                        <p>
                        IBC Media is a web 3.0 innovation company that aims to pave the way for innovation in web 3.0 in collaboration with the Government of India. Our history has been studded with some rewarding milestones such as IBC 2018 
                        </p>
                    </ul>
                </div>
                <div className="col-md-3 col-sm-12">
                    <ul style={{ listStyle: "none" }}><li><b>Our Best Courses </b></li></ul>
                    <ul style={{ listStyle: "none" }}>
                        {courses.length > 0 ? courses.map((cr, i) => i < 5 ?
                            <a className='footer_links' href={"/course/" + cr.category + "/" + cr.id + "/" + cr.title}> <li> {cr.title} </li> </a> : null) : null}
                    </ul>
                </div>
                <div className="col-md-3 col-sm-12">
                    <ul style={{ listStyle: "none" }}><li><b>Best Subjects</b></li></ul>
                    <ul style={{ listStyle: "none" }}>

                        {category.length > 0 ? category.map((ct, ic) => <a href="" className='footer_links'> <li> {ct.title} </li> </a>) : null}


                    </ul>
                </div>
                <div className="col-md-3 col-sm-12">
                    <ul style={{ listStyle: "none" }}><li><b>Online Degree Program</b></li></ul>
                    <ul style={{ listStyle: "none" }}>
                        <li> <a href={CONST.APPLESTORE} target="_blank"> <img src={"/images/download_on_the_app_store_badge_en.svg"} alt="" width="200" height="60" /> </a> </li>
                        <li> <a href={CONST.PLAYSTORE} target="_blank"> <img src={playstore} alt="" width="200" height="60" /> </a> </li>
                    </ul>
                </div>
            </div>
            <hr />
            <center>
                &copy; 2022 {CONST.APPNAME}
            </center>
            {/* <Footer2/> */}
        </div>
    )
}

export default Footer
