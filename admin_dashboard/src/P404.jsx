import React from 'react'
import Footer from './widgets/Footer'
import Header from './widgets/Header'
import Sidebar from './widgets/Sidebar' 

const P404 = () => {
  return (
    <>
      <Header />
      <div className="page-wrapper default-version">
        <Sidebar act={0} /><div class="body-wrapper">
          <div class="bodywrapper__inner">
            <div class="row align-items-center mb-30 justify-content-between">
            </div>
            <div class="row">
              <div class="col-lg-12">
                <div class="card b-radius--10">
                  <div class="card-body p-10">
                    <div className="row">
                      <div className="col-md-12"> <center>
                        <img src="/images/404.png" alt="" style={{ maxWidth: "100%" }} />
                      </center></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
      <Footer />
    </>
  )
}

export default P404