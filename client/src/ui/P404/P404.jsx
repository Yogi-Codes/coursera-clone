import React from 'react' 
import Footer from '../../components/Footer'
import Nav from '../../components/NavBar' 
import './style.scss'
const P404 = () => {
  return (
    <>
      <Nav/>
      <div className='p-404'>
        <img src={"/images/404.png"} alt="" />
    </div>
    <Footer/>
    </>
  )
}

export default P404