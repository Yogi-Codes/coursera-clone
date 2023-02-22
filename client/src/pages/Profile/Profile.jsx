import React from 'react'
import Footer from '../../components/Footer'
import Nav from '../../components/NavBar'
import Cookies from 'universal-cookie'
import './style.scss'
import { Helmet } from 'react-helmet'
import { CONST } from '../../constants'
const Profile = () => {

    const cookies = new Cookies();
    const uname = cookies.get('_tname');

    return (
        <>
            <Nav />
            <Helmet>
                <title>{ uname } - Profile - { CONST.APPNAME }  </title>
            </Helmet>
            <div className="profile-page-div h-100vh padding-50">
                <div className="my-center-account-info">
                    <div className="user-icon"><i className="icofont-user-alt-7"></i>
                        <h4> {uname} </h4>
                    </div>
                </div>
            </div>

            <div className="overflow-top-account-page">
                <div className="row">
                    <div className="col-md-12">
                        <div className="row">
                            <div className="col-md-1"> <i className="icofont-edit"></i> </div>
                            <div className="col-md-8"> <h3>Tell us about yourself to get a personalized learning experience with course recommendations</h3> </div>

                            <div className="col-md-2">
                                <button className='btn btn-primary' onClick={()=>{ window.location.href='edit-profile' }} >Edit Profile</button>
                            </div> 

                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12">
                    <center>
                        <button className='btn btn-primary' onClick={()=>{ window.location.href='edit-profile' }}>Edit My Profile</button>
                    </center>
                </div>
                <br /><br /><br /><br />
            </div>

            <Footer />
        </>
    )
}

export default Profile