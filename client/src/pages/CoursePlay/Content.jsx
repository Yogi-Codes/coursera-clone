import React, { useState } from 'react'
import Sidebar from './Sidebar'
import { CONST, getPara, getYouTubePara } from '../../constants'
import axios from 'axios'
import { useEffect } from 'react'
import Cookies from 'universal-cookie';
import { Helmet } from 'react-helmet'
import YouTube from 'react-youtube';

const Content = ({ courseid: courseid, materialid: materialid }) => {


  const [isLoaded, setIsLoaded] = useState(false)
  const [course, setCourse] = useState([])
  const [isEmbeded, setEmbeded] = useState(false)
  const [readTime, setReadTime] = useState(0)
  const [donetime, setDonetime] = useState(0)
  const [message, setMessage] = useState('')
  const [donemin, setDonemin] = useState(0)
  const [showMessage, setShowMessage] = useState(false)
  const [trn, setTRN] = useState([])
  const [check, setCheck] = useState(false)
  const [key, setKey] = useState(0)
  
  
  const [courseTime, setCourseTime] = useState()
  const [isAssigned, setIsAssigned] = useState(false)

  const getSideMyCourses = async () => {
    const cookies = new Cookies();
    var uid = cookies.get('token');

    const formData = new FormData();
    formData.append('action', 'true');
    formData.append('course_id', courseid);
    formData.append('id', materialid);

    const rsp = await axios.post(CONST.API_SERVER + '/course/my-play-content', formData, {
      'Content-Type': 'text/plain',
    });



    setIsLoaded(true)
    try {
      if (rsp.data.status === 'Success') {

        setCourse(rsp.data.result)
        // console.log("Aspect reading time " + rsp.data.result[0].reading_time + " :::: " + rTime)

      } else {
        console.warn("Problem detected ")
      }
    } catch (error) {
      console.log("Error caught " + error)
    }
    const formData2 = new FormData();
    formData2.append('action', 'true');
    formData2.append('course_id', courseid);
    formData2.append('id', materialid);
    formData2.append('uid', uid);

    const rsp2 = await axios.post(CONST.API_SERVER + '/course/my-play-content/transactions', formData2, {
      'Content-Type': 'text/plain',
    });
    if (rsp2.data.result.length > 0) {
      setTRN(rsp2.data.result)
      // console.warn("Data Got 61")
    }
  }

  if (!isLoaded) {
    // console.log("CourseBody ", course)
    getSideMyCourses();
  }
  function loadResult(content) {
    if (!isEmbeded) {
      setEmbeded(true)
      setKey(1)
      setTimeout(() => {
        document.getElementById("result").innerHTML = `` + content
      }, 1000);
    }
  }


  const assignContent = async () => {

    const cookies = new Cookies();
    var uid = cookies.get('token');

    const formData = new FormData();
    formData.append('action', 'true');
    formData.append('course_id', courseid);
    formData.append('id', materialid);
    formData.append('uid', uid);

    const rsp = await axios.post(CONST.API_SERVER + '/course/my-play-content/assign', formData, {
      'Content-Type': 'text/plain',
    });

    setIsLoaded(true)
    try {
      if (rsp.data.status === 'Success') {

        console.log("Assign success ")

      } else {
        console.warn("Problem detected ")
      }
    } catch (error) {
      console.log("Error caught " + error)
    }
  }



  useEffect(() => {
    assignContent();
    
  }, []);

  useEffect(() => {
    const cookies = new Cookies();
    const per = cookies.get("perc");
    const uid = cookies.get("token");
    const time = cookies.get("time");
    const formData = new FormData();
    formData.append("action", "true");
    formData.append("course_id", courseid);
    formData.append("id", materialid);
    formData.append("user_id", uid);
  
    const fetchData = async () => {
      try {
        const rsp = await axios.post(
          CONST.API_SERVER + "/admin/course/content_transaction",
          formData,
          { "Content-Type": "text/plain" }
        );
        if (rsp.data.status === "Success") {
          console.log("rsp.data.result");
          console.log(rsp.data.result);
          setDonemin(rsp.data.result-'0');
          console.log(donemin);
          
          
          console.warn("Problem detected ");
        }
      } catch (error) {
        console.log("Error caught " + error);
      }
    };
    fetchData();
    setReadTime(donemin);
    // Update readTime to donemin value
    // No dependencies, so this effect runs only once on mount
  }, [donemin]);

  const updateReadtime = async () => {
    const cookies = new Cookies();
    const uid = cookies.get('token');
    const formData = new FormData();
    formData.append('readtime', readTime);
    await axios.post(CONST.API_SERVER + `/admin/course/content_transaction/done_minutes/${uid}/${courseid}/${materialid}`,
     formData, { "Content-Type": "text/plain" }).then((res) => {
      console.log("Readtime updated");
    });
  }
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (key === 1) {
       
          setReadTime(readTime => readTime + 1);
        updateReadtime();
        
        
        console.log("increasing..", readTime);
      }
    }, 1000);
  
    return () => {
      clearInterval(intervalId);
    };
  }, [key,readTime]);
  


  
  


  function checkTime(ct, rt) {
    if (rt >= ct * 60 && !check) {
      setShowMessage(true)
      setMessage("Content reading completed")
      setCheck(true)
      window.location.href = '/my-course/next-play/' + getPara("play") + "/cnt/" + getPara("cnt") + "/material/go-next/chapter/" + getPara("chapter")
    }
  }

  if (course.length > 0) {
    checkTime(course[0].reading_time, readTime)

  }
  if (course.length > 0 && !isAssigned) {
    assignContent();
    setIsAssigned(true)
  }

  const makeInHour = (secs) => {
    if (secs >= 3600) {
      var hrs = (secs / 3600).toFixed(0);
      var mins = ((secs % 3600) / 60).toFixed(0);

      if (mins < 10) {
        return "" + hrs + ":0" + mins + " hrs"
      } else {
        return "" + hrs + ":" + mins + " hrs"
      }
    } else {
      var mins = (secs / 60).toFixed(0);
      if (mins < 10) {
        return "0" + ":0" + mins + " hrs"
      } else {
        return "0" + ":" + mins + " hrs"
      }
    }
  }
  

  function calculateProgress(estTime, reading) {
    if (trn.length > 0) {
      var total = (estTime * 60);
      
      var rs = (reading / total) * 100;
     

      setTimeout(() => {
        const cookies = new Cookies();
        cookies.set('time', readTime);
        if (rs > 100) {
          cookies.set('perc', 100);
        } else {
          cookies.set('perc', rs);
        }
      }, 5000);

      const cookies = new Cookies();
      cookies.set('perc', rs.toFixed(0) >= 100 ? 100 : rs.toFixed(0), { path: "/" });

      return rs.toFixed(0) >= 100 ? 100 : rs.toFixed(0)
    } else {
      return 0
    }
  }




  if (trn.length > 0) {
    if (!courseTime) {
      setTimeout(() => {
        document.getElementById("myvideo").currentTime = trn[0].mins;
        document.getElementById("myvideo").play();

      }, 100);
      setCourseTime(true)
    }
  }

//ANIK


//ANII










  return (
    <>
      {isLoaded && course.length > 0 && trn.length > 0 ?
        <div className="col-md-9 row" style={{ maxHeight: "88vh", overflowY: "scroll" }} >
          <Helmet>
            <title> { course[0].title } </title>
          </Helmet>
          {readTime}
          <div className="progress" style={{ width: calculateProgress(course[0].reading_time, readTime) + "%", background: "green", margin: "10px 26px" }} > { } </div>



          <div className="col-md-12 padding-50" style={{ minHeight: "10px", height: "auto" }} >
            <h4>  {course[0].title} </h4>
            <hr />
            {showMessage ? <div className="card p-5">
              {message}
            </div> : null}

            {course[0].type === "Text Content" ? 
              <div className='row'  style={{ marginLeft: "0px" }}>
                <div id="result"  ></div>
                 {loadResult(course[0].content)}
                
              </div> : course[0].type === "YouTube Video" ?
                <div>
                 {/* <iframe  style={{
                      width: "100%",
                      aspectRatio: "16/9"
                    }}
                 src={"https://www.youtube.com/embed/" + course[0].content.match(/v=([a-zA-Z0-9_-]{11})/)[1]+ "?start="+donemin}
                  title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen>
                    
                  </iframe> */
                  
                  <YouTube  
  videoId={course[0].content.match(/v=([a-zA-Z0-9_-]{11})/)[1]}                  

  className={"yt"}    
  onPlay={() => {
    
    setKey(1)}}
  onPause={() => {
    setKey(0);
    
  }}   
  opts={{
    
    width: '100%',
    aspectRatio: "16/9",
    height: 0.78 * window.innerHeight,
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
      start: donemin,
    },
  }}           
                     
/>}
                </div> : course[0].type === "PDF Content" ?
                  <div> <iframe title='Pdf'  src={CONST.ADMIN_SERVER+"/public/uploads/" + course[0].content + "#toolbar=0"}
                    style={{ width: "100%", aspectRatio: "1.5/1" }}
                    onLoad={() => setKey(1)}
                    ></iframe>
                  </div> :
                  course[0].type === "Video Content" ?
                    <div>
                      <video id='myvideo'
                        src={CONST.ADMIN_SERVER+"/public/uploads/" + course[0].content}
                        style={{ width: "100%", aspectRatio: "16/9" }}
                        controls
                        onPlay={() => setKey(1)}
                        onPause={() => setKey(0)}
                        >
                          
                      </video>
                    </div> : <div> {course[0].type} </div>}
            <br />
            <h4 style={{ display: "none" }}> {calculateProgress(course[0].reading_time, readTime)}  </h4>
          </div>


          {/* <div className="col-md-12"> <b> {course[0].type} </b> </div> */}

        </div> : null}
    </>
  )
}

export default Content