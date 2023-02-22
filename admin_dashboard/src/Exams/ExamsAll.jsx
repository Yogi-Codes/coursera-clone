import axios from "axios";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { CONST } from "../constant";
import Footer from "../widgets/Footer";
import Header from "../widgets/Header";
import Sidebar from "../widgets/Sidebar";
import Cookies from "universal-cookie";

const ExamsAll = () => {
  const [isLoading, setIsLoading] = useState(true);
  // const [courses, setCourses] = useState([]);
  const [exams, setExams] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [exam, setExam] = useState();
  const [pdf,setPdf] = useState();
  const [name, setname] = useState();
  const [namev, setnamev] = useState();






  async function approvepdf(par) {
  
    const cookies = new Cookies();

    const formData = new FormData();
    formData.append("action", "getQuestions");
    formData.append("exam_id", par.id);
    formData.append("course_id", par.course_id);
    formData.append("user_id", cookies.get("token"));
    const rsp = axios.post(CONST.API_SERVER + "/exam/assessment/approve", formData, {
      "Content-Type": "text/plain",
    });
  

  }
  async function getpdf(par) {
  
    const cookies = new Cookies();

    const formData = new FormData();
    formData.append("action", "getQuestions");
    formData.append("exam_id", par.id);
    formData.append("course_id", par.course_id);
    formData.append("user_id", cookies.get("token"));
    const rsp = axios.post(CONST.API_SERVER + "/exam/assessment/get", formData, {
      "Content-Type": "text/plain",
    });
  

    console.log(par.id);
    console.log(par.course_id);
    console.log(cookies.get("token"));
    rsp.then(function(result) {
      
      setname(result.data.result) 
      setnamev(result.data.result)
      console.log(name);

   





   })
    console.log("yeah");

 

  }

  async function getCourses() {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("action", "getCategory");
    const rsp = await axios.post(
      CONST.API_SERVER + "/admin/exams/get",
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
        setExams(rsp.data.result);
        setIsLoading(false);
        document.getElementById("select_category").innerHTML = `
                
                `;
      } else {
        setIsLoading(false);
      }
    } catch (error) { }
  }

  if (isLoaded === false) {
    setIsLoaded(true);
    getCourses();
  }

  const deleteExam = async (id) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("action", "deleteExam");
    formData.append("id", id);
    const rsp = await axios.post(
      CONST.API_SERVER + "/admin/exam/delete",
      formData,
      {
        "Content-Type": "text/plain",
      }
    );
    // console.log("Got data " + rsp.data.result);
    setIsLoaded(true);
    try {
      if (rsp.data.status.length > 0 && rsp.data.status === "Success") {
        setIsLoading(false);
        setIsLoaded(false);
      } else {
        setIsLoading(false);
      }
    } catch (error) { }
  };

  return (
    <>
      <Helmet>
        <title>Manage Exams</title>
      </Helmet>
      {isLoading ? <div className="LoaderClass"></div> : null}
      <Header />
      <div className="page-wrapper default-version">
        <Sidebar act={9} />

        <div className="body-wrapper">
          <div className="bodywrapper__inner">
            <div className="row align-items-center mb-30 justify-content-between">
              <div className="col-lg-6 col-sm-6">
                <h6 className="page-title"> All Quizes </h6>
              </div>
              <div className="col-lg-6 col-sm-6">
                <a href={"/exam/new"} className="btn btn--primary float-right">
                  Add New exam
                </a>
              </div>
            </div>
            <div class="row">
              <div class="col-lg-12">
                <div class="card b-radius--10">
                  <div class="card-body p-10">
                    <div className="row">
                      <table className="table">
                        <thead>
                          <tr>
                            <th> SL </th>
                            <th> quiz name </th>
                            <th> Total questions </th>
                            <th> Course name </th>
                            {/* <th> Author </th> */}
                            <th> Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {exams.map((exam, i) => (
                            <tr>
                              <td> {i + 1} </td>
                              <td>{exam.title}</td>
                              <td> {exam.question_count} </td>
                              <td> {exam.category} </td>
                              {/* <td> {course.uid} </td> */}
                              <td style={{justifyContent:"space-around" , display:"flex"}} >
                               {exam.etype==="ASSESSMENT"?<span  ><a style={{padding:"0.1vw"}} > 
                                  <button className="btn btn-primary" onClick={()=>{
                                    getpdf(exam)
                                  }} >
                                    preview
                                  
                                  </button>
                                </a><a  style={{padding:"0.1vw"}} > 
                                  <button className="btn btn-primary" onClick={()=>{
                                    approvepdf(exam)
                                  }} >
                                    approve
                                  
                                  </button>
                                </a> </span>:null}



                                <a href={"/exams/question-add/" + exam.id}>
                                  <button className="btn btn-primary">
                                    Add Question
                                  </button>
                                </a>
                                &nbsp;
                                <button
                                  className="btn btn-danger"
                                  onClick={() => {
                                    deleteExam(exam.id);
                                  }}
                                >
                                  Delete exam
                                </button>{" "}
                              </td>
                              
                            </tr>
                            
                          ))}
                        </tbody>
                      </table>
                      <iframe title='Pdf'  src={CONST.ADMIN_SERVER+ "/public/uploads/assessment/" + name  + "#toolbar=0"}
                    style={{ width: "100%", aspectRatio: "4/3" }}
                   
                    ></iframe>
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

export default ExamsAll;
