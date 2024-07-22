import React from 'react'
import { AdmindashHeader } from '../../Components/Ui/AdmindashHeader'
import { Col, Container, Row } from 'react-bootstrap'

export const Adminearnpoint = () => {
  return (
    <>
    <div className="dashboard-layout">
       <AdmindashHeader/>
       <section className="outer-dash-section">
         <Container>
           <Row>
             <Col lg={12}>
               <div className="dashboard-white-box">
                 <div className="w-100">
                   <h2 className="inner-page-heading">Earn Point Statment</h2>

                   <div className="table-box-new shadow-box-main">
                        <div className="table-view-transaction">
                          <div className="thead">
                            <div>
                              <p>S. no</p>
                              <p>Name</p>
                              <p>Base Earn Points</p>
                              <p>Layer Earn Points</p>
                              <p>Total Earn Points</p>
                              <p>Date</p>
                            </div>
                          </div>
                          <div className="tbody">
                                    <div>
                                      <p>1</p>
                                      <p><span class="mobile-only">Name - </span> <big><b>Name</b></big> <br/> RTY3455g....g4hkgk</p>
                                      <p><span class="mobile-only">Base Earn Points - </span> 23</p>
                                      <p>
                                      <span class="mobile-only">Layer Earn Points - </span>
                                       46
                                      </p>
                                      <p>
                                      <span class="mobile-only">Total Earn Points - </span>
                                        24
                                      </p>
                                      <p>
                                      <span class="mobile-only">Date - </span>
                                        22/07/2024
                                      </p>
                                     
                                    </div>
                                    <div>
                                      <p>2</p>
                                      <p><span class="mobile-only">Name - </span> <big><b>Name</b></big> <br/> RTY3455g....g4hkgk</p>
                                      <p><span class="mobile-only">Base Earn Points - </span> 23</p>
                                      <p>
                                      <span class="mobile-only">Layer Earn Points - </span>
                                       46
                                      </p>
                                      <p>
                                      <span class="mobile-only">Total Earn Points - </span>
                                        24
                                      </p>
                                      <p>
                                      <span class="mobile-only">Date - </span>
                                        22/07/2024
                                      </p>
                                     
                                    </div>
                                    <div>
                                      <p>3</p>
                                      <p><span class="mobile-only">Name - </span> <big><b>Name</b></big> <br/> RTY3455g....g4hkgk</p>
                                      <p><span class="mobile-only">Base Earn Points - </span> 23</p>
                                      <p>
                                      <span class="mobile-only">Layer Earn Points - </span>
                                       46
                                      </p>
                                      <p>
                                      <span class="mobile-only">Total Earn Points - </span>
                                        24
                                      </p>
                                      <p>
                                      <span class="mobile-only">Date - </span>
                                        22/07/2024
                                      </p>
                                     
                                    </div>
                                  
                          </div>
                        </div>
                      </div>
                   
                 </div>
               </div>

             </Col>
           </Row>
         </Container>
       </section>
    </div>
   </>
  )
}
