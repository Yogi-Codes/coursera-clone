import React, { useEffect, useState } from 'react'
import Footer from '../widgets/Footer'
import Header from '../widgets/Header'
import Sidebar from '../widgets/Sidebar'
import { CONST } from '../constant'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'


const AddCert = () => {

    const [isLoading, setIsLoading] = useState(true)
    const [courses, setCourses] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)
    const [fetchedCourse, setFetchedCourse] = useState({})
    const [File, setFile] = useState()
    const [selectedCourseId, setSelectedCourseId] = useState('');

    if (isLoaded === false) {
        setIsLoaded(true)
        getCourses();
    }
    async function getCourses() {
        setIsLoading(true)
        const formData = new FormData();
        formData.append('action', 'getCategory');
        const rsp = await axios.post(CONST.API_SERVER + '/admin/students/get', formData, {
            'Content-Type': 'text/plain',
        });
        setIsLoaded(true)
        try {
            if (rsp.data.message.length > 0 && rsp.data.message === "Success") {
                setCourses(rsp.data.result)
                setIsLoading(false)
            } else {
                setIsLoading(false)
            }
        } catch (error) {
        }
    }

    async function getCourse() {
        const formData = new FormData();
        formData.append('action', 'true');
        const rsp = await axios.post(CONST.API_SERVER + '/admin/courses/getcourse', formData, {
            'Content-Type': 'text/plain',
        });


        console.log("getcourses");
        
        if(rsp.data.status==="success")
        {
            console.log("getcourses success");
        }
        console.log(rsp);
        
        let output = {};

    

for (const record of rsp.data.result) {
  const user_id = record['user_id'];
  const course_id = record['course_id'];
  const certificate_uploaded = record['certificate_uploaded'];
  
  // Check if user_id exists in the output object
  if (!output.hasOwnProperty(user_id)) {
    output[user_id] = {
      'user_id': user_id,
      'courses': []
    };
  }
  
  // Check if course_id exists for this user
  const user_courses = output[user_id]['courses'];
  const course_index = user_courses.findIndex(c => c.course_id === course_id);
  
  if (course_index === -1) {
    // Add new course for this user
    user_courses.push({
      'course_id': course_id,
      'certificate_uploaded': certificate_uploaded
    });
  } else {
    // Update existing course for this user
    user_courses[course_index]['certificate_uploaded'] = certificate_uploaded;
  }
}

console.log(output);

        

console.log(output);
setFetchedCourse(output)
          
         
          
    
      }

      useEffect(() => {
        const timeoutId = setTimeout(() => {
         getCourse();
        }, 5000);
    
       
        return () => clearTimeout(timeoutId);
      }, []);
      
    async function certup(uid) {
        setIsLoading(true)
        const formData = new FormData();
        formData.append('action', 'Addcert');
        formData.append('uid', uid);
        formData.append('file', File);
        formData.append('course_id', selectedCourseId);

       
        const rsp = await axios.post(CONST.API_SERVER + '/admin/student/certadd', formData, {
          'Content-Type': 'multipart/form-data',
        });
        setIsLoaded(true)
        try {
            if (rsp.data.status.length > 0 && rsp.data.status === "Success") {
                setIsLoaded(false)
            } else {
                setIsLoading(false)
            }
        } catch (error) {
        }
    }

    return (
        <>
            <Helmet>
                <title>Manage Students</title>
            </Helmet>
            {isLoading ? <div className='LoaderClass'></div> : null}
            <Header />
            <div className="page-wrapper default-version">
                <Sidebar act={10} />

                <div class="body-wrapper">
                    <div class="bodywrapper__inner">
                        <div class="row align-items-center mb-30 justify-content-between">
                            <div class="col-lg-6 col-sm-6">
                                <h6 class="page-title"> Certificate Management </h6>
                            </div>
                            
                        </div>
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="card b-radius--10">
                                    <div class="card-body p-10">
                                        <div className="row">
                                        <table className='table'>
  <thead className='table'>
    <tr>
      <th scope='col'>#</th>
      <th scope='col'>Course Name</th>
      <th scope='col'>Email</th>
      <th scope='col'>Certificate Uploaded</th>
      <th scope='col'>Select Course <a href='/courses/all'>Get Course Id</a></th>
      <th scope='col'></th>
      <th scope='col'></th>
    </tr>
  </thead>
  <tbody>
    {courses.map((course, i) => (
      <tr key={course.id}>
        <td>{i + 1}</td>
        <td>{course.name}</td>
        <td>{course.email}</td>
        <td>
          {fetchedCourse[course.id]?.courses?.map((c) => (
            <div key={c.course_id}>
              {c.course_id}: {c.certificate_uploaded || 'No'}
            </div>
          ))}
        </td>
        <td>
          <select
            className='form-select'
            aria-label='Select Course'
            value={selectedCourseId}
            onChange={(e) => setSelectedCourseId(e.target.value)}
          >
            <option value=''>Select a course</option>
            {fetchedCourse[course.id]?.courses?.map((c) => (
              <option key={c.course_id} value={c.course_id}>
                {c.course_id}
              </option>
            ))}
          </select>
        </td>
        <td>
          <label
            htmlFor='myFile'
            className='btn btn-primary'
            style={{ cursor: 'pointer' }}
          >
            Choose File
          </label>
          <input
            type='file'
            id='myFile'
            accept='image/*'
            name='filename'
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
            style={{ display: 'none' }}
          />
        </td>
        <td>
          <button className='btn btn-success' onClick={() => certup(course.id)}>
            Submit
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>



                          
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
    )
}

export default AddCert;