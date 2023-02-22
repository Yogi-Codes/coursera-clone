import React, { useState } from "react"
import axios from "axios"
import { CONST } from "../constants"
import { Link } from "react-router-dom"

const NavBarSub = ({ category: categorySent }) => {
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
            {isLoading || !isLoaded ? <div> <h1>Loading....</h1> </div> :
                isLoaded && courses.length < 1 ? <div className="no-post-found-center-text"> No course found! </div> :
                    <div className="row col-md-12 navigation-inner-posts-content">
                        {courses.map((course, ind) => (
                            <a href={"/course/" + course.category + "/" + course.id + "/" + course.title + "/"} className="col-md-6 row ahref-tag-in-menu">

                                <div className="col-md-3"> <img src={CONST.ADMIN_SERVER + "/uploads/" + course.thumbnail} alt="" className="course-thumb-in-navigation" /> </div>
                                <div className="col-md-9 course-thumb-in-navigation-content"> <h5 className="bold">{course.title}</h5>
                                    <p> {course.category} </p>
                                </div>

                            </a>
                        ))}
                    </div>
            }
        </>
    )
}

export default NavBarSub