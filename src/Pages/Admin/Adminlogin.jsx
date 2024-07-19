import React from 'react'
import {
    Container,
    Row,
    Col,
    Form,
   InputGroup,
  } from "react-bootstrap";

export const AdminLogin = () => {
  return (
    <>
    <section className="signup-sec">
     
        <Container>
          <Row>
            <Col lg={5} className="m-auto">
              <div className="outer-bg-signup">
                <h3> Welcome </h3>
                <h5>Admin Login</h5>

                <Form.Group className="mb-3">
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    
                    className="mb-0"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <InputGroup className="mb-3">
                    <Form.Control
                      type="password"
                      className="mb-0"
                      placeholder="Enter your password"
                      
                    />
                    <InputGroup.Text>
                   
                        <i className="fa fa-eye-slash"></i>
                     
                    </InputGroup.Text>
                  </InputGroup>
                </Form.Group>
                
                <div>
                  <button
                    className="common-btn w-100 m-0"
                   
                  >
                   Login
                  </button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  )
}
