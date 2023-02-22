import axios from "axios";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { CONST } from "../constant";
import Footer from "../widgets/Footer";
import Header from "../widgets/Header";
import Sidebar from "../widgets/Sidebar";

const ExamAdd = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [course, setCourse] = useState([]);

  const [title, setTitle] = useState();
  const [fullMarks, setFullMarks] = useState();
  const [questionCount, setQuestionCount] = useState();
  const [courseId, setCourseId] = useState();
  const [durationTime, setDurationTime] = useState(0);
  const [etype, setEtype] = useState("");

  function changeTime(e) {
    if (e >= 60) {
      var tim = (e / 60).toFixed(0);
      var min = (e % 60).toFixed(0);
      if (min < 10) {
        min = "0" + min;
        document.getElementById("hrs").innerText =
          `` + tim + ":" + min + " hrs";
      } else {
        document.getElementById("hrs").innerText =
          `` + tim + ":" + min + " hrs";
      }
    } else {
      if (e < 10) {
        document.getElementById("hrs").innerText = "0:0" + e + " hrs";
      } else {
        document.getElementById("hrs").innerText = "0:" + e + " hrs";
      }
    }
  }

  async function getCourse() {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("action", "getCourse");
    const rsp = await axios.post(
      CONST.API_SERVER + "/admin/course/get",
      formData,
      {
        "Content-Type": "text/plain",
      }
    );
    setIsLoaded(true);
    try {
      if (rsp.data.message.length > 0 && rsp.data.message === "Success") {
        setCourse(rsp.data.result);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (error) { }
  }

  if (isLoaded === false) {
    setIsLoaded(true);
    getCourse();
  }

  async function submitForm() {
    setIsLoading(true);
    console.log(title, fullMarks, durationTime, courseId, questionCount);
    const formData = new FormData();
    formData.append("action", "addExam");
    formData.append("title", title);
    formData.append("full_marks", fullMarks);
    formData.append("duration", durationTime);
    formData.append("course_id", courseId);
    formData.append("etype", etype);
    formData.append("question_count", questionCount);

    const rsp = await axios.post(
      CONST.API_SERVER + "/admin/exam/add",
      formData,
      {
        "Content-Type": "text/plain",
      }
    );
    console.log("Got data " + rsp.data.status);
    if (rsp.data.status === "Success") {
      window.location.href = "/exams/all";
    }
    setIsLoaded(false);
  }

  return (
    <>
    <Helmet>
      <title>Add Exam</title>
    </Helmet>
      {isLoading ? <div className="LoaderClass"></div> : null}

      <Header />
      <div className="page-wrapper default-version">
        <Sidebar act={9} />

        <div class="body-wrapper">
          <div class="bodywrapper__inner">
            <div class="row align-items-center mb-30 justify-content-between">
              <div class="col-lg-6 col-sm-6">
                <h6 class="page-title"> Add New Exam </h6>
              </div>
            </div>
            <div class="row">
              <div class="col-lg-12">
                <div class="card b-radius--10">
                  <div class="card-body p-10">
                    <div className="row">
                      <div className="col-md-12">
                        <p>Enter exam name/title </p>
                        <input
                          type="text"
                          name=""
                          id=""
                          className="form-control"
                          required
                          onChange={(e) => {
                            setTitle(e.target.value);
                          }}
                        />
                      </div>

                      <div className="col-md-4">
                        <p>Select course </p>
                        <span id="select_course"></span>
                        <select
                          name=""
                          id=""
                          className="form-control"
                          onChange={(e) => {
                            setCourseId(e.target.value);
                          }}
                        >
                          <option value="" disabled selected>
                            Select one{" "}
                          </option>
                          {course.map((ctx, i) => (
                            <option value={ctx.id}> {ctx.title} </option>
                          ))}
                        </select>
                      </div>

                      <div className="col-md-4">
                        <p>full marks </p>
                        <input
                          type="number"
                          name=""
                          id=""
                          className="form-control"
                          required
                          onChange={(e) => {
                            setFullMarks(e.target.value);
                          }}
                        />
                      </div>
                      <div className="col-md-4">
                        <p>Exam count </p>
                        <input
                          type="number"
                          name=""
                          id=""
                          className="form-control"
                          required
                          onChange={(e) => {
                            setQuestionCount(e.target.value);
                          }}
                        />
                      </div>
                      <div className="col-md-6 row">
                        <div className="col-md-12">
                          <p>Estimated duration time (in mins ) </p>
                        </div>
                        <div className="col-md-6">
                          <input
                            type="number"
                            className="form-control"
                            onChange={(e) => {
                              changeTime(e.target.value);
                              setDurationTime(e.target.value);
                            }}
                            defaultValue={0}
                          />
                        </div>
                        <div className="col-md-6">
                          <b id="hrs">0:00 hrs.</b>
                        </div>
                      </div>
                   
                      <div className="col-md-4">
  <p>Select course:</p>
  <span id="select_course"></span>
  <select
    name="exam-type"
    className="form-control"
    onChange={(e) => {
      
      setEtype(e.target.value);
    }}
  >
    <option value="">Select one</option>
    <option value="QUIZ">QUIZ</option>
    <option value="ASSESSMENT">ASSESSMENT</option>
  </select>
  <br />
</div>


                      <div className="col-md-12 ">
                        <center>
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              submitForm();
                            }}
                          >
                            Add Exam
                          </button>
                        </center>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ExamAdd;
