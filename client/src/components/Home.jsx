import React from 'react'
import Promosec2 from './Promosec2';
import Bussiness from './Bussiness';
import NavBar from './NavBar';
import Footer from './Footer';

import Header from './Header';
import Collaborator from './Collaborator';
import Features from './Features';
import Promosec from './Promosec';
import QualityAssurance from './QualityAssurance';
import Accessibilitypromo from './Accessibilitypromo';
import Teachingmethodology from './Teachingmethodology';
import Certificates from './Certificates';
import { Helmet } from 'react-helmet';
import { CONST } from '../constants';
const Home = () => {
    return (
        <>
            <Helmet>
                <title> Home - {CONST.APPNAME} </title>
                <link rel="icon" href="/images/company-logo.png" />
            </Helmet>
            <NavBar />
            <Header />
            <Collaborator />
            <Features />
            <Promosec />
            <QualityAssurance />
            <Accessibilitypromo />
            <Teachingmethodology />
            <Certificates />
            {/* <Community/> */}
            <Promosec2 />
            <Bussiness />
            <Footer />
        </>
    )
}

export default Home