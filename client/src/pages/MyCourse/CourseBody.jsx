import axios from "axios";
import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { CONST, getPara } from "../../constants";
import "./bodyStyle.scss";
import "./leftSide.scss";
import parse from 'html-react-parser';


const CourseBody = () => {
  const [isModuleOpen, setModuleOpen] = useState(true);
  const [isLearningObjectOpen, setisLearningObjectOpen] = useState(false);
  const [isCourseOpen, setisCourseOpen] = useState(0);
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [courseId, setCourseId] = useState(getPara("my-course"));

  /////////////////////
  // Left sidebar functions
  const [cMat, setCMat] = useState(1);

  console.log("Course id :: " + courseId);

  const toggleCourseMaterial = () => {
    setCMat(1);
    if (cMat === 1) {
      setCMat(-1);
    } else {
    }
  };

  const [sideAuthId, setSideAuthId] = useState();
  const [isSideChecked, setIsSideChecked] = useState(false);
  const [isSideLoaded, setIsSideLoaded] = useState(false);
  const [isSideChapterLoaded, setIsSideChapterLoaded] = useState(false);
  const [sideChapters, setSideChapters] = useState([]);
  const [exams, setExams] = useState([]);
  const [paramhandler, setparamhandler] = useState("")
  console.log(exams);
  const [course, setCourse] = useState([]);
  const getAuth = () => {
    const cookies = new Cookies();
    const uid = cookies.get("token");
    setSideAuthId(uid);
  };
  if (!isSideChecked) {
    getAuth();
    setIsSideChecked(true);
  }

  const getSideMyCourses = async () => {
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
    setIsSideLoaded(true);
    try {
      if (rsp.data.status === "Success") {
        setCourse(rsp.data.result);
        console.warn(":: sidebar ::");
        console.log(rsp.data.result)
      } else {
      }
    } catch (error) { }
  };
  const getCourseExams = async () => {
    const formData = new FormData();
    formData.append("action", "true");
    formData.append("course_id", courseId);
    const rsp = await axios.post(
      CONST.API_SERVER + "/course/my-courses/exams",
      formData,
      {
        "Content-Type": "text/plain",
      }
    );
    setIsSideLoaded(true);
    try {
      if (rsp.data.status === "Success") {
        setExams(rsp.data.result);
      } else {
      }
    } catch (error) { }
  };


  useEffect(() => {
    getSideChapters();
  }, [])
  

  const getSideChapters = async () => {
    const formData = new FormData();
    formData.append("action", "true");
    formData.append("course_id", courseId);
    const rsp = await axios.post(
      CONST.API_SERVER + "/course/my-courses-cid/chapters",
      formData,
      {
        "Content-Type": "text/plain",
      }
    );
    setIsSideLoaded(true);
    try {
      if (rsp.data.status === "Success") {
        setSideChapters(rsp.data.result);
      } else {
      }
    } catch (error) { }
  };

  if (!isSideLoaded) {
    getSideMyCourses();
    getCourseExams();
    setIsSideLoaded(true);
  }
  if (!isSideChapterLoaded) {
    getCourseExams();
    setIsSideChapterLoaded(true);
  }
  /////////////////////

  return (
    <>
      {isSideLoaded ? (
        course.length > 0 ? (
          <div className="left-sidebar-my-course col-md-3">
            <div className="thumb">
              <img src={CONST.ADMIN_SERVER + "/images/logo.png"} alt="" />
            </div>
            <p className="partner-name fs-19 bold"> {course[0].title} </p>
            <p className="partner-name fs-19"> {CONST.APPNAME} </p>

            <div className="course-material">
              <h3
                className="course-material-title"
                onClick={() => toggleCourseMaterial()}
              >
                <i
                  className={
                    cMat === 1 ? "icofont-curved-down" : "icofont-curved-right"
                  }
                >

                </i>
                Course Material
              </h3>
              <ul
                className={
                  cMat === 1
                    ? "course-material-content course-material-content-active"
                    : "course-material-content"
                }
              >
                {course.length > 0
                  ? course.map((exam, i) => (
                    <li>

                      <a
                        href={
                          "/my-course/" +
                          courseId +
                          "/" +
                          getPara(courseId)
                        }
                        onClick={() => {
                          setIsLoaded(false);
                        }}
                      >

                        <i className="fa-solid fa-circle-dot"></i>
                        {exam.title}
                      </a>
                    </li>
                  ))
                  : null}
                <hr />
                {exams.length > 0
                  ? exams.map((exam, i) => (
                    
                    
                    <li>
                      
                      <a
                        href={ 
                          "/my-course/" +
                          courseId +
                          "/" +
                          getPara(courseId) +
                          "/chapter/" +

                          exam.id
                         
                          
                          
                        }
                        onClick={() => {
                          setIsLoaded(false);
                        }}
                      >

                        <i className="fa-solid fa-circle-dot"></i>
                        {exam.title}
                      </a>
                    </li>
                  ))
                  : null}
              </ul>
            </div>

            <a href="/quiz" className="bold text-center">
              Exam
            </a>
            {/* <h3 className="bold"> Notes </h3>
            <h3 className="bold"> Discussion Forums </h3>
            <h3 className="bold"> Messages  </h3>
            <h3 className="bold"> Course Info  </h3> */}
            <a href={"/my-course/" + courseId + "/download/certificate/"}>

              <h3 className="bold"> Download Certificate </h3>
            </a>
          </div>
        ) : null
      ) : null}

      <div className="col-md-6 course-main-body">
        {showMessage ? <div className="card p-5">{message}</div> : null}
        <div className="resume-box">
          {/* <p className="fs-16">Continue your progress</p> */}

          <div className="flex-box row">
            <div className="col-md-8">
              
              {/* <a href={""} className="bold">
              

                Module 1 - Setting up Your Development Environment: Git and
                Node: Objectives and Outcomes
              </a>
               */}
            </div>
            <div className="col-md-3">
              {/* <a className="btn btn"> Resume </a> */}
            </div>
          </div>
        </div>
        

        

        {isSideChapterLoaded && sideChapters.length > 0
          ? sideChapters.map((chapter, ind) => {
            return (
              <LoadMaterial
                courseid={getPara("my-course")}
                chapter={chapter.title}
                ext={course}
                isOpend={ind === 0 ? true : false}
              />
            );
          })
          : null}
          <br />
      <div className="suggestion-course-area row">
          <div className="col-md-1">
            <i class="icofont-info-circle"></i>
          </div>
          <div className="col-md-10">
            Like this course? Become an expert by joining the
            <a>Full-Stack Web Development with React Specialization.</a>
          </div>
          <div className="col-md-1">
            <i class="icofont-close-line"></i>
          </div>
        </div>
      
      </div>
    </>
  );
};

