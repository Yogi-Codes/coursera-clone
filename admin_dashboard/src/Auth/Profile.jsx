import React, { useState } from 'react'
import Cookies from 'universal-cookie';
import axios from 'axios'
import { CONST, MakeInput } from '../constant'
import Sidebar from '../widgets/Sidebar'
import Header from '../widgets/Header'
import Footer from '../widgets/Footer'
import { Helmet } from 'react-helmet';

const Profile = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [isLoaded, setIsLoaded] = useState(false)
    const [user, setUser] = useState([])
    const [message, setMessage] = useState()
    const [showMessage, setShowMessage] = useState()
    const [name, setName] = useState();
    const [phone, setPhone] = useState();
    const [email, setEmail] = useState()
    const [pass, setPass] = useState()
    const [cPass, setCPass] = useState()
    const [nPass, setNPass] = useState()


    const [isFormOpen, setIsFormOpen] = useState(false)

    async function getUser() {
        const cookies = new Cookies();
        const uid = cookies.get('_adId');
        setIsLoading(true)
        const formData = new FormData();
        formData.append('action', 'user');
        formData.append('uid', uid);
        const rsp = await axios.post(CONST.API_SERVER + '/admin/userInfo', formData, {
            'Content-Type': 'text/plain',
        });

        setIsLoaded(true)
        try {
            if (rsp.data.message.length > 0 && rsp.data.message === "Success") {
                setUser(rsp.data.result)
                setEmail(rsp.data.result[0].email)
                setName(rsp.data.result[0].name)
                setPhone(rsp.data.result[0].phone)
                setPass(rsp.data.result[0].password)

            } else {
            }
        } catch (error) {
        }
        setIsLoading(false)
    }

    if (isLoaded === false) {
        setIsLoaded(true)
        getUser();

    }

    async function submitForm() {
        setIsLoading(true)
        const cookies = new Cookies();
        const uid = cookies.get('_adId');
        const formData = new FormData();
        formData.append('action', 'updateUser');
        formData.append('uid', uid);
        formData.append('name', name);
        formData.append('phone', phone);
        formData.append('email', email);


        const rsp = await axios.post(CONST.API_SERVER + '/admin/user/update', formData, {
            'Content-Type': 'text/plain',
        });
        if (rsp.data.status === "Success") {
            setMessage("Settings updated successfully!");
            cookies.set("_adName", name);
            setShowMessage(true);
            setIsLoaded(false);
            setIsLoading(false);
            setTimeout(() => {
                setShowMessage(false);
                window.location.reload()
            }, 5000);
        }
    }

    async function updatePassword() {

        if (pass === cPass) {
            setIsLoading(true)
            const cookies = new Cookies();
            const uid = cookies.get('_adId');
            const formData = new FormData();
            formData.append('action', 'updateUser');
            formData.append('uid', uid);
            formData.append('cpass', cPass);
            formData.append('npass', nPass);


            const rsp = await axios.post(CONST.API_SERVER + '/admin/user/update/password', formData, {
                'Content-Type': 'text/plain',
            });
            if (rsp.data.status === "Success") {
                setMessage("Settings updated successfully!");
                cookies.remove("_adId");
                setShowMessage(true);
                setIsLoaded(false);
                setIsLoading(false);
                window.location.reload()
            }
        } else {
            setMessage("Wrong password! Please check")
            setShowMessage(true)
            setTimeout(() => {
                setShowMessage(false)
            }, 5000);
        }
    }



    return (
        <>
        <Helmet>
            <title>Profile Settings - { CONST.APPNAME } </title>
        </Helmet>
            {isLoading ? <div className='LoaderClass'></div> : null}
            <Header />
            <div className="page-wrapper default-version">
                <Sidebar act={7} />

                <div class="body-wrapper">
                    <div class="bodywrapper__inner">
                        <div class="row align-items-center mb-30 justify-content-between">
                            <div class="col-lg-6 col-sm-6">
                                <h6 class="page-title"> Profile Settings </h6>
                            </div>

                            <div className="col-md-6 col-sm-6">
                                <button className='btn btn-primary float-right' onClick={() => { isFormOpen ? setIsFormOpen(false) : setIsFormOpen(true) }}> Change Password </button>
                            </div>
                        </div>

                        {showMessage ?
                            <div className="row">
                                <div className="col-md-12 p-5">
                                    <div className="card p-3"  > <center> {message} </center> </div>
                                </div>
                            </div>
                            : null}



                        {!isLoading ?
                            <div class="row">

                                {isFormOpen ? <>

                                    <div className="col-md-12 row mb-100">

                                        <div className="card p-3 col-md-12">
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <p>Enter current password </p>
                                                    <input type="password" name="" id="" className='form-control' placeholder='**********' onChange={(e) => { setCPass(e.target.value) }} />
                                                </div>

                                                <div className="col-md-4">
                                                    <p>Enter new  password </p>
                                                    <input type="password" name="" id="" className='form-control' placeholder='**********' onChange={(e) => { setNPass(e.target.value) }} />
                                                </div>
                                                <div className="col-md-4"> <p>  <br /> </p>
                                                    <button className='btn btn-primary w-100' onClick={() => { updatePassword() }}> Update Password </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </> : null}
                                <div class="col-lg-4">
                                    <div class="card b-radius--10">
                                        <div class="card-body p-10">
                                            <div className="row">

                                                <div className="col-md-12">
                                                    <p> Name </p>
                                                    <input type="text" defaultValue={user[0].name} className='form-control' required onChange={(e) => { setName(e.target.value) }} />
                                                </div>
                                                <div className="col-md-12">
                                                    <p> Email </p>
                                                    <input type="email" defaultValue={user[0].email} className='form-control' required onChange={(e) => { setEmail(e.target.value); }} />
                                                </div>
                                                <div className="col-md-12">
                                                    <p> Phone </p>
                                                    <input type="number" defaultValue={user[0].phone} className='form-control' required onChange={(e) => { setPhone(e.target.value); }} />
                                                </div>

                                                <div className="col-md-12">  <br /><br />
                                                    <center><button className='btn btn-primary' onClick={() => { submitForm() }}> Update Profile Settings </button> </center>

                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>


                            </div>
                            : null}
                    </div>
                </div>

            </div>
            <Footer />
        </>
    )
}

export default Profile