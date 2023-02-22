import React, { useState } from 'react'
import axios from 'axios'
import { CONST, MakeInput } from '../constant'
import Sidebar from '../widgets/Sidebar'
import Header from '../widgets/Header'
import Footer from '../widgets/Footer'
import { Helmet } from 'react-helmet'

const Gateway = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [isLoaded, setIsLoaded] = useState(false)
    const [gateway, setGateway] = useState([])
    const [message, setMessage] = useState()
    const [showMessage, setShowMessage] = useState()

    const [api, setAPI] = useState();
    const [secret, setSecret] = useState();

    async function getGateway() {
        setIsLoading(true)
        const formData = new FormData();
        formData.append('action', 'getCategory');
        const rsp = await axios.post(CONST.API_SERVER + '/admin/settings/gateway', formData, {
            'Content-Type': 'text/plain',
        });
        console.log("Got data " + rsp.data.result);
        setIsLoaded(true)
        try {
            if (rsp.data.message.length > 0 && rsp.data.message === "Success") {
                const ttl = rsp.data.result[0]['title'];
                console.log("ttl" + ttl);
                setGateway(rsp.data.result)
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

    async function submitForm() {
        setIsLoading(true)
        const formData = new FormData();
        formData.append('action', 'addPost');
        formData.append('api', api);
        formData.append('secret', secret);
        formData.append('provider', gateway[0].provider);

        const rsp = await axios.post(CONST.API_SERVER + '/admin/settings/gateway-update', formData, {
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
            <title>Gateway Settings</title>
        </Helmet>
            {isLoading ? <div className='LoaderClass'></div> : null}
            <Header />
            <div className="page-wrapper default-version">
                <Sidebar act={8} />

                <div class="body-wrapper">
                    <div class="bodywrapper__inner">
                        <div class="row align-items-center mb-30 justify-content-between">
                            <div class="col-lg-6 col-sm-6">
                                <h6 class="page-title"> Gateway Settings </h6>
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
                                                    <p> Razorpay Payment Settings </p> <hr />
                                                </div>

                                                <div className="col-md-4">
                                                    <p> API Key </p>
                                                    <input type="text" defaultValue={gateway[0].api} className='form-control' required onChange={(e) => { setAPI(e.target.value) }} />
                                                </div>

                                                <div className="col-md-4">
                                                    <p> API Secret </p>
                                                    <input type="text" defaultValue={gateway[0].secret} className='form-control' required onChange={(e) => { setSecret(e.target.value); }} />
                                                </div>

                                                <div className="col-md-4"> <p> &nbsp; </p>
                                                    <button className='btn btn-primary' onClick={() => { submitForm() }}> Update Settings </button>
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

export default Gateway