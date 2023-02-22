import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../../widgets/Header'
import Sidebar from '../../widgets/Sidebar'
import axios from 'axios'
import { CONST } from '../../constant'
import { Helmet } from 'react-helmet'

const Dashboard = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [isLoaded, setIsLoaded] = useState(false)
    const [gateway, setInfo] = useState([])

    async function getGateway() {
        setIsLoading(true)
        const formData = new FormData();
        formData.append('action', 'getCategory');
        const rsp = await axios.post(CONST.API_SERVER + '/admin/dashboard', formData, {
            'Content-Type': 'text/plain',
        });
        setIsLoaded(true)
        try {
            if (rsp.data.message.length > 0 && rsp.data.message === "Success") {
                setInfo(rsp.data.result)
                setIsLoading(false)
            } else {
                setIsLoading(false)
            }
        } catch (error) {
        }
    }

    if (isLoaded === false) {
        setIsLoaded(true)
        getGateway();
    }

    return (
        <>
            <Helmet>
                <title>Dashboard - { CONST.APPNAME } </title>
            </Helmet>
            <Header />
            <div className="page-wrapper default-version">
                <Sidebar act={1} />

                {isLoaded && gateway.length > 0 ? <div className="body-wrapper">
                    <div className="bodywrapper__inner">
                        <div className="row align-items-center mb-30 justify-content-between">
                            <div className="col-lg-6 col-sm-6">
                                <h6 className="page-title">Dashboard</h6>
                            </div>
                            {/* <div className="col-lg-6 col-sm-6 text-sm-right mt-sm-0 mt-3 right-part">
                                <span className="text--danger">Last Cron Run <strong>1 year ago</strong>
                                </span>
                            </div> */}
                        </div>
                        <div className="row mb-none-30">
                            <div className="col-xl-3 col-lg-4 col-sm-6 mb-30">
                                <div className="dashboard-w1 bg--primary b-radius--10 box-shadow">
                                    <div className="icon">
                                        <i className="fa fa-users"></i>
                                    </div>
                                    <div className="details">
                                        <div className="numbers">
                                            <span className="amount">{gateway[0].students > 0 ? gateway[0].students : '0'} </span>
                                        </div>
                                        <div className="desciption">
                                            <span className="text--small">Total Students</span>
                                        </div>
                                        <a href="/students/all" className="btn btn-sm text--small bg--white text--black box--shadow3 mt-3">View All</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-4 col-sm-6 mb-30">
                                <div className="dashboard-w1 bg--cyan b-radius--10 box-shadow">
                                    <div className="icon">
                                        <i className="fa fa-users"></i>
                                    </div>
                                    <div className="details">
                                        <div className="numbers">
                                            <span className="amount"> {gateway[0].users > 0 ? gateway[0].users : '0'} </span>
                                        </div>
                                        <div className="desciption">
                                            <span className="text--small">Total Users</span>
                                        </div>
                                        <a href="/users/all" className="btn btn-sm text--small bg--white text--black box--shadow3 mt-3">View All</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-4 col-sm-6 mb-30">
                                <div className="dashboard-w1 bg--orange b-radius--10 box-shadow ">
                                    <div className="icon">
                                        <i className="la la-envelope"></i>
                                    </div>
                                    <div className="details">
                                        <div className="numbers">
                                            <span className="amount">{gateway[0].courses > 0 ? gateway[0].courses : '0'}  </span>
                                        </div>
                                        <div className="desciption">
                                            <span className="text--small">Total Courses</span>
                                        </div>
                                        <a href="/courses/all" className="btn btn-sm text--small bg--white text--black box--shadow3 mt-3">View All</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-4 col-sm-6 mb-30">
                                <div className="dashboard-w1 bg--pink b-radius--10 box-shadow ">
                                    <div className="icon">
                                        <i className="fa fa-shopping-cart"></i>
                                    </div>
                                    <div className="details">
                                        <div className="numbers">
                                            <span className="amount"> {gateway[0].category > 0 ? gateway[0].category : '0'}  </span>
                                        </div>
                                        <div className="desciption">
                                            <span className="text--small">Total Categories</span>
                                        </div>
                                        <a href="/courses/category" className="btn btn-sm text--small bg--white text--black box--shadow3 mt-3">View All</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-4 col-sm-6 mb-30">
                                <div className="dashboard-w1 bg--indigo b-radius--10 box-shadow">
                                    <div className="icon">
                                        <i className="lab la-sellcast"></i>
                                    </div>
                                    <div className="details">
                                        <div className="numbers">
                                            <span className="amount">{gateway[0].contacts > 0 ? gateway[0].contacts : '0'} </span>
                                        </div>
                                        <div className="desciption">
                                            <span className="text--small">Total Contacts </span>
                                        </div>
                                        <a href="/contacts" className="btn btn-sm text--small bg--white text--black box--shadow3 mt-3">View All</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div> : null}
            </div>
            {/* <Footer/> */}
        </>
    )
}
export default Dashboard