import React, { useState } from "react";
import { Header } from "../Components/Header";
import {
  Col,
  Container,
  Dropdown,
  Form,
  InputGroup,
  Modal,
  ProgressBar,
  Row,
} from "react-bootstrap";

export const Depositstepfirst = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Header />
      <section className="deposit-step-sec">
        <Container>
          <Row>
            <Col>
              <h2 className="common-heading">Start Your Points Journey</h2>
            </Col>
          </Row>
          <Row>
            <Col lg={3} md={6} sm={6} xs={6}>
              <div className="coin-box">
                <img src="assets/img/coin1.png" alt="" />
                <h3>Optimism</h3>
                <h5>Deposit in</h5>
                <div className="btn-row">
                  <button onClick={handleShow} className="coin-btn">
                    USDC
                  </button>
                  <button className="coin-btn">Tether</button>
                </div>
              </div>
            </Col>
            <Col lg={3} md={6} sm={6} xs={6}>
              <div className="coin-box">
                <img src="assets/img/coin2.png" alt="" />
                <h3>Polygon</h3>
                <h5>Deposit in</h5>
                <div className="btn-row">
                  <button className="coin-btn">USDC</button>
                  <button className="coin-btn">Tether</button>
                </div>
              </div>
            </Col>
            <Col lg={3} md={6} sm={6} xs={6}>
              <div className="coin-box">
                <img src="assets/img/coin3.png" alt="" />
                <h3>Arbitrium</h3>
                <h5>Deposit in</h5>
                <div className="btn-row">
                  <button className="coin-btn">USDC</button>
                  <button className="coin-btn">Tether</button>
                </div>
              </div>
            </Col>
            <Col lg={3} md={6} sm={6} xs={6}>
              <div className="coin-box">
                <img src="assets/img/coin4.png" alt="" />
                <h3>Base</h3>
                <h5>Deposit in</h5>
                <div className="btn-row">
                  <button className="coin-btn">USDC</button>
                  <button className="coin-btn">Tether</button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* deposite 1 popup  */}
      {/* <Modal className="network-popup" size="lg" centered show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
            <div>
                <h4 className="sub-heading">Choose Network</h4>
                <div className="radio-check-row">
                    <div className="radio-check-box active">
                        <Form.Check
                            checked
                            type="radio"
                        />
                        <div className="inner-img">
                            <img src="assets/img/coin5.png" alt="" />
                            <h5>Ethereum</h5>
                        </div>
                    </div>
                    <div className="radio-check-box">
                        <Form.Check

                            type="radio"
                        />
                        <div className="inner-img">
                            <img src="assets/img/coin2.png" alt="" />
                            <h5>Polygon</h5>
                        </div>
                    </div>
                    <div className="radio-check-box">
                        <Form.Check

                            type="radio"
                        />
                        <div className="inner-img">
                            <img src="assets/img/coin1.png" alt="" />
                            <h5>Optimism</h5>
                        </div>
                    </div>
                    <div className="radio-check-box">
                        <Form.Check

                            type="radio"
                        />
                        <div className="inner-img">
                            <img src="assets/img/coin3.png" alt="" />
                            <h5>Arbitrium</h5>
                        </div>
                    </div>
                    <div className="radio-check-box">
                        <Form.Check

                            type="radio"
                        />
                        <div className="inner-img">
                            <img src="assets/img/coin4.png" alt="" />
                            <h5>Base</h5>
                        </div>
                    </div>
                </div>

                <h4 className="sub-heading mt-1">Choose Wallet</h4>
                <div className="radio-check-row">
                    <div className="radio-check-box active">
                        <Form.Check
                            checked
                            type="radio"
                        />
                        <div className="inner-img">
                            <img src="assets/img/coin6.png" alt="" />
                            <h5>Metamask</h5>
                        </div>
                    </div>
                    <div className="radio-check-box">
                        <Form.Check

                            type="radio"
                        />
                        <div className="inner-img">
                            <img src="assets/img/coin7.png" alt="" />
                            <h5>Coinbase Wallet</h5>
                        </div>
                    </div>
                    <div className="radio-check-box">
                        <Form.Check

                            type="radio"
                        />
                        <div className="inner-img">
                            <img src="assets/img/coin8.png" alt="" />
                            <h5>WalletConnect</h5>
                        </div>
                    </div>
                    
                </div>

                <div className="connect-wallet-text">
                    <p>By connecting a wallet, you agree to RACE’s Terms of Use.</p>
                    <h6>What is a Wallet?</h6>
                    <p>A wallet stores and sends digital assets. It allows one-click logins, no password required.</p>

                    <div className="more-link">
                        <a href="">Install a Wallet</a>
                        <a href="">Learn more</a>
                    </div>
                </div>


            </div>
        </Modal.Body>
      </Modal> */}

      {/* deposite popup 2 */}
      {/* <Modal className="network-popup deposit-input-popup" size="md" centered show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
            <div>
                <h4 className="sub-heading">Deposit</h4>

                <div className="error-note">
                   <img src="assets/img/warning.png" alt="" />
                   Trading is not available for people or entities in US and other restricted jurisdictions
                </div>

                <Form.Group className="mb-3 form-row">
                    <Form.Label>Buy with</Form.Label>
                    <div className="input-flex-row">
                        <InputGroup className="">
                            <Form.Control
                            placeholder="0.00"
                            />
                            <InputGroup.Text>max</InputGroup.Text>
                        </InputGroup>
                        <Dropdown>
                            <Dropdown.Toggle>
                            <img src="assets/img/coin5.png" alt="" />  ETH
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <p>Balance: 0</p>
                </Form.Group>

                <div>
                    <ProgressBar className="progress-main-line" variant="success" now={4} />
                </div>
                <div className="date-rang-percentage ">
                    <span className="active">0%</span>
                    <span>25%</span>
                    <span>50%</span>
                    <span>75%</span>
                    <span>100%</span>
                </div>


                <Form.Group className="mb-3 form-row">
                    <Form.Label>Base Points</Form.Label>
                    <div className="input-flex-row">
                        <InputGroup className="">
                            <Form.Control
                            placeholder="0.00"
                            />
                            <InputGroup.Text>max</InputGroup.Text>
                        </InputGroup>
                        <Dropdown>
                            <Dropdown.Toggle>
                            <img src="assets/img/coin5.png" alt="" />  RACE
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <p>Balance: 0</p>
                </Form.Group>


                <div className="by-with-test mt-4">
                   Buy with:
                   <span>~ $0</span>
                </div>

                <div className="by-with-test">
                Received:
                   <span>~ $0</span>
                </div>

                <button className="common-btn bg-left ">Enter USDC Amount</button>
                <button className="common-btn bg-left disable-btn">Not available for US</button>

                <button className="withdraw-btn">Withdraw <img src="assets/img/withdraw.png" alt="" /></button>
                
                

                


            </div>
        </Modal.Body>
      </Modal> */}

      {/* deposite popup 3 */}
      {/* <Modal className="new-user-modal network-popup deposit-input-popup" size="md" centered show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
            <div>
                <h4 className="sub-heading">Withdraw</h4>
                <Form.Group className="mb-3 form-row feedback-check">
                    <Form.Label> We’d love to hear your feedback</Form.Label>
                    <Form.Check type="radio" label="The points system is too complex for me." />
                    <Form.Check type="radio" label="I don't see enough value in the points I accumulate." />
                    <Form.Check type="radio" label="I find it difficult to use or track my point" />
                    <Form.Check type="radio" label="I have found better incentives with other platforms." />
                    <Form.Check type="radio" label="I'm not engaged enough with the platform to benefit from points." />
                    <Form.Check type="radio" label="There aren't enough options or desirable rewards available." />
                    <Form.Check type="radio" label="Earning points takes too long for any tangible benefit." />
                    <Form.Check type="radio" label="Other reasons not listed (please specify in a few words)." />
                </Form.Group>

                <Form.Group className="mb-3 outer-input other-reason-box">
                    <Form.Label>Other Reason</Form.Label>
                    <Form.Control type="text" checked placeholder="What other feedback do you have?" />
                </Form.Group>

                <button className="common-btn bg-left ">Continue to withdraw</button>
            </div>
        </Modal.Body>
      </Modal> */}

      {/* deposite popup withdraw */}
      <Modal
        className="network-popup deposit-input-popup"
        size="md"
        centered
        show={show}
        onHide={handleClose}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div>
            <h4 className="sub-heading">Withdraw</h4>

            <Form.Group className="mb-3 form-row">
              <Form.Label>Sell</Form.Label>
              <div className="input-flex-row">
                <InputGroup className="">
                  <Form.Control placeholder="0.00" />
                  <InputGroup.Text>max</InputGroup.Text>
                </InputGroup>
                <Dropdown>
                  <Dropdown.Toggle>
                    <img src="assets/img/favicon.png" alt="" /> RACE
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">
                      Another action
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-3">
                      Something else
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              <p>
                Balance: <span>22.389485</span>
              </p>
            </Form.Group>

            <div>
              <ProgressBar
                className="progress-main-line"
                variant="success"
                now={4}
              />
            </div>
            <div className="date-rang-percentage ">
              <span className="active">0%</span>
              <span>25%</span>
              <span>50%</span>
              <span>75%</span>
              <span>100%</span>
            </div>

            <Form.Group className="mb-3 form-row">
              <Form.Label>Receive</Form.Label>
              <Dropdown className="recieve-dropdown-new">
                <Dropdown.Toggle>
                  <img src="assets/img/daller.png" alt="" /> USDC
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">
                    <img src="assets/img/asset.png" alt="" /> All Assets
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-2">
                    <img src="assets/img/daller.png" alt="" /> USDC
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-3">
                    <img src="assets/img/coin5.png" alt="" /> WETH
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>

            <div className="by-with-test with-img mt-4">
              <div>
                <img src="assets/img/daller.png" alt="" />
                USDC
              </div>
              <span>~ $0</span>
            </div>
            <div className="by-with-test race-value-box mt-3">
              <span>
                <img src="assets/img/info.png" alt="" /> RACE = 200 USDC ($2.03)
              </span>
            </div>

            <button className="common-btn bg-left ">Enter USDC Amount</button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
