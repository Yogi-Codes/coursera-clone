import React, { useState } from 'react'
import axios from 'axios'
import { CONST, MakeInput } from '../constant'
import Sidebar from '../widgets/Sidebar'
import Header from '../widgets/Header'
import Footer from '../widgets/Footer'
import { Helmet } from 'react-helmet'

const GeneralSettings = () => {

    const [isLoading, setIsLoading] = useState(true)
    const [isLoaded, setIsLoaded] = useState(false)
    const [company, setCompany] = useState([])
    const [message, setMessage] = useState()
    const [showMessage, setShowMessage] = useState()

    const [title, setTitle] = useState();
    const [address, setAddress] = useState();
    const [phone, setPhone] = useState();
    const [email, setEmail] = useState()
    const [linkedin, setLinkedin] = useState();
    const [facebook, setFacebook] = useState();
    const [instagram, setInstagram] = useState();
    const [whatsapp, setWhatsapp] = useState();
    const [twitter, setTwitter] = useState();
    const [youTube, setYouTube] = useState();



    async function getCompany() {
        setIsLoading(true)
        const formData = new FormData();
        formData.append('action', 'getCategory');
        const rsp = await axios.post(CONST.API_SERVER + '/admin/company', formData, {
            'Content-Type': 'text/plain',
        });
        console.log("Got data " + rsp.data.result);
        setIsLoaded(true)
        try {
            if (rsp.data.message.length > 0 && rsp.data.message === "Success") {
                const ttl = rsp.data.result[0]['title'];
                console.log("ttl" + ttl);
                setCompany(rsp.data.result)
                setIsLoading(false)
            } else {
                setIsLoading(false)
            }
        } catch (error) {
        }
    }

    if (isLoaded === false) {
        setIsLoaded(true)
        getCompany();
    }

    async function submitForm() {
        setIsLoading(true)
        const formData = new FormData();
        formData.append('action', 'addPost');
        formData.append('title', title);
        formData.append('address', address);
        formData.append('phone', phone);
        formData.append('email', email);
        formData.append('facebook', facebook);
        formData.append('linkedin', linkedin);
        formData.append('instagram', instagram);
        formData.append('twitter', twitter);
        formData.append('whatsapp', whatsapp);
        formData.append('youtube', youTube);

        const rsp = await axios.post(CONST.API_SERVER + '/admin/general/settings', formData, {
            'Content-Type': 'text/plain',
        });
        if (rsp.data.msg === "Success") {

            setMessage("Settings updated successfully!");
            setShowMessage(true);
            setIsLoaded(false);
            setIsLoading(false);
            setTimeout(() => {
                setShowMessage(false);
            }, 5000);
        }
    }

    return (
        <>
        <Helmet>
            <title>General Settings</title>
        </Helmet>
            {isLoading ? <div className='LoaderClass'></div> : null}
            <Header />
            <div className="page-wrapper default-version">
                <Sidebar act={7} />

                <div class="body-wrapper">
                    <div class="bodywrapper__inner">
                        <div class="row align-items-center mb-30 justify-content-between">
                            <div class="col-lg-6 col-sm-6">
                                <h6 class="page-title"> General Settings </h6>
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
                                <div class="col-lg-12">
                                    <div class="card b-radius--10">
                                        <div class="card-body p-10">
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <p> Enter website title </p>
                                                    <input type="text" name="" id="" className='form-control' defaultValue={company[0].name} required onChange={(e) => { setTitle(e.target.value); }} />
                                                </div>

                                                <div className="col-md-4">
                                                    <p> Contact address </p>
                                                    <input type="text" defaultValue={company[0].address} className='form-control' required onChange={(e) => { setAddress(e.target.value) }} />
                                                </div>

                                                <div className="col-md-4">
                                                    <p> Contact phone </p>
                                                    <input type="number" defaultValue={company[0].phone} className='form-control' required onChange={(e) => { setPhone(e.target.value); }} />
                                                </div>
                                                <div className="col-md-4">
                                                    <p> Contact email </p>
                                                    <input type="email" defaultValue={company[0].email} className='form-control' required onChange={(e) => { setEmail(e.target.value); }} />
                                                </div>
                                                <div className="col-md-12">
                                                    <p>Social media links <hr /> </p>
                                                </div>
                                                <div className="col-md-4">
                                                    <p> Linkedin link</p>
                                                    <input type="url" defaultValue={company[0].linkedin} className='form-control' required onChange={(e) => { setLinkedin(e.target.value); }} />
                                                </div>
                                                <div className="col-md-4">
                                                    <p> Facebook link</p>
                                                    <input type="url" defaultValue={company[0].facebook} className='form-control' required onChange={(e) => { setFacebook(e.target.value); }} />
                                                </div>
                                                <div className="col-md-4">
                                                    <p> Instagram link</p>
                                                    <input type="url" defaultValue={company[0].instagram} className='form-control' required onChange={(e) => { setInstagram(e.target.value); }} />
                                                </div>
                                                <div className="col-md-4">
                                                    <p> WhatsApp link</p>
                                                    <input type="url" defaultValue={company[0].whatsapp} className='form-control' required onChange={(e) => { setWhatsapp(e.target.value); }} />
                                                </div>
                                                <div className="col-md-4">
                                                    <p> Twitter link</p>
                                                    <input type="url" defaultValue={company[0].twitter} className='form-control' required onChange={(e) => { setTwitter(e.target.value); }} />
                                                </div>
                                                <div className="col-md-4">
                                                    <p> YouTube link</p>
                                                    <input type="url" defaultValue={company[0].youtube} className='form-control' required onChange={(e) => { setYouTube(e.target.value); }} />
                                                </div>

                                                <div className="col-md-12">  <br /><br />
                                                    <center><button className='btn btn-primary' onClick={() => { submitForm() }}> Update General Settings </button> </center>
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

export default GeneralSettings