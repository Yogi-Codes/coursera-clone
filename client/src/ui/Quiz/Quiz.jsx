import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Container, Form, Navbar } from "react-bootstrap";
import Cookies from "universal-cookie";
import { CONST, getPara } from "../../constants"


const Quiz = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isWeekLoaded, setWeekIsLoaded] = useState(false);
  const [exams, setExam] = useState([]);
  const [authId, setAuthId] = useState();
  const [file, setFile] = useState();
  const [qId, setQid] = useState(0);
  const [ans, setAns] = useState("");
  const [Eid,setEid] = useState(0);

  const getAuth = () => {
    const cookies = new Cookies();
    const uid = cookies.get("token");
    setAuthId(uid);
  };

  try {
    setQid(getPara("q_id"));
  } catch (error) {
    // console.log(error);
  }

  async function getExam() {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("action", "getQuestions");
    formData.append("id", getPara("exam"));
    formData.append("q_id", qId);
    const rsp = await axios.post(
      CONST.API_SERVER + "/admin/exam/question",
      formData,
      {
        "Content-Type": "text/plain",
      }
    );
    // console.log("Got data " + rsp.data.result);
    setIsLoaded(true);
    try {
      if (rsp.data.message.length > 0 && rsp.data.message === "Success") {
        // const ttl = rsp.data.result[0]["title"];
        // console.log("ttl" + ttl);
        setExam(rsp.data.result);
        console.log(rsp.data.result);//ANIK added
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (error) {}
  }
  // console.log(exam);
  if (isLoaded === false) {
    // setWeekIsLoaded(true);
    getExam();
    getAuth();
    setIsLoaded(true);
  }


  useEffect(() => {
    
    getExam();
  
   

    
    return () => clearInterval();
  }, [qId]);


  useEffect(() => {
    
    getExam();
  
   

    
    return () => clearInterval();
  }, []);


  async function sendAns(ev) {
    ev.preventDefault();


    const formData = new FormData();
    formData.append("action", "getQuestions");
    formData.append("question", exams[0].question);
    formData.append("answer", ans);
    formData.append("correct", exams[0].correct);
    formData.append("marks", exams[0].marks);
    formData.append("que_id", exams[0].id);
    formData.append("exam_id", getPara("exam"));
    formData.append("course_id", getPara("my-course"));
    formData.append("user_id", authId);
    const rsp = axios.post(CONST.API_SERVER + "/exam/send-ans", formData, {
      "Content-Type": "text/plain",
    });
    // setIsSideLoaded(true);

    // console.log(rsp.data);
    try {

     
      if (rsp.data.status === "Success") {
        // setExam(rsp.data.result);
        // console.log("hit");
       
      } else {
      }
    } catch (error) {}

  setQid(qId+1 )

  }
  async function sendPdf(ev) {
    const formData = new FormData();
    formData.append("action", "getQuestions");
    formData.append("exam_id", getPara("exam"));
    formData.append("course_id", getPara("my-course"));
    formData.append("user_id", authId);
    formData.append("file", file);
    const rsp = axios.post(CONST.API_SERVER + "/exam/assessment/send", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("done");
  }
  


  let i = 1;

  return (
    <>
      {isLoading ? (
        <div className="LoaderClass">
        </div>
      ) : ( 
        <div className="container pt-5 mt-5">
        <Navbar fixed="top" className="bg-white border-bottom">
            <Container>
              <Navbar.Brand href="#home">
                {" "}
                <i className="fa-solid fa-arrow-left"></i> back
              </Navbar.Brand>
             
            </Container>
          </Navbar>
      {(exams[0].etype === "QUIZ") ? (
          <form >

            {exams?.map((exam, index) => (
              <div key={exam.id}>
                <h5>
                  {(i = index + 1) + ". "} {exam.question}
                </h5>
                <div className="pl-3">
                  <div key={`reverse-radio`} className="mb-3">
                    
<Form.Check
  reverse
  label={exam.a}
  name="group1"
  type="radio"
  value="A"  // add the value attribute and set it to the corresponding answer option
  onChange={(e) => setAns("A")}
/>
<Form.Check
  reverse
  label={exam.b}
  name="group1"
  type="radio"
  value="B"  // add the value attribute and set it to the corresponding answer option
  onChange={(e) => setAns("B")}
/>
<Form.Check
  reverse
  label={exam.c}
  name="group1"
  type="radio"
  value="C"  // add the value attribute and set it to the corresponding answer option
  onChange={(e) => setAns("C")}
/>
<Form.Check
  reverse
  label={exam.d}
  name="group1"
  type="radio"
  value="D"  // add the value attribute and set it to the corresponding answer option
  onChange={(e) => setAns("D")}
/>
                     
                  </div>
                </div>
              
              </div>
            ))}
             
            <Button type="submit"  onClick={sendAns}  >Next</Button>
          </form>
      ) : (
      <div >
        <h1>{exams[0].question}</h1>

               
      <form action="/" onSubmit={sendPdf}>
          
      <label htmlFor="myFile" style={{
  backgroundColor: "#0056D2",
  color: "#FFFFFF",
  padding: "10px 20px",
  borderRadius: "4px",
  cursor: "pointer"
}}>
  Choose File
</label>
<input 
  type="file" 
  id="myFile" 
  accept=".pdf" 
  name="filename" 
  onChange={(e) => {
    setFile(e.target.files[0]);
  }}
  style={{
    display: "none"
  }}
/>
<hr />
     

<button type="submit" style={{
  backgroundColor: "#0056D2",
  color: "#FFFFFF",
  padding: "10px 20px",
  borderRadius: "4px",
  border: "none",
  cursor: "pointer"
}}>
  Submit
</button>

      </form>



        </div>
        )}
      </div>
      )}
    </>
  );
};



export default Quiz;
