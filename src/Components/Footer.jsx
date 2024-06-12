import React from 'react'
import { Col, Container, Form, InputGroup, Row } from 'react-bootstrap'

export const Footer = () => {
  return (
    <>
    <footer className="footer-main">
        <section>
           <Container>
             <Row>
               <Col lg={4}>
                 <div className="footer-logo-box">
                    <h2><img src="assets/img/Logo.png" alt="" /> RACE Foundation</h2>
                    <p>Designed with the OP Stack, we bring real-world, cash-flow-yielding assets to the heart of Ethereum.</p>
                    <InputGroup className="mb-3">
                      <Form.Control type="text" placeholder="Bridge now to RACE" />
                      <button className="common-btn left-bg">Visit Bridge</button>
                    </InputGroup>
                 </div>
               </Col>
               <Col lg={8}>
                 <Row>
                    <Col lg={3} md={3} sm={6}>
                      <div className="quick-links">
                         <h5>GOVERNANCE</h5>
                         <a href="">vHouse</a>
                         <a href="">aHouse</a>
                         <a href="">Executive Council</a>
                      </div>
                    </Col>
                    <Col lg={3} md={3} sm={6}>
                      <div className="quick-links">
                         <h5>ECONOMY</h5>
                         <a href="">Community</a>
                         <a href="">RACE Wallet</a>
                      </div>
                    </Col>
                    <Col lg={3} md={3} sm={6}>
                      <div className="quick-links">
                         <h5>DEVELOPERS</h5>
                         <a href="">Documentation</a>
                         <a href="">Block Explorer</a>
                         <a href="">Status</a>
                         <a href="">Bug Bounty</a>
                         <a href="">Github</a>
                      </div>
                    </Col>
                    <Col lg={3} md={3} sm={6}>
                      <div className="quick-links">
                         <h5>MORE</h5>
                         <a href="">Industry Adoption</a>
                         <a href="">Team</a>
                         <a href="">Security</a>
                         <a href="">Contact</a>
                      </div>
                    </Col>
                 </Row>
               </Col>
             </Row>
             <p className="copyright-line">© 2024 RACE. All rights reserved.</p>
           </Container>
        </section>
    </footer>
    </>
  )
}
