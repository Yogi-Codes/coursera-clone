import React from 'react'
import { CONST } from '../../constants'
import './benifits.scss'

const Benifits = () => {
    return (
        <>
            <div className="row benifits-of-earning">
                <div className="col-md-12">
                    <center><h2>Benefits of earning your online degree on {CONST.APPNAME} </h2></center>
                </div>

                <div className="col-md-6">
                    <h6 className="card-title bold">QUALITY LEARNING FROM ACCREDITED UNIVERSITIES</h6>
                    <h4>
                        Access the best online degree programs from leading universities
                    </h4>
                    <p>
                        You don't need to quit your job or move to a new city to earn a degree from a top university. We’ve partnered with leading universities so you earn the same degree, complete the same curriculum, and learn from the same top-tier faculty and industry experts as on-campus students. Choose from online bachelor’s and master’s degree programs in today’s most in-demand fields.
                    </p>
                </div>
                <div className="col-md-6">
                    <img src="/images/top-quality_3x__2_.png" alt="" />
                </div>
                <div className="col-md-12"><br /><br /><br /></div>

                {/*  repeat */}
                <div className="col-md-6">
                    <img src="/images/Same_diploma_2x.png" alt="" />
                </div>
                <div className="col-md-6">
                    <h6 className="card-title bold"> AFFORDABLE TUITION AND PAYMENT OPTIONS </h6>
                    <h4>
                        Earn your degree at a lower cost than similar on-campus programs
                    </h4>
                    <p>
                        With 100% online learning, the tuition for most of the degrees hosted on the Coursera platform does not depend on residency status. In fact, many schools offer affordable, pay-as-you-go tuition and you may be able to qualify for scholarships, employer tuition benefits, or financial aid. Discover <a href="">financial resources </a> to help fund your degree, and get the support you need to pursue your learning goals.
                    </p>
                </div>
                <div className="col-md-12"><br /><br /><br /></div>
                {/* repeat */}
                <div className="col-md-6">
                    <h6 className="card-title bold">MODULAR AND STACKABLE</h6>
                    <h4>
                        Start earning credit toward your degree today
                    </h4>
                    <p>
                        Begin your degree journey before you officially apply. Take university pre-approved courses, specializations, and certificates and earn credit* toward applicable degree programs. If you choose to apply and are admitted, your completed courses can count toward your requirements. Coursera’s online content “stacks” together so you can complete your degree and reach your goal on your terms.
                    </p>
                </div>
                <div className="col-md-6">
                    <img src="/images/new-stackable-content-graphic.png" alt="" />
                </div>
                <div className="col-md-12"><br /><br /><br /></div>

                {/*  repeat */}
                <div className="col-md-6">
                    <img src="/images/Same-Degree-Learning-Experience.jpg" alt="" />
                </div>
                <div className="col-md-6">
                    <h6 className="card-title bold"> INTERACTIVE AND ENGAGING </h6>
                    <h4>
                        Benefit from collaborative learning and expert instruction
                    </h4>
                    <p>
                        Online degrees on Coursera are powered by technology that helps you spark meaningful connections with your faculty and peers. From live online lectures to asynchronous, self-paced classes, you choose what works for you. At every step of your learning journey, you’ll have access to a dedicated online student support team, course facilitators, and a network of peers.
                    </p>
                </div>

            </div>
        </>
    )
}

export default Benifits