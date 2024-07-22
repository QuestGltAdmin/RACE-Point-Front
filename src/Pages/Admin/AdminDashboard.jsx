import React from 'react'
import { AdmindashHeader } from '../../Components/Ui/AdmindashHeader'
import { Col, Container, Row } from 'react-bootstrap'

export const AdminDashboard = () => {
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
                    <h2 className="inner-page-heading">Dashboard</h2>

                    <Row>
                      <Col lg={4} md={6} sm={6} xs={12}>
                        <div className="shadow-box-dash">
                          <img
                            className="img-coin"
                            src="assets/images/user11.png"
                            alt=""
                          />
                          <h4>35</h4>
                          <p>Total User Count</p>
                        </div>
                      </Col>
                      <Col lg={4} md={6} sm={6} xs={12}>
                        <div className="shadow-box-dash">
                        <img
                            className="img-coin"
                            src="assets/images/money.png"
                            alt=""
                          />
                          <h4>200</h4>
                          <p>Total Deposit Count</p>
                        </div>
                      </Col>
                      <Col lg={4} md={6} sm={6} xs={12}>
                        <div className="shadow-box-dash">
                        <img
                            className="img-coin"
                            src="assets/images/user11.png"
                            alt=""
                          />
                          <h4>45</h4>
                          <p>Total transaction Count</p>
                        </div>
                      </Col>
                     
                    </Row>
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
