import React, { useState } from 'react'
import { Header } from '../Components/Header'
import { Col, Container, Row } from 'react-bootstrap'

export const Activities = () => {
  return (
    <>
    <Header />
    <section className="leaderboard-main-sec">
        <Container>
            <Row>
                <Col md={11} className="m-auto">
                    <h2 className="common-heading text-start mb-2">Activities</h2>
                    <p className="sub-heading text-start">Complete the activities below and earn points</p>

                    <div className="deposit-outer-box">
                        <div className="deposit-inner-box">
                            <img src="assets/images/deposit.png" alt="" />
                            <div>
                                <h3>Deposit</h3>
                                <p>Deposit in one of our vaults in one of our partner chains</p>
                            </div>
                        </div>
                        <button className="common-btn bg-left">
                            <img src="assets/images/save_alt.png" alt="" />Deposit now
                        </button>
                    </div>

                    <h2 className="common-heading text-start mb-2 font-mid">Multiplier</h2>

                    <div className="deposit-outer-box d-block">
                        <div className="invite-flex">
                            <div className="deposit-inner-box">
                                    <img src="assets/images/invite.png" alt="" />
                                    <div>
                                        <h3>Invite</h3>
                                        <h5>5x invites available</h5>
                                        <p>Invite your friends to join the race and earn more points!</p>
                                        
                                    </div>
                                </div>
                                <button className="common-btn bg-left">
                                    <img src="assets/images/share.png" alt="" />Invite now
                                </button>
                         </div>
                        <div className="coming-soon-box">
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
                            <h6><span>Coming Soon!</span></h6>
                        </div>
                    </div>



                </Col>
            </Row>
        </Container>
    </section>
</>
  )
}
