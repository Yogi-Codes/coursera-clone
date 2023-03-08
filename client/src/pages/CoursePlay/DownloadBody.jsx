import { Link } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { CONST, getPara, getParaByPosition } from '../../constants'
import Cookies from 'universal-cookie'
import axios from 'axios'
import Loader from '../../Loader'
import "./style.scss"
 var pro;


const DownloadBody = () => {
    const [isModuleOpen, setModuleOpen] = useState(true);
    const [isLearningObjectOpen, setisLearningObjectOpen] = useState(false);
    const [isCourseOpen, setisCourseOpen] = useState(0);
    const [message, setMessage] = useState('')
    const [showMessage, setShowMessage] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false)
    const [courseId, setCourseId] = useState(getPara('my-course'))
    const [totalProgress, setTProgress] = useState(0)
    const [certificate, setCertificate] = useState([])
    const [progressed, setProgressed] = useState(0)
    const [progresstotal, setProgresstotal] = useState(1)
    const [prog, setProg] = useState(2)
  

    /////////////////////
    // Left sidebar functions 
    const [cMat, setCMat] = useState(1);
    const toggleCourseMaterial = () => {
        setCMat(1);
        if (cMat === 1) {
            setCMat(-1);
        } else {

        }
    }
   
   //ANIK

   const progress = async () => {

   

   
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

        setProgressed(rsp.data.result)
        setProgresstotal(rsp.data.total_time*60)
        if(((rsp.data.result/(rsp.data.total_time*60))*100).toFixed(2)>99.5)
      {    

        pro =100;

        setProg(100.00)
      }
      else{
        pro = ((rsp.data.result/(rsp.data.total_time*60))*100).toFixed(2)
        setProg(((rsp.data.result/(rsp.data.total_time*60))*100).toFixed(2))

      }
        
        
       

      } else {
        console.warn("Problem detected ")
      }
    } catch (error) {
      console.log("Error caught " + error)
    }
     setPro();   
   }
   useEffect(() => {
     progress()
   }, [])



   const setPro = async () => {

    const cookies = new Cookies();
    const formData5 = new FormData();
formData5.append('action', 'true');
formData5.append('course_id', courseId);
formData5.append('user_id', cookies.get("token"))
formData5.append('progress',pro);


    const rsp = await axios.post(
        CONST.API_SERVER + "/admin/course/content_transaction/progress",
        formData5,
        { "Content-Type": "text/plain" });

        if(rsp.data.status==="success"){
            

            console.log("progress saved");
            
            }


         }





         useEffect(() => {
            const interval = setInterval(() => {
            
              setPro();
              console.log("chal");
             
              
            }, 5000);
        
            return () => clearInterval(interval);
          }, []);


      
  //ANIK
    
    

    const [sideAuthId, setSideAuthId] = useState()
    const [isSideChecked, setIsSideChecked] = useState(false)
    const [isSideLoaded, setIsSideLoaded] = useState(false)
    const [isSideChapterLoaded, setIsSideChapterLoaded] = useState(false)
    const [sideChapters, setSideChapters] = useState([])
    const [course, setCourse] = useState([])
    const getAuth = () => {
        const cookies = new Cookies();
        const uid = cookies.get('token');
        setSideAuthId(uid)
    }
    if (!isSideChecked) {
        getAuth();
        setIsSideChecked(true)
    }


    const getSideMyCourses = async () => {
        const formData = new FormData();
        formData.append('action', 'true');
        formData.append('course_id', courseId);
        const rsp = await axios.post(CONST.API_SERVER + '/course/my-courses-cid', formData, {
            'Content-Type': 'text/plain',
        });
        setIsSideLoaded(true)
        try {
            if (rsp.data.status === 'Success') {
                setCourse(rsp.data.result)

            } else {

            }
        } catch (error) {

        }

        const cookies = new Cookies();
        const uid = cookies.get('token');

        const formData2 = new FormData();
        formData2.append('action', 'true');
        formData2.append('course_id', courseId);
        formData2.append('user_id', uid);
        const rsp2 = await axios.post(CONST.API_SERVER + '/course/my-course/progress', formData2, {
            'Content-Type': 'text/plain',
        });
       console.log("heya");
       console.log(rsp2.data.result);
        setTProgress(rsp2.data.result[0].id)
        setCertificate(rsp2.data.result)
    }

    const getSideChapters = async () => {
        const formData = new FormData();
        formData.append('action', 'true');
        formData.append('course_id', courseId);
        const rsp = await axios.post(CONST.API_SERVER + '/course/my-courses-cid/chapters', formData, {
            'Content-Type': 'text/plain',
        });
        setIsSideLoaded(true)
        try {
            if (rsp.data.status === 'Success') {
                setSideChapters(rsp.data.result)
            } else {

            }
        } catch (error) {

        }
    }


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
            {isSideLoaded ?
                course.length > 0 ?
                    <div className="left-sidebar-my-course col-md-3">
                        <div className="thumb">
                            <img src={CONST.ADMIN_SERVER + "/images/logo.png"} alt="" />
                        </div>
                        <p className="partner-name fs-19 bold">  {course[0].title} </p>
                        <p className="partner-name fs-19">  {CONST.APPNAME} </p>

                        <div className="course-material">
                            <h3 className="course-material-title" onClick={() => toggleCourseMaterial()}>

                                <i className={cMat === 1 ? "icofont-curved-down" : "icofont-curved-right"} >  </i>  Course Material</h3>
                            <ul className={cMat === 1 ? 'course-material-content course-material-content-active' : 'course-material-content'}>
                                {sideChapters.length > 0 ? sideChapters.map((chapter, i) => <li> <a href={"/"} onClick={() => { setIsLoaded(false) }} > <i className="fa-solid fa-circle-dot"></i> {chapter.title}  </a> </li>) : null}
                            </ul>
                        </div>
                        {/* 
                        <h3 className="bold"> Grades </h3>
                        <h3 className="bold"> Notes </h3> */}
                        {/* <h3 className="bold"> Discussion Forums </h3>
                        <h3 className="bold"> Messages  </h3> */}
                        <a href={'/my-course/' + courseId + "/download/certificate/"}> <h3 className="bold"> Download Certificate  </h3> </a>
                    </div>
                    : null : null}

            <div className='col-md-6 course-main-body'>
                {showMessage ? <div className="card p-5">
                    {message}
                </div> : null}

                {course.length > 0 ? <div className="suggestion-course-area row">
                    <div className="col-md-1"><i class="icofont-info-circle"></i> </div>
                    <div className="col-md-10">Like this course? Give a review on<a> {course[0].title} </a> </div>
                    <div className="col-md-1"><i class="icofont-close-line"></i></div>
                </div> : null}

                {certificate.length > 0 ?
                    <div>
                        <br /><br />
                        
                        {/* <h1> Course {certificate[0].progress}% completed! </h1> */}
                        <h1> Course {prog}% completed! </h1>
                        {parseInt(certificate[0].progress) > 60 ? certificate[0].certificate_uploaded === "Yes" ? <div>
                            <img src={CONST.ADMIN_SERVER + "/uploads/certificates/" + certificate[0].certificate} className="certificate-image" />
                            <br />
                            <center>
                                <a className='btn btn-primary' href={CONST.ADMIN_SERVER + "/uploads/certificates/" + certificate[0].certificate} download target="_blank">Download Certificate</a>
                            </center>
                        </div> : <div>Waiting for certificate allocation!</div> : <div>Course id not completed!</div>}
                        <br /><br />
                    </div>
                    : null}

            </div>

        </>
    )
}


export default DownloadBody