import axios from "axios";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { CONST, getPara } from "../../constant";
import Footer from "../../widgets/Footer";
import Header from "../../widgets/Header";
import Sidebar from "../../widgets/Sidebar";
import "./style.scss";

const ExamQuestionEdit = () => {
  const [message, setMessage] = useState();
  const [showMessage, setShowMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [weeks, setWeeks] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isWeekLoaded, setWeekIsLoaded] = useState(false);
  const [content, setContent] = useState();
  const [duration, setDuration] = useState();
  const [oldQuestion, setOldQuestion] = useState([]);
  const [question, setQuestion] = useState("");
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [c, setC] = useState("");
  const [d, setD] = useState("");
  const [correct, setCorrect] = useState("");
  const [marks, setMarks] = useState("");
  const [etype, setEtype] = useState("QUIZ");

  async function getQuestions() {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("action", "getQuestion");
    formData.append("id", getPara("question-edit"));
    const rsp = await axios.post(
      CONST.API_SERVER + "/admin/exam/question/get-single",
      formData,
      {
        "Content-Type": "text/plain",
      }
    );
    // console.log("Got data " + rsp.data.result);
    setIsLoaded(true);
    try {
      if (rsp.data.message.length > 0 && rsp.data.message === "Success") {
        const ttl = rsp.data.result[0]["title"];
        // console.log("ttl" + ttl);
        setOldQuestion(rsp.data.result);
        setIsLoading(false);
        document.getElementById("select_category").innerHTML = `
                
                `;
      } else {
        setIsLoading(false);
      }
    } catch (error) {}
  }

  async function getWeeks() {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("action", "getCategory");
    formData.append("id", getPara("question-edit"));
    const rsp = await axios.post(
      CONST.API_SERVER + "/admin/course/weeks",
      formData,
      {
        "Content-Type": "text/plain",
      }
    );
    console.log("Got weeks " + rsp.data.result);
    setIsLoaded(true);
    try {
      if (rsp.data.message.length > 0 && rsp.data.message === "Success") {
        const ttl = rsp.data.result[0]["title"];
        // console.log("ttl" + ttl);
        setWeeks(rsp.data.result);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (error) {}
  }

  if (isLoaded === false) {
    setWeekIsLoaded(true);
    getQuestions();
  }

  if (isWeekLoaded === false) {
    setIsLoaded(true);
    getWeeks();
  }

  async function updateQuestion() {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("action", "updateQuestion");
    formData.append("id", getPara("question-edit"));
    formData.append("question", question ? question : oldQuestion[0].question);
    formData.append("a", a ? a : oldQuestion[0].a);
    formData.append("b", b ? b : oldQuestion[0].b);
    formData.append("c", c ? c : oldQuestion[0].c);
    formData.append("d", d ? d : oldQuestion[0].d);
    formData.append("correct", correct ? correct : oldQuestion[0].correct);
    formData.append("marks", marks ? marks : oldQuestion[0].marks);
    const rsp = await axios.post(
      CONST.API_SERVER + "/admin/question/update-question",
      formData,
      {
        "Content-Type": "text/plain",
      }
    );
    // console.log("Got weeks " + rsp.data.result);
    setIsLoaded(true);
    try {
      if (rsp.data.status.length > 0 && rsp.data.status === "Success") {
        window.location.href =
          "/exams/manage-questions/" + oldQuestion[0].exam_id;
      } else {
        setIsLoading(false);
      }
    } catch (error) {}
  }

  // const addWeek = async () => {
  //   if (title != undefined && duration != undefined) {
  //     setIsLoading(true);
  //     const formData = new FormData();
  //     formData.append("action", "getCategory");
  //     formData.append("id", getPara("weeks"));
  //     formData.append("title", title);
  //     formData.append("duration", duration);
  //     const rsp = await axios.post(
  //       CONST.API_SERVER + "/admin/weeks/add",
  //       formData,
  //       {
  //         "Content-Type": "text/plain",
  //       }
  //     );
  //     // console.log("Got data " + rsp.data.result);
  //     setIsLoaded(true);
  //     setWeekIsLoaded(true);
  //     try {
  //       if (rsp.data.message.length > 0 && rsp.data.message === "Success") {
  //         window.location.reload();
  //         // setIsLoading(false)
  //         // setIsLoaded(false)
  //         // setIsFormOpen(false)
  //       } else {
  //         setIsLoading(false);
  //       }
  //     } catch (error) {}
  //   } else {
  //     setMessage("Please fill all fields");
  //     setShowMessage(true);
  //   }
  // };

  if (showMessage) {
    setTimeout(() => {
      setShowMessage(false);
    }, 5000);
  }

  return (
    <>
    <Helmet>
      <title>Update question</title>
    </Helmet>
      {isLoading ? (
        <div className="LoaderClass"></div>
      ) : (
        <>
          <Header />
          <div className="page-wrapper default-version">
            <Sidebar act={3} />

            <div class="body-wrapper">
              <div class="bodywrapper__inner">
                <div class="row align-items-center mb-30 justify-content-between">
                  <div class="col-lg-6 col-sm-6">
                    {/* <h6 class="page-title">
                      {" "}
                      Course Contents ( <b>{courses[0].title}</b> ){" "}
                    </h6> */}
                  </div>
                  <div class="col-lg-6 col-sm-6">
                    <button
                      className="btn btn--warning float-right"
                      onClick={() => {
                        window.location.href =
                          "/exams/manage-questions/" + oldQuestion[0].exam_id;
                      }}
                      style={{ marginLeft: "30px" }}
                    >
                      {" "}
                      Go Back{" "}
                    </button>
                  </div>
                </div>
                {showMessage ? (
                  <div className="col-md-12 p-5">
                    <div className="card p-3"> {message} </div>
                  </div>
                ) : null}

                <div class="row">
                  <div class="col-lg-12">
                    <div class="card b-radius--10">
                      <div class="card-body p-10">
                        <div className="row">
                          <div className="col-md-12">
                            <p>Enter question name </p>
                            <input
                              type="text"
                              className="form-control"
                              onChange={(e) => {
                                setQuestion(e.target.value);
                              }}
                              defaultValue={oldQuestion[0].question}
                            />
                          </div>
                          <div className="col-md-12">
                            <p>Option one </p>
                            <input
                              type="text"
                              className="form-control"
                              onChange={(e) => {
                                setA(e.target.value);
                              }}
                              defaultValue={oldQuestion[0].a}
                            />
                          </div>
                          <div className="col-md-12">
                            <p>Option two </p>
                            <input
                              type="text"
                              className="form-control"
                              onChange={(e) => {
                                setB(e.target.value);
                              }}
                              defaultValue={oldQuestion[0].b}
                            />
                          </div>
                          <div className="col-md-12">
                            <p>Option three </p>
                            <input
                              type="text"
                              className="form-control"
                              onChange={(e) => {
                                setC(e.target.value);
                              }}
                              defaultValue={oldQuestion[0].c}
                            />
                          </div>
                          <div className="col-md-12">
                            <p>Option four </p>
                            <input
                              type="text"
                              className="form-control"
                              onChange={(e) => {
                                setD(e.target.value);
                              }}
                              defaultValue={oldQuestion[0].d}
                            />
                          </div>
                          <div className="col-md-4">
                            <p>Correct Option </p>
                            <input
                              type="text"
                              className="form-control"
                              onChange={(e) => {
                                setCorrect(e.target.value);
                              }}
                              defaultValue={oldQuestion[0].correct}
                            />
                          </div>
                          <div className="col-md-4">
                            <p>Marks </p>
                            <input
                              type="number"
                              className="form-control"
                              onChange={(e) => {
                                setMarks(e.target.value);
                              }}
                              defaultValue={oldQuestion[0].marks}
                            />       
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
                          <option value="">type</option>
                          <option value="QUIZ">QUIZ</option>
                          <option value="ASSESSMENT">ASSESSMENT</option>
                        </select>
                        <br />
                      </div>
                            
                          </div>
                          {/* {type === "Text Content" ? (
                            <div className="col-md-12">
                              <p>Enter Content </p>
                              <CKEditor
                                editor={ClassicEditor}
                                data=""
                                onReady={(editor) => {
                                  // console.log('Editor is ready to use!', editor);
                                }}
                                onChange={(event, editor) => {
                                  const data = editor.getData();
                                  setContent(data);
                                  // console.log({ event, editor, data });
                                  // console.log(data);
                                }}
                              />
                            </div>
                          ) : type === "Video Content" ? (
                            <div className="col-md-12">
                              <p>Select video file </p>
                              <input
                                type="file"
                                name=""
                                id=""
                                onChange={(e) => setContent(e.target.files[0])}
                                accept="video/*"
                                className="form-control"
                              />
                            </div>
                          ) : type === "YouTube Video" ? (
                            <div className="col-md-12">
                              {" "}
                              <p>Enter youtube video URL</p>
                              <input
                                type="url"
                                name=""
                                id=""
                                onChange={(e) => {
                                  setContent(e.target.value);
                                }}
                                className="form-control"
                              />
                            </div>
                          ) : type === "PDF Content" ? (
                            <div className="col-md-12">
                              {" "}
                              <p>Select PDF file </p>
                              <input
                                type="file"
                                name=""
                                id=""
                                onChange={(e) => setContent(e.target.files[0])}
                                className="form-control"
                                accept=".pdf"
                              />{" "}
                            </div>
                          ) : null} */}
                          <div className="col-md-12">
                            <br />
                            <center>
                              <button
                                className="btn btn--primary"
                                onClick={() => {
                                  if (
                                    oldQuestion !== undefined &&
                                    oldQuestion.length > 0
                                  ) {
                                    updateQuestion();
                                  }
                                }}
                              >
                                {" "}
                                Update Question{" "}
                              </button>
                            </center>
                            <br />
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
      )}
    </>
  );
};

export default ExamQuestionEdit;