const LoadMaterial = ({
  courseid,
  chapter: mychapter,
  ext,
  isOpend: isOpened,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [course, setCourse] = useState([]);
  const [isModuleOpen, setModuleOpen] = useState(isOpened);
  const [isLearningObjectOpen, setisLearningObjectOpen] = useState(false);
  const [isCourseOpen, setisCourseOpen] = useState(0);

  const getSideMyCourses = async () => {
    const formData = new FormData();
    formData.append("action", "true");
    formData.append("course_id", courseid);
    formData.append("chapter", mychapter);

   

    const rsp = await axios.post(
      CONST.API_SERVER + "/course/my-courses-content",
      formData,
      {
        "Content-Type": "text/plain",
      }
    );
    setIsLoaded(true);
    try {
      if (rsp.data.status === "Success") {
        setCourse(rsp.data.result);
      
      } else {
      }
    } catch (error) { }
  };

  const makeInHour = (secs) => {
    if (secs >= 3600) {
      var hrs = (secs / 3600).toFixed(0);
      var mins = ((secs % 3600) / 60).toFixed(0);

      if (mins < 10) {
        return "" + hrs + ":0" + mins + " hrs";
      } else {
        return "" + hrs + ":" + mins + " hrs";
      }
    } else {
      var mins = (secs / 60).toFixed(0);
      if (mins < 10) {
        return "0" + ":0" + mins + " hrs";
      } else {
        return "0" + ":" + mins + " hrs";
      }
    }
  };

  if (!isLoaded) {
    getSideMyCourses();
  }
  return (
    <>
      {isLoaded && course.length > 0 ? (
        <div className="course-module row">
          <div className="col-md-12 row">
            <div className="col-md-1">
              <i
                className={
                  isModuleOpen ? "icofont-curved-down" : "icofont-curved-right"
                }
              ></i>
            </div>
            <div className="col-md-10">
              <h3
                onClick={() =>
                  isModuleOpen ? setModuleOpen(false) : setModuleOpen(true)
                }
              >

                {mychapter} &nbsp; &nbsp; <b> {ext[0].title} </b>
              </h3>
            </div>

            <div
              className={
                isModuleOpen
                  ? "module-content-active module-content"
                  : "module-content"
              }
            >
              <div className="col-md-12 row total-time-duration-left-logs">
                <div className="col-md-4">

                  <i class="icofont-play"></i> 3 hr 48 mins left
                </div>
                <div className="col-md-4">

                  <i className="icofont-book"></i> 2h 50m of readings left
                </div>
                <div className="col-md-4">

                  <i class="icofont-list"></i> 1 graded assignment left
                </div>
              </div>
              <div className="col-md-12">
                <p className="fs-19">
               {parse(ext[0].description)}
                </p>

                <div
                  className={
                    isLearningObjectOpen
                      ? "learning-objects learning-objects-active"
                      : "learning-objects"
                  }
                >
                  <p className="fs-19 bold"> Learning Objectives </p>
                  <hr />
                  {/* <ul>
                    <li>
                      Express the general characteristics of JavaScript
                      frameworks and libraries
                    </li>
                    <li>Create a new project using React </li>
                    <li>
                      Create React components within your React application
                    </li>
                    <li>
                      Express what is meant by full-stack web development
                    </li>
                  </ul> */}
                </div>
                <button
                  className="bg-transparent b0 h-pointer color-primary"
                  onClick={() =>
                    isLearningObjectOpen
                      ? setisLearningObjectOpen(false)
                      : setisLearningObjectOpen(true)
                  }
                >

                  <i
                    className={
                      isLearningObjectOpen
                        ? "icofont-curved-up fs-19"
                        : "icofont-curved-down fs-19"
                    }
                  ></i>
                  {isLearningObjectOpen ? "Hide" : "Show"} Learning Objectives
                </button>
              </div>

              {/* Chapters  */}

              {/* chapter repeat  */}
              <div className="row col-md-12 chapters">
                <div
                  className="chapter-card col-md-12"
                  style={{ marginTop: "20px" }}
                >
                  <div className={"chapter-content row chapter-content-active"}>
                    {course.map((cour, ind) => (
                      <div className="row col-md-12 course-inner-wrapper">
                        <div className="col-md-1"> </div>
                        <div className="col-md-1">

                          <i className="icofont-play"></i>
                        </div>
                        <div className="col-md-10">

                          <a
                            href={
                              "/my-course/play/" +
                              courseid +
                              "/cnt/" +
                              cour.id +
                              "/material/" +
                              cour.title +
                              "/chapter/" +
                              cour.chapter
                            }
                          >

                            {cour.title}
                          </a>
                          <br />
                          <small>

                            {cour.type} - {makeInHour(cour.reading_time * 60)}
                            min
                          </small>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default CourseBody;
