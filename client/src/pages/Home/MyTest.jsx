import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { CONST } from "../../constants";
import Cookies from "universal-cookie";

const MyTest = ({ courseid: courseId, progress }) => {
  const [course, setCourse] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [prog, setProg] = useState(0);

  const getMyCourses = async () => {
    const formData = new FormData();
    formData.append("action", "true");
    formData.append("course_id", courseId);
    const rsp = await axios.post(
      CONST.API_SERVER + "/course/my-courses-cid",
      formData,
      {
        "Content-Type": "text/plain",
      }
    );
    console.log("Course Data :: " + rsp.data.result);
    setIsLoaded(true);
    try {
      if (rsp.data.status === "Success") {
        setCourse(rsp.data.result);
      } else {
        console.log("We can not process right now! from course list");
      }
    } catch (error) {
      console.log("We can not process right now! from course list");
    }
  };
  if (!isLoaded && courseId > 0) {
    setIsLoaded(true);
    getMyCourses();
  }
 //ANIK

 const progress1 = async () => {

   

   
  try {

      const cookies = new Cookies();
      const formData5 = new FormData();
  formData5.append('action', 'true');
  formData5.append('course_id', courseId);
  formData5.append('user_id', cookies.get("token"));

      const rsp = await axios.post(
          CONST.API_SERVER + "/admin/course/content_transaction/progress_total/",
          formData5,
          { "Content-Type": "text/plain" });


            

    if(rsp.data.status === 'success') {

      if(((rsp.data.result/(rsp.data.total_time*60))*100).toFixed(2)>99.5)
      {

        setProg(100.00)
      }
      else{
        setProg(((rsp.data.result/(rsp.data.total_time*60))*100).toFixed(2))

      }

      
      console.log(prog);
      
      
      console.log("Assign success ")

    } else {
      console.warn("Problem detected ")
    }
  } catch (error) {
    console.log("Error caught " + error)
  }
      
 }
 useEffect(() => {
   progress1()
 }, [])
 

    
//ANIK
   
  return (
    <>
      {isLoaded && course.length > 0 ? (
        <li key={courseId}>
          <p className="fs-19 color-blue dec-underline">{course[0].title}</p>
          <div className="col-md-12 course-card-home row">
            <div className="col-md-2">
              <img
                src={CONST.ADMIN_SERVER + "/uploads/" + course[0].thumbnail}
                alt=""
                className="course-small-photo-100"
              />
            </div>
            <div className="col-md-10">
              <div className="row">
                <div className="col-md-8 course-inner-list-card-left .right-border-3 ">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="row">
                        <div className="col-md-2 align-right right-border-3">
                          {" "}
                          {course[0].type}{" "}
                        </div>
                        <div className="col-md-10"> {course[0].provider} </div>

                        <div className="col-md-12">
                          {" "}
                          <br />
                          <a
                            className="bold fs-25 mr-top-20"
                            href={`/my-course/${course[0].id}/${course[0].title
                              .replace(" ", "-")
                              .toLowerCase()}`}
                          >
                            {" "}
                            {course[0].title}{" "}
                          </a>
                          <div className="progress">
                            <div
                              className="progress-bar"
                              style={{ width: prog + "%" }}
                              role="progressbar"
                              aria-valuenow={progress}
                              aria-valuemin="0"
                              aria-valuemax="100"
                            ></div>
                          </div>
                          <p className="sma-text">
                            {" "}
                            overall progress {prog} %{" "}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-4 padding-25">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="row">
                        <div className="col-md-9">
                          <p className="fs-19 bold"> Next Up </p>
                        </div>
                        <div className="col-md-3">
                          <i className="icofont-info-circle"></i>
                        </div>
                      </div>
                    </div>
                    <div className="custom-flex-box">
                      <i className="icofont-play-alt-2"></i>
                      <a> {course[0].title} </a> <br />
                      <p className="sma-text border-right-1"> week 1 </p>
                      <p className="sma-text border-right-1"> Video 10 min </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>
      ) : null}
    </>
  );
};

export default MyTest;
