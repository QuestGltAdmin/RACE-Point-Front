import React from 'react'
import { Headerhome } from '../Components/Headerhome'
import { Footer } from '../Components/Footer'
import { Col, Container, InputGroup, Row, Form } from 'react-bootstrap'

export const Governace = () => {
  return (
    <>
    <Headerhome/>
    <section className="race-banner-sec governance-sec pb-0">
       <Container>
          <Row className="align-items-center">
             <Col lg={8}>
                <div className="banner-content">
                   <h2 className="common-heading">The RACE Governance</h2>
                   <p>At the heart of the RACE platform lies a robust governance system, meticulously designed to balance progressive innovation with steadfast reliability. Our governance framework ensures that every stakeholder has a voice, and every decision upholds our commitment to transforming real estate investment through blockchain technology.</p>
                   
                   <div className="read-more-box">
                        <div>
                                <p>Executive Council</p>
                                <a href="">Read more <img src="assets/img/arrow-gradient.png" alt="" /></a>
                        </div>
                        <div>
                                <p>vHouse</p>
                                <a href="">Read more <img src="assets/img/arrow-gradient.png" alt="" /></a>
                        </div>
                        <div>
                                <p>aHouse</p>
                                <a href="">Read more <img src="assets/img/arrow-gradient.png" alt="" /></a>
                        </div>
                   </div>


                </div>
             </Col>
             <Col lg={3} className="ms-auto">
                <div className="banner-img">
                  <img src="assets/img/banner-governance.png" className="img-fluid" alt="" />
                </div>
             </Col>
          </Row>
       
       </Container>
    </section>
    <section className="ahouse-sec">
       <Container>
          <h2 className="common-heading">aHouse</h2>
          <Row >
             <Col lg={5}>
                <div className="retro-active-box">
                    <img src="assets/img/liquidity.png" className="main-img" alt="" />
                    <h3 className="sub-heading">Monetary Policy Committee <img src="assets/img/info-white.png" alt="" /></h3>
                    <div className="info-popup">
                       <img src="assets/img/info-white.png" alt="" />
                       <span> Committee is currently being managed by Foundation Council until the legislative branch be elected according to the governance timeline. In specific the Monetary policy Committee has been forward guided by the following annex.</span>
                       <img src="assets/img/close.png" alt="" />
                    </div>
                    <p>The Monetary Policy Committee (MPC) is the financial steward of the RACE platform, responsible for ensuring the long-term economic stability and growth of our ecosystem.</p>
                    <p>Comprising elected vHouse members, the MPC carefully calibrates monetary policies to support a thriving economy, balancing token supply with market demand, and incentivizing meaningful participation.</p>
                </div>
             </Col>
             <Col lg={2}>
                <img src="assets/img/cone-img-2.png" className="img-fluid cone-img" alt="" />
             </Col>
             <Col lg={5}>
                <div className="retro-active-box">
                    <img src="assets/img/money-bag.png" className="main-img" alt="" />
                    <h3 className="sub-heading">Grants Committee <img src="assets/img/info-white.png" alt="" /></h3>
                    <div className="info-popup">
                       <img src="assets/img/info-white.png" alt="" />
                       <span> Committee is currently being managed by Foundation Council until the legislative branch be elected
                       according to the governance timeline.</span>
                       <img src="assets/img/close.png" alt="" />
                    </div>
                    <p>The Grants Committee is the nurturing hand that seeds growth and innovation within the RACE ecosystem. Tasked with identifying and supporting promising projects, this committee allocates resources to initiatives that align with our strategic vision.</p>
                    <p>Through these grants, we empower developers, entrepreneurs, and visionaries to contribute to the vibrant landscape of asset tokenization.</p>
                </div>
             </Col>
          </Row>
       </Container>
     </section>

    <section className="ahouse-sec">
       <Container>
          <h2 className="common-heading">aHouse</h2>
          <Row >
             <Col lg={5}>
                <div className="retro-active-box">
                    <img src="assets/img/web3.png" className="main-img" alt="" />
                    <h3 className="sub-heading">RetroActive Public Goods Funding <img src="assets/img/info-white.png" alt="" /></h3>
                    <div className="info-popup">
                       <img src="assets/img/info-white.png" alt="" />
                       <span> Committee is currently being managed by Foundation Council until the legislative branch be elected
                       according to the governance timeline.</span>
                       <img src="assets/img/close.png" alt="" />
                    </div>
                    <p>Recognizing the value of contributions over time, the RetroActive Public Goods Funding initiative is our way of honoring the projects and individuals whose past work has enriched the public domain. This retrospective funding approach ensures that valuable contributions, often overlooked, receive the acknowledgement and support they deserve.</p>
                </div>
             </Col>
             <Col lg={2}>
                <img src="assets/img/cone-img.png" className="img-fluid cone-img" alt="" />
             </Col>
             <Col lg={5}>
                <div className="retro-active-box">
                    <img src="assets/img/web3.png" className="main-img" alt="" />
                    <h3 className="sub-heading">DIC Committee <img src="assets/img/info-white.png" alt="" /></h3>
                    <div className="info-popup">
                       <img src="assets/img/info-white.png" alt="" />
                       <span> Committee is currently being managed by Foundation Council until the legislative branch be elected
                       according to the governance timeline. In specific the DIC has been forward guided by the following annex.</span>
                       <img src="assets/img/close.png" alt="" />
                    </div>
                    <p>The Decentralized Investment Committee (DIC) oversees the strategic deployment
of investments within the RACE platform. As a visionary collective, the DIC ensures that each
investment aligns with our principles of decentralization, yielding sustainable returns while bolstering the integrity and diversity.</p>
                </div>
             </Col>
          </Row>
       </Container>
     </section>

    <section className="">
       <Container>
          <Row >
             <Col lg={12}>
                <div className="newsletter-box-new executive-box">
                   <img src="assets/img/circles-icon.png" className="circles-img" alt="" />
                    <h3 className="sub-heading mt-3">Executive Council</h3>
                   <p>The Executive Council is the strategic core of RACE, currently composed of foundation members with the foresight to guide us through our formative years. The council's members are pioneers in their fields, offering a wealth of experience and knowledge to steer the platform towards its full potential.</p>
                    <p>As we approach 2025, the council will evolve through elections, embracing a democratic transition to further embed the principles of decentralization into our governance fabric.</p>
                    <button className="common-btn left-bg"><img src="assets/img/icon-menu.png" alt="" /> Read documentation</button>
                </div>
             </Col>
          </Row>
       </Container>
     </section>
    <Footer/>
    </>
  )
}
