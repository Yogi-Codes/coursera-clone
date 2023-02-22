import React, { useState } from 'react'
import "./faq.scss"
import { faqData } from "../../data/faq.data"
const FAQ = () => {
    const [faqId, setFaqId] = useState(50000);
    return (
        <div className='faq-section padding-50' id='faq'>
            <div className="row">
                <div className="col-md-12">
                    <center> <h3>Frequently asked questions</h3> </center>
                    <div className="container">
                        <div className="row">
                            <div className="container">

                                {faqData.map((faq, myindex) => {

                                    return (
                                        <div className="faq-post-card" onClick={() => { faqId===myindex? setFaqId(50000) : setFaqId(myindex)}}>
                                            <div className="row">
                                                <div className="left-box col-md-1"> {myindex === faqId ? <i className="icofont-curved-down"></i> : <i className="icofont-curved-right"></i>} </div>
                                                <div className="right-box col-md-10" >
                                                    <b> {faq.title}  </b> <br />
                                                    <p className={faqId === myindex ? 'fs-14 active' : 'fs-14'} >
                                                        {faq.description}
                                                    </p>
                                                </div>
                                            </div>

                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FAQ