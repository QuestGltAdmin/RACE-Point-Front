import React, { useState } from 'react'
import { Header } from '../Components/Header'
import { Col, Container, Form, Modal, Row } from 'react-bootstrap'

export const Landing = () => {

    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
     <Header/>
     <section className="landing-banner-sec">
        <Container>
            <Row>
                <Col>
                   <div>
                      <Row className="align-items-center">
                          <Col lg={5}>
                            <div className="left-img">
                                <img src="assets/img/left-img.gif" className="img-fluid" alt="" />
                            </div>
                          </Col>
                          <Col lg={7}>
                              <div className="right-sid-content">
                                 <h2>The more activities you complete, the more points you get.</h2>
                                 <p>Watch out for the multipliers!</p>
                                 <div className="banner-btn">
                                   {/* <a className="common-btn disable-btn" href=""><img src="assets/img/dash.png" alt="" /><div>Connect Wallet <span>Track your points here</span></div> </a> */}
                                    <a className="common-btn" href=""><img src="assets/img/dash.png" alt="" /><div>Connect Wallet <span>Track your points here</span></div> </a>
                                    <a className="common-btn" onClick={handleShow} href="#"><img src="assets/img/star.png" alt="" />Activities</a>
                                 </div>
                              </div>
                          </Col>
                      </Row>
                   </div>
                </Col>
            </Row>
        </Container>
     </section>

   {/* new user popup  */}
     {/* <Modal className="new-user-modal" centered show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
            <div>
                <img src="assets/img/Logo.png" alt="" className="img-fluid logo" />
                <p>Welcome to the RACE Points System!</p>
                <p>This site is only available to invited users. Please input the referral code you’ve received to proceed</p>
                <Form.Group className="mb-3 outer-input">
                    <Form.Label>Referral Code</Form.Label>
                    <Form.Control type="text" placeholder="Enter Referral Code here" />
                </Form.Group>
                <button className="common-btn bg-left">Enter <img src="assets/img/arrow_forward.png" alt="" /></button>
            </div>
        </Modal.Body>
      </Modal> */}

    {/* New share */}
      {/* <Modal className="new-user-modal" centered show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
            <div>
                <img src="assets/img/Logo.png" alt="" className="img-fluid logo" />
                <p>Pay close attention!</p>
                <p>You only have 5 referral codes. Your multiplier will depend on who you invite successfully to the platform.</p>
                
                <button className="common-btn bg-left">Proceed with wisdom <img src="assets/img/arrow_forward.png" alt="" /></button>
            </div>
        </Modal.Body>
      </Modal> */}

      {/* New share step 2 */}
      <Modal className="new-user-modal" centered show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
            <div>
                <img src="assets/img/Logo.png" alt="" className="img-fluid logo" />
                <p>Here are your referral codes</p>
                <div className="referal-copy-row">
                    <div>
                       <span>1</span>
                       X7G2PQ9Z
                    </div>
                    <a href=""><img src="assets/img/copy.png" alt="" /></a>
                </div>
                <div className="referal-copy-row">
                    <div>
                       <span>2</span>
                       X7G2PQ9Z
                    </div>
                    <a href=""><img src="assets/img/copy.png" alt="" /></a>
                </div>
                <div className="referal-copy-row">
                    <div>
                       <span>3</span>
                       X7G2PQ9Z
                    </div>
                    <a href=""><img src="assets/img/copy.png" alt="" /></a>
                </div>
                <div className="referal-copy-row">
                    <div>
                       <span>4</span>
                       X7G2PQ9Z
                    </div>
                    <a href=""><img src="assets/img/copy.png" alt="" /></a>
                </div>
                <div className="referal-copy-row">
                    <div>
                       <span>5</span>
                       X7G2PQ9Z
                    </div>
                    <a href=""><img src="assets/img/copy.png" alt="" /></a>
                </div>
                
            </div>
        </Modal.Body>
      </Modal>


      {/* wallet connect popup */}
      {/* <Modal className="new-user-modal wallet-connect" centered show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
            <div>
                <img src="assets/img/Logo.png" alt="" className="img-fluid logo" />
                <p>You’ll need an Ethereum wallet to sign in. <a href="" className="links">Learn more <img src="assets/img/open_in_new.png" alt="" /></a></p>
                <p>Once connected, you will need to sign a message to agree to the <a href="" className="links">legal disclaimer</a> before using this website.</p>
                
                <p><b>Connect with:</b></p>
                <a href="" className="browse-btn"><img src="assets/img/Icon.png" alt="" /> Browser Wallet</a>
                <a href="" className="wallet-connect"><img src="assets/img/connect.png" alt="" /> Wallet Connect</a>
            </div>
        </Modal.Body>
      </Modal> */}

      
    </>
  )
}
