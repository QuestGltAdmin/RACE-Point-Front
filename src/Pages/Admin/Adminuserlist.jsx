import React, { useState } from 'react'
import { AdmindashHeader } from '../../Components/Ui/AdmindashHeader'
import { Col, Container, Modal, Row } from 'react-bootstrap'

export const Adminuserlist = () => {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
                                        <button onClick={handleShow} className="common-btn admin-table-btn">Referral Code</button>
                                        <button  className="common-btn admin-table-btn">Earn Point</button>
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
                                            <a className="common-btn admin-table-btn">Referral Code</a>
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
       {/* <Modal className="new-user-modal" centered show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
        <div>
            <img src="assets/img/Logo.png" alt="" className="img-fluid logo" />
            <p>Here are your referral codes</p>
            <div class="referal-copy-row">
              <div>
                <span>1</span>VV5577M2
              </div>
              <a href="#"><img src="assets/img/copy.png" alt="Copy" /></a>
              <a class="text-white"><i class="fa fa-share" aria-hidden="true"></i></a>
            </div>
            <div class="referal-copy-row">
              <div>
                <span>2</span>VV5577M2
              </div>
              <a href="#"><img src="assets/img/copy.png" alt="Copy" /></a>
              <a class="text-white"><i class="fa fa-share" aria-hidden="true"></i></a>
            </div>
            <div class="referal-copy-row">
              <div>
                <span>3</span>VV5577M2
              </div>
              <a href="#"><img src="assets/img/copy.png" alt="Copy" /></a>
              <a class="text-white"><i class="fa fa-share" aria-hidden="true"></i></a>
            </div>
          </div>
        </Modal.Body>
      </Modal> */}

      <Modal size="lg" className="network-popup  " centered show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
        <div>
           <h4 className="sub-heading mb-3">Earn Points</h4>
            <div className="table-view-transaction">
                  <div className="thead">
                    <div>
                      <p>S. no</p>
                      <p>Name</p>
                      <p>Base Earn Points</p>
                      <p>Layer Earn Points</p>
                      <p>Total Earn Points</p>
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
                             
                              
                            </div>
                          
                  </div>
                </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
   </>
  )
}
