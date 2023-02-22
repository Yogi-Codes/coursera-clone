import axios from "axios";
import React, { useState } from "react";
import Cookies from "universal-cookie";
import { CONST, getPara } from "../../constants";
import Loader from "../../Loader";
import "./bodyStyle.scss";
import "./leftSide.scss";

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
  const [course, setCourse] = useState([]);
  const [myChapter, setChapter] = useState(decodeURI(getPara("chapter")));
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
      } else {
      }
    } catch (error) {}
  };

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
    } catch (error) {}
  };

  if (!isSideLoaded) {
    getSideMyCourses();
    setIsSideLoaded(true);
  }
  if (!isSideChapterLoaded) {
    getSideChapters();
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
                  {" "}
                </i>{" "}
                Course Material
              </h3>
              <ul
                className={
                  cMat === 1
                    ? "course-material-content course-material-content-active"
                    : "course-material-content"
                }
              >
                {sideChapters.length > 0
                  ? sideChapters.map((chapter, i) => (
                      <li>
                        {" "}
                          <a
                          href={
                            "/my-course/" +
                            courseId +
                            "/" +
                            getPara(courseId) +
                            "/chapter/" +
                            chapter.title
                          }
                          onClick={() => {
                            setIsLoaded(false);
                            setChapter(chapter.title);
                          }}
                        >
                          {" "}
                          <i className="fa-solid fa-circle-dot"></i>{" "}
                          {chapter.title}{" "}
                        </a>{" "}
                      </li>
                    ))
                  : null}
              </ul>
            </div>

            <h3 className="bold"> Grades </h3>
            <h3 className="bold"> Notes </h3>
            <h3 className="bold"> Discussion Forums </h3>
            <h3 className="bold"> Messages </h3>
            <h3 className="bold"> Course Info </h3>
          </div>
        ) : null
      ) : null}

      <div className="col-md-6 course-main-body">
        {/* {showMessage ? <div className="card p-5">{message}</div> : null} */}
        <div className="">
          {/* <p className="fs-16">Continue your progress</p> */}

          <div className="flex-box row">
            <div className="col-md-8">
              {/* <i class="icofont-book"></i> */}
              {/* <a href={""} className="bold">
                {" "}
                Module 1 - Setting up Your Development Environment: Git and
                Node: Objectives and Outcomes{" "}
              </a> */}
            </div>
            {/* <div className="col-md-3">
              <a className="btn btn"> Resume </a> */}
            {/* </div> */}
          </div>
        </div>

        <div className="">
          {/* <div className="col-md-1"> */}
            {/* <i class="icofont-info-circle"></i>{" "} */}
          </div>
          {/* <div className="col-md-10">
            Like this course? Become an expert by joining the
            <a>Full-Stack Web Development with React Specialization.</a>{" "}
          </div> */}
          {/* <div className="col-md-1">
            <i class="icofont-close-line"></i>
          </div> */}
        {/* </div> */}

        {isSideChapterLoaded && course.length > 0 ? (
          <LoadMaterial
            courseid={decodeURI(getPara("my-course"))}
            chapter={myChapter}
            ext={course}
            isOpend={true}
          />
        ) : null}
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
  const [ch, setCH] = useState(mychapter);
  const [tCH, setTCH] = useState("");
  const [isCatLoaded, setIsCatLoaded] = useState(false);

  const getSideMyCourses = async () => {
    const formData = new FormData();
    formData.append("action", "true");
    formData.append("course_id", courseid);
    formData.append("chapter", ch);

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
    } catch (error) {}
  };

  if (!isLoaded) {
    console.log("CourseBody ", course);
    // setTCH(ch)
    getSideMyCourses();
  }
  if (tCH !== mychapter) {
    setTCH(mychapter);
    // alert("Content changed")
    console.log("New content :: " + mychapter);
    setIsLoaded(false);
    getSideMyCourses();
  }

  return (
    <>
      {isLoaded && ext.length > 0 ? (
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
                {" "}
                {mychapter} &nbsp; &nbsp; <b> {ext[0].title} </b>
              </h3>{" "}
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
                  {" "}
                  <i class="icofont-play"></i> 3 hr 48 mins left
                </div>
                <div className="col-md-4">
                  {" "}
                  <i className="icofont-book"></i> 2h 50m of readings left
                </div>
                <div className="col-md-4">
                  {" "}
                  <i class="icofont-list"></i> 1 graded assignment left
                </div>
              </div>
              <div className="col-md-12">
                <p className="fs-19">
                  In this module we get a quick introduction to front-end
                  JavaScript frameworks and libraries, followed by an
                  introduction to React. We will also learn about React
                  components and JSX.
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
                  <ul>
                    <li>
                      Express the general characteristics of JavaScript
                      frameworks and libraries{" "}
                    </li>
                    <li>Create a new project using React </li>
                    <li>
                      Create React components within your React application{" "}
                    </li>
                    <li>
                      Express what is meant by full-stack web development{" "}
                    </li>
                    <li>
                      <a
                        href={
                          "/my-course/" +
                          courseid +
                          "/exam/" +
                          getPara("chapter")
                        }
                      >
                        Start Quiz
                      </a>
                    </li>
                  </ul>
                </div>
                <button
                  className="bg-transparent b0 h-pointer color-primary"
                  onClick={() =>
                    isLearningObjectOpen
                      ? setisLearningObjectOpen(false)
                      : setisLearningObjectOpen(true)
                  }
                >
                  {" "}
                  <i
                    className={
                      isLearningObjectOpen
                        ? "icofont-curved-up fs-19"
                        : "icofont-curved-down fs-19"
                    }
                  ></i>{" "}
                  {isLearningObjectOpen ? "Hide" : "Show"} Learning Objectives
                </button>
              </div>

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
                          {" "}
                          <i className="icofont-play"></i>{" "}
                        </div>
                        <div className="col-md-10">
                          {" "}
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
                            {" "}
                            {cour.title}{" "}
                          </a>{" "}
                          <br />
                          <small> {cour.type} - 10 min </small>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default CourseBody;
