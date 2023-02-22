import React from 'react'
import Loader from '../../Loader'
import { useState } from 'react'
import { getPara } from '../../constants'
import axios from 'axios'
import { CONST } from '../../constants'
const GoNextContent = () => {
    const [loaded, setLoaded] = useState(false)


    const getNextCourse = async (courseid, materialid) => {
        const formData = new FormData();
        formData.append('action', 'true');
        formData.append('course_id', courseid);
        formData.append('id', materialid);

        const rsp = await axios.post(CONST.API_SERVER + '/course/my-next-play-content', formData, {
            'Content-Type': 'text/plain',
        });

        setLoaded(true)
        try {
            if (rsp.data.status === 'Success' && rsp.data.result.length > 0) {

                // setCourse(rsp.data.result)
                // console.log(rsp.data.result[0].title)
                // console.log(rsp.data.result[0].id)
                // console.log(rsp.data.result[0].chapter)
                // console.log("Aspect reading time " + rsp.data.result[0].reading_time + " :::: " + rTime)
                window.location.href = `/my-course/play/${courseid}/cnt/${rsp.data.result[0].id}/material/${rsp.data.result[0].title}/chapter/${rsp.data.result[0].chapter}`
            } else {
                // console.warn("Course finished")
                window.location.href=`/my-course/${course_id}/download/certificate/`
            }
        } catch (error) {
            console.log("Error caught " + error)
        }
    }

    if (!loaded) {
        var course_id = getPara("next-play")
        var content_id = getPara("cnt")
        console.log("Course ID" + course_id + " :: Content ID " + content_id)
        getNextCourse(course_id, content_id)
    }
    return (
        <div>
            <Loader />
        </div>
    )
}

export default GoNextContent