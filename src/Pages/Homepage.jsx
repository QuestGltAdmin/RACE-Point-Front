import React from 'react'
import { Headerhome } from '../Components/Headerhome'
import { Footer } from '../Components/Footer'
import { Col, Container, InputGroup, Row, Form } from 'react-bootstrap'

export const Homepage = () => {
  return (
    <>
    <Headerhome/>
    <section className="race-banner-sec">
       <Container>
          <Row className="align-items-center">
             <Col lg={7}>
                <div className="banner-content">
                    <h6><span>New</span> Race Testnet is out now</h6>
                   <h2 className="common-heading">Welcome to the Future of Real Asset Tokenization.</h2>
                   <p>Designed with the OP Stack, we bring real-world, cash-flow-yielding assets to the heart of Ethereum.</p>
                   <button className="gradient-border-btn"><span><img src="assets/img/linear_scale.png" alt="" /> Bridge to RACE</span></button>
                </div>
             </Col>
             <Col lg={5}>
                <div className="banner-img">
                  <img src="assets/img/banner-vid.gif" alt="" />
                </div>
             </Col>
          </Row>
          <Row>
            <Col>
               <div className="features-row">
                   <Row>
                      <Col lg={6}>
                          <h5 className="welcom-line"><span>Welcome to RACE:</span> Transforming Ethereum asset investments, facilitating compliance, and unlocking new markets</h5>
                      </Col>
                      <Col lg={4} className="ms-auto">
                          <p className="text-first-row">Governance at RACE: Transparent, decentralized decision-making. Explore our model in the White Paper.</p>
                          <button className="gradient-border-btn"><span><img src="assets/img/text_snippet.png" alt="" /> Bridge to RACE</span></button>
                      </Col>
                   </Row>
                   <Row>
                      <Col lg={5} className="offset-lg-1">
                          <div className="features-box-inner">
                              <div>
                                 <h4>Decentralized Private Advisory Network</h4>
                                 <p>PDA’s embedded within our platform assist new users in navigating the on-chain world, offering guidance at every step of their investment journey.</p>
                              </div>
                              <img src="assets/img/decentralize.png" alt="" />
                          </div>
                      </Col>
                      <Col lg={5} className="ms-auto mt-5">
                           <div className="features-box-inner ">
                              <div>
                                 <h4>Assets to Blockchain (ATB) Layer</h4>
                                 <p>Securely convert global assets into tokens under the watchful eye of our specialized, decentralized investment committee. This layer offers local expertise and compliance, giving investors the confidence to engage with assets across the globe.</p>
                              </div>
                              <img src="assets/img/swap.png" alt="" />
                          </div>
                      </Col>
                   </Row>

                   <Row>
                      <Col lg={5} className="offset-lg-3">
                           <div className="features-box-inner">
                              <div>
                                 <h4>Smart Wallet</h4>
                                 <p>Streamlining your entry into Web3 with seed and gas abstraction plus bundled transactions for a seamless investment experience.</p>
                              </div>
                              <img src="assets/img/Unlock.png" alt="" />
                          </div>
                      </Col>
                   </Row>
               </div>
            </Col>
          </Row>
       </Container>
    </section>
    <section className="community-sec">
       <Container>
          <Row className="align-items-center">
             <Col lg={7} md={8} sm={8}>
                <div className="community-content">
                    <h5>Community Values</h5>
                    <ul>
                      <li className="active">One</li>
                      <li>Two</li>
                      <li>Three</li>
                      <li>Four</li>
                    </ul>
                   <h4><span>Transparency:</span> Open and clear communication in operations and governance, allowing stakeholders to make informed decisions.</h4>
                   
                </div>
             </Col>
             <Col lg={4} md={4} sm={4} className="ms-auto">
                <div className="community-img">
                  <div className="text-end">
                     <button className="gradient-border-btn"><span><img src="assets/img/text_snippet.png" alt="" /> Read White Paper</span></button>
                  </div>
                  <img src="assets/img/layer.png" className="big-img" alt="" />
                </div>
             </Col>
          </Row>
        </Container>
     </section>
     <section className="">
       <Container>
          <Row >
             <Col lg={12}>
                <div className="newsletter-box-new">
                    <h6><span>Subscribe</span> Stay up to dat</h6>
                   <p>Be the first to find out about latest news and launches</p>
                   <InputGroup className="mb-3">
                     <InputGroup.Text><i className="fa fa-search"></i></InputGroup.Text>
                     <Form.Control type="text" placeholder="Enter your email here" />
                     <button className="common-btn left-bg">Subscribe</button>
                  </InputGroup>
                </div>
             </Col>
          </Row>
       </Container>
     </section>

     <Footer/>
    </>
  )
}
