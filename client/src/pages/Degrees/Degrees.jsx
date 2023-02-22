import React from 'react'
import Footer from '../../components/Footer'
import Nav from '../../components/NavBar'
import FAQ from '../../ui/FAQ/FAQ'
import Benifits from './Benifits'
import HeroWithForm from './HeroWithForm'
import SelectProgram from './SelectProgram'

const Degrees = () => {
    return (
        <>
            <Nav />
            <HeroWithForm title={"Take your career to the next level with an online degree"}  category={ "This is category" }/>
            <SelectProgram />

            <Benifits />
            <FAQ />
            <Footer />
        </>
    )
}

export default Degrees