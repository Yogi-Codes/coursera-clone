import React, { useState } from 'react'
import axios from 'axios'
import { CONST, MakeInput } from '../constant'
import Sidebar from '../widgets/Sidebar'
import Header from '../widgets/Header'
import Footer from '../widgets/Footer'
import { Helmet } from 'react-helmet'
const UserAdd = () => {

    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState()
    const [showMessage, setShowMessage] = useState()

    const [name, setName] = useState();
    const [phone, setPhone] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [rank, setRank] = useState("Admin");


    async function submitForm() {
        setIsLoading(true)
        const formData = new FormData();
        formData.append('action', 'addPost');
        formData.append('name', name);
        formData.append('phone', phone);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('rank', rank);

        const rsp = await axios.post(CONST.API_SERVER + '/admin/users/add', formData, {
            'Content-Type': 'text/plain',
        });
        console.log(rsp.data.status);
        if (rsp.data.status === "Success") {

            setMessage("User added successfully!");
            setShowMessage(true);
            setIsLoading(false);
            setTimeout(() => {
                setShowMessage(false);
            }, 5000);
        } else {
            setMessage("We can not process your request! ");
            setShowMessage(true)
            setTimeout(() => {
                setShowMessage(false);
                setIsLoading(false)
            }, 5000);
        }
    }

    return (
        <>
        <Helmet>
            <title>Add User</title>
        </Helmet>
            {isLoading ? <div className='LoaderClass'></div> : null}
            <Header />
            <div className="page-wrapper default-version">
                <Sidebar act={5} />

                <div class="body-wrapper">
                    <div class="bodywrapper__inner">
                        <div class="row align-items-center mb-30 justify-content-between">
                            <div class="col-lg-6 col-sm-6">
                                <h6 class="page-title"> Add New User </h6>
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
                                <div class="col-lg-6">
                                    <div class="card b-radius--10">
                                        <div class="card-body p-10">
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <p> New user will be able to access admin panel </p> <hr />
                                                </div>

                                                <div className="col-md-12">
                                                    <p> Name </p>
                                                    <input type="text" className='form-control' required onChange={(e) => { setName(e.target.value) }} />
                                                </div>

                                                <div className="col-md-12">
                                                    <p> Email </p>
                                                    <input type="text" className='form-control' required onChange={(e) => { setEmail(e.target.value); }} />
                                                </div>

                                                <div className="col-md-12">
                                                    <p> Phone </p>
                                                    <input type="text" className='form-control' required onChange={(e) => { setPhone(e.target.value); }} />
                                                </div>

                                                <div className="col-md-12">
                                                    <p> Password </p>
                                                    <input type="text" className='form-control' required onChange={(e) => { setPassword(e.target.value); }} />
                                                </div>
                                                <div className="col-md-12">
                                                    <p>Select permission </p>
                                                    <select name="" id="" className="form-control" onChange={(e) => { setRank(e.target.value); }} >
                                                        <option value="Admin">Admin</option>
                                                    </select>
                                                </div>

                                                <div className="col-md-12"> <p> &nbsp; </p>
                                                    <center>
                                                        <button className='btn btn-primary w-100' onClick={() => { submitForm() }}> Add as New User </button>
                                                    </center>
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

export default UserAdd