import React, { useState } from 'react'
import { Header } from '../Components/Header'
import { Col, Container, Dropdown, Form, InputGroup, Modal, ProgressBar, Row } from 'react-bootstrap'

export const Leaderboard = () => {
  return (
    <>
    <Header />
    <section className="leaderboard-main-sec">
        <Container>
            <Row>
                <Col>
                   <h2 className="common-heading">Leaderboard</h2>
                </Col>
            </Row>
            <Row>
                <Col lg={5}>
                    <div className="top-deposit-box">
                       <h4 className="sub-heading text-start">Top Deposits</h4>
                        <Row>
                            <Col lg={6}>
                                <div className="inner-user-box">
                                    <div className="user-img">
                                       <img src="assets/img/user.png" alt="" />
                                    </div>
                                    <h4>Suraj Khandwal</h4>
                                    <p>Jaipur, Rajsthan</p>
                                    <h3><b>$10,000</b> Deposited</h3>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
        </Container>
    </section>
</>
  )
}
