import React, { useState } from 'react'
import { Header } from '../Components/Header'
import { Col, Container, Dropdown, Form, InputGroup, Modal, ProgressBar, Row, Tab, Tabs } from 'react-bootstrap'

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
                        <Col lg={5} >
                            <div className="top-deposit-box for-min-height">
                                <h4 className="sub-heading text-start">Top Deposits</h4>
                                <Row>
                                    <Col lg={6} md={6} sm={6} xs={6}>
                                        <div className="inner-user-box">
                                            <div className="user-img">
                                                <img src="assets/img/user.png" alt="" />
                                            </div>
                                            <h4>Suraj Khandwal</h4>
                                            <p>Jaipur, Rajsthan</p>
                                            <h3><b>$10,000</b> Deposited</h3>
                                        </div>
                                    </Col>
                                    <Col lg={6} md={6} sm={6} xs={6}>
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
                        <Col lg={7}>
                            <div className="top-deposit-box for-min-height">
                                <h4 className="sub-heading text-start">Top Referrals</h4>
                                <Row>
                                    <Col lg={4} md={4} sm={6} xs={6}>
                                        <div className="inner-user-box top-referrals">
                                            <div className="user-img">
                                                <img src="assets/img/user.png" alt="" />
                                            </div>
                                            <h4>Suraj Khandwal</h4>
                                            <p>Jaipur, Rajsthan</p>
                                            <div className="referral-point">
                                                <h3><img src="assets/img/referal.png" alt="" /> <b>345</b> <span>Referals</span></h3>
                                                <h3><img src="assets/img/trophy.png" alt="" /> <b>200</b> <span>Points</span></h3>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col lg={4} md={4} sm={6} xs={6}>
                                        <div className="inner-user-box top-referrals">
                                            <div className="user-img">
                                                <img src="assets/img/user.png" alt="" />
                                            </div>
                                            <h4>Suraj Khandwal</h4>
                                            <p>Jaipur, Rajsthan</p>
                                            <div className="referral-point">
                                                <h3><img src="assets/img/referal.png" alt="" /> <b>345</b> <span>Referals</span></h3>
                                                <h3><img src="assets/img/trophy.png" alt="" /> <b>200</b> <span>Points</span></h3>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col lg={4} md={4} sm={6} xs={6}>
                                        <div className="inner-user-box top-referrals">
                                            <div className="user-img">
                                                <img src="assets/img/user.png" alt="" />
                                            </div>
                                            <h4>Suraj Khandwal</h4>
                                            <p>Jaipur, Rajsthan</p>
                                            <div className="referral-point">
                                                <h3><img src="assets/img/referal.png" alt="" /> <b>345</b> <span>Referals</span></h3>
                                                <h3><img src="assets/img/trophy.png" alt="" /> <b>200</b> <span>Points</span></h3>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col lg={10} className="m-auto">
                            <div className="top-deposit-table">
                                <Tabs
                                    defaultActiveKey="top-depsit1"
                                    className="mb-3 "
                                >
                                    <Tab eventKey="top-depsit1" title="Monthly">
                                        <ul className="deposit-list-outer">
                                            <li>
                                                <div className="deposit-list-main">
                                                    <div className="left-user">
                                                        <div className="count-deposit">
                                                            <span>1</span>
                                                            <img className="crown-img" src="assets/img/king.png" alt="" />
                                                        </div>
                                                        <img className="user-img" src="assets/img/user.png" alt="" />
                                                        <div>
                                                            <h4>Suraj Khandwal</h4>
                                                            <p>Jaipur, Rajsthan</p>
                                                        </div>
                                                    </div>
                                                    <div className="right-trophy">
                                                        <img className="trophy-img" src="assets/img/trophy.png" alt="" />
                                                        <div>
                                                            <h4>9300</h4>
                                                            <p>Points</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="deposit-list-main">
                                                    <div className="left-user">
                                                        <div className="count-deposit">
                                                            <span>2</span>
                                                            <img className="crown-img" src="assets/img/crown.png" alt="" />
                                                        </div>
                                                        <img className="user-img" src="assets/img/user.png" alt="" />
                                                        <div>
                                                            <h4>Suraj Khandwal</h4>
                                                            <p>Jaipur, Rajsthan</p>
                                                        </div>
                                                    </div>
                                                    <div className="right-trophy">
                                                        <img className="trophy-img" src="assets/img/trophy.png" alt="" />
                                                        <div>
                                                            <h4>9300</h4>
                                                            <p>Points</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="deposit-list-main">
                                                    <div className="left-user">
                                                        <div className="count-deposit">
                                                            <span>3</span>
                                                            <img className="crown-img" src="assets/img/crown.png" alt="" />
                                                        </div>
                                                        <img className="user-img" src="assets/img/user.png" alt="" />
                                                        <div>
                                                            <h4>Suraj Khandwal</h4>
                                                            <p>Jaipur, Rajsthan</p>
                                                        </div>
                                                    </div>
                                                    <div className="right-trophy">
                                                        <img className="trophy-img" src="assets/img/trophy.png" alt="" />
                                                        <div>
                                                            <h4>9300</h4>
                                                            <p>Points</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="deposit-list-main">
                                                    <div className="left-user">
                                                        <div className="count-deposit">
                                                            <span>4</span>
                                                            <img className="crown-img" src="assets/img/crown.png" alt="" />
                                                        </div>
                                                        <img className="user-img" src="assets/img/user.png" alt="" />
                                                        <div>
                                                            <h4>Suraj Khandwal</h4>
                                                            <p>Jaipur, Rajsthan</p>
                                                        </div>
                                                    </div>
                                                    <div className="right-trophy">
                                                        <img className="trophy-img" src="assets/img/trophy.png" alt="" />
                                                        <div>
                                                            <h4>9300</h4>
                                                            <p>Points</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="deposit-list-main">
                                                    <div className="left-user">
                                                        <div className="count-deposit">
                                                            <span>5</span>
                                                            <img className="crown-img" src="assets/img/crown.png" alt="" />
                                                        </div>
                                                        <img className="user-img" src="assets/img/user.png" alt="" />
                                                        <div>
                                                            <h4>Suraj Khandwal</h4>
                                                            <p>Jaipur, Rajsthan</p>
                                                        </div>
                                                    </div>
                                                    <div className="right-trophy">
                                                        <img className="trophy-img" src="assets/img/trophy.png" alt="" />
                                                        <div>
                                                            <h4>9300</h4>
                                                            <p>Points</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="deposit-list-main">
                                                    <div className="left-user">
                                                        <div className="count-deposit">
                                                            <span>6</span>
                                                            <img className="crown-img" src="assets/img/crown.png" alt="" />
                                                        </div>
                                                        <img className="user-img" src="assets/img/user.png" alt="" />
                                                        <div>
                                                            <h4>Suraj Khandwal</h4>
                                                            <p>Jaipur, Rajsthan</p>
                                                        </div>
                                                    </div>
                                                    <div className="right-trophy">
                                                        <img className="trophy-img" src="assets/img/trophy.png" alt="" />
                                                        <div>
                                                            <h4>9300</h4>
                                                            <p>Points</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="deposit-list-main">
                                                    <div className="left-user">
                                                        <div className="count-deposit">
                                                            <span>7</span>
                                                            <img className="crown-img" src="assets/img/crown.png" alt="" />
                                                        </div>
                                                        <img className="user-img" src="assets/img/user.png" alt="" />
                                                        <div>
                                                            <h4>Suraj Khandwal</h4>
                                                            <p>Jaipur, Rajsthan</p>
                                                        </div>
                                                    </div>
                                                    <div className="right-trophy">
                                                        <img className="trophy-img" src="assets/img/trophy.png" alt="" />
                                                        <div>
                                                            <h4>9300</h4>
                                                            <p>Points</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                            
                                        </ul>
                                    </Tab>
                                    <Tab eventKey="top-depsit2" title="Quarterly">
                                    <ul className="deposit-list-outer">
                                            <li>
                                                <div className="deposit-list-main">
                                                    <div className="left-user">
                                                        <div className="count-deposit">
                                                            <span>1</span>
                                                            <img className="crown-img" src="assets/img/king.png" alt="" />
                                                        </div>
                                                        <img className="user-img" src="assets/img/user.png" alt="" />
                                                        <div>
                                                            <h4>Suraj Khandwal</h4>
                                                            <p>Jaipur, Rajsthan</p>
                                                        </div>
                                                    </div>
                                                    <div className="right-trophy">
                                                        <img className="trophy-img" src="assets/img/trophy.png" alt="" />
                                                        <div>
                                                            <h4>9300</h4>
                                                            <p>Points</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="deposit-list-main">
                                                    <div className="left-user">
                                                        <div className="count-deposit">
                                                            <span>2</span>
                                                            <img className="crown-img" src="assets/img/crown.png" alt="" />
                                                        </div>
                                                        <img className="user-img" src="assets/img/user.png" alt="" />
                                                        <div>
                                                            <h4>Suraj Khandwal</h4>
                                                            <p>Jaipur, Rajsthan</p>
                                                        </div>
                                                    </div>
                                                    <div className="right-trophy">
                                                        <img className="trophy-img" src="assets/img/trophy.png" alt="" />
                                                        <div>
                                                            <h4>9300</h4>
                                                            <p>Points</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="deposit-list-main">
                                                    <div className="left-user">
                                                        <div className="count-deposit">
                                                            <span>3</span>
                                                            <img className="crown-img" src="assets/img/crown.png" alt="" />
                                                        </div>
                                                        <img className="user-img" src="assets/img/user.png" alt="" />
                                                        <div>
                                                            <h4>Suraj Khandwal</h4>
                                                            <p>Jaipur, Rajsthan</p>
                                                        </div>
                                                    </div>
                                                    <div className="right-trophy">
                                                        <img className="trophy-img" src="assets/img/trophy.png" alt="" />
                                                        <div>
                                                            <h4>9300</h4>
                                                            <p>Points</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="deposit-list-main">
                                                    <div className="left-user">
                                                        <div className="count-deposit">
                                                            <span>4</span>
                                                            <img className="crown-img" src="assets/img/crown.png" alt="" />
                                                        </div>
                                                        <img className="user-img" src="assets/img/user.png" alt="" />
                                                        <div>
                                                            <h4>Suraj Khandwal</h4>
                                                            <p>Jaipur, Rajsthan</p>
                                                        </div>
                                                    </div>
                                                    <div className="right-trophy">
                                                        <img className="trophy-img" src="assets/img/trophy.png" alt="" />
                                                        <div>
                                                            <h4>9300</h4>
                                                            <p>Points</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="deposit-list-main">
                                                    <div className="left-user">
                                                        <div className="count-deposit">
                                                            <span>5</span>
                                                            <img className="crown-img" src="assets/img/crown.png" alt="" />
                                                        </div>
                                                        <img className="user-img" src="assets/img/user.png" alt="" />
                                                        <div>
                                                            <h4>Suraj Khandwal</h4>
                                                            <p>Jaipur, Rajsthan</p>
                                                        </div>
                                                    </div>
                                                    <div className="right-trophy">
                                                        <img className="trophy-img" src="assets/img/trophy.png" alt="" />
                                                        <div>
                                                            <h4>9300</h4>
                                                            <p>Points</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="deposit-list-main">
                                                    <div className="left-user">
                                                        <div className="count-deposit">
                                                            <span>6</span>
                                                            <img className="crown-img" src="assets/img/crown.png" alt="" />
                                                        </div>
                                                        <img className="user-img" src="assets/img/user.png" alt="" />
                                                        <div>
                                                            <h4>Suraj Khandwal</h4>
                                                            <p>Jaipur, Rajsthan</p>
                                                        </div>
                                                    </div>
                                                    <div className="right-trophy">
                                                        <img className="trophy-img" src="assets/img/trophy.png" alt="" />
                                                        <div>
                                                            <h4>9300</h4>
                                                            <p>Points</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="deposit-list-main">
                                                    <div className="left-user">
                                                        <div className="count-deposit">
                                                            <span>7</span>
                                                            <img className="crown-img" src="assets/img/crown.png" alt="" />
                                                        </div>
                                                        <img className="user-img" src="assets/img/user.png" alt="" />
                                                        <div>
                                                            <h4>Suraj Khandwal</h4>
                                                            <p>Jaipur, Rajsthan</p>
                                                        </div>
                                                    </div>
                                                    <div className="right-trophy">
                                                        <img className="trophy-img" src="assets/img/trophy.png" alt="" />
                                                        <div>
                                                            <h4>9300</h4>
                                                            <p>Points</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                            
                                        </ul>
                                    </Tab>

                                </Tabs>
                            </div>
                        </Col>
                    </Row>

                </Container>
            </section>
        </>
    )
}
