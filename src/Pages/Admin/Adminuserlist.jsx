import React from 'react'
import { AdmindashHeader } from '../../Components/Ui/AdmindashHeader'
import { Col, Container, Row } from 'react-bootstrap'

export const Adminuserlist = () => {
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
                   <h2 className="inner-page-heading">User List</h2>

                   <div className="table-box-new shadow-box-main">
                        <div className="table-view-transaction">
                          <div className="thead">
                            <div>
                              <p>S. no</p>
                              <p>Name</p>
                              <p>Referral Code</p>
                              <p>Deposit</p>
                              <p>Earn Points</p>
                              <p>Joining Date</p>
                              <p>Status</p>
                              <p>Action</p>
                            </div>
                          </div>
                          <div className="tbody">
                                    <div>
                                      <p>1</p>
                                      <p><span class="mobile-only">Name - </span> <big><b>Name</b></big> <br/> RTY3455g....g4hkgk</p>
                                      <p><span class="mobile-only">Referral Code - </span> rwrwrw</p>
                                      <p>
                                      <span class="mobile-only">Deposit - </span>
                                       4654644
                                      </p>
                                      <p>
                                      <span class="mobile-only">Earn Points - </span>
                                        6464
                                      </p>
                                      <p>
                                      <span class="mobile-only">Joining Date - </span>
                                        6464
                                      </p>
                                      <p>
                                      <span class="mobile-only">Status - </span>
                                        6464
                                      </p>
                                      <p>
                                        <div>
                                            <a className="common-btn admin-table-btn" href="">Referral Code</a>
                                            <a className="common-btn admin-table-btn" href="">Earn Point</a>
                                        </div>
                                      </p>
                                    </div>
                                    <div>
                                      <p>2</p>
                                      <p><span class="mobile-only">Name - </span> <big><b>Name</b></big> <br/> RTY3455g....g4hkgk</p>
                                      <p><span class="mobile-only">Referral Code - </span> rwrwrw</p>
                                      <p>
                                      <span class="mobile-only">Deposit - </span>
                                       4654644
                                      </p>
                                      <p>
                                      <span class="mobile-only">Earn Points - </span>
                                        6464
                                      </p>
                                      <p>
                                      <span class="mobile-only">Joining Date - </span>
                                        6464
                                      </p>
                                      <p>
                                      <span class="mobile-only">Status - </span>
                                        6464
                                      </p>
                                      <p>
                                        <div>
                                            <a className="common-btn admin-table-btn" href="">Referral Code</a>
                                            <a className="common-btn admin-table-btn" href="">Earn Point</a>
                                        </div>
                                      </p>
                                    </div>
                                    <div>
                                      <p>3</p>
                                      <p><span class="mobile-only">Name - </span> <big><b>Name</b></big> <br/> RTY3455g....g4hkgk</p>
                                      <p><span class="mobile-only">Referral Code - </span> rwrwrw</p>
                                      <p>
                                      <span class="mobile-only">Deposit - </span>
                                       4654644
                                      </p>
                                      <p>
                                      <span class="mobile-only">Earn Points - </span>
                                        6464
                                      </p>
                                      <p>
                                      <span class="mobile-only">Joining Date - </span>
                                        6464
                                      </p>
                                      <p>
                                      <span class="mobile-only">Status - </span>
                                        6464
                                      </p>
                                      <p>
                                        <div>
                                            <a className="common-btn admin-table-btn" href="">Referral Code</a>
                                            <a className="common-btn admin-table-btn" href="">Earn Point</a>
                                        </div>
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
