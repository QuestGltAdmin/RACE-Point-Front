import React from 'react'
import { Col, Container, Nav, Navbar, Row } from 'react-bootstrap';

export const AdmindashHeader = () => {
  return (
    <>
      <header className="admin-dash-header">
        <Navbar expand="lg" sticky="top">
          <Container fluid>
            <Row className="w-100 m-auto">
              <Col>
                <div className="d-flex justify-content-between align-items-center">
                <Navbar.Brand
                    onClick={() => {
                      navigate("/");
                    }}
                  >
                    <h1>
                      <img src="assets/img/Logo.png" alt="" /> Points
                    </h1>
                  </Navbar.Brand>
           

                  <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                      <Nav.Link
                        onClick={() => {
                          navigate("/");
                        }}
                      >
                        <i className="fa fa-th-large"></i> DASHBOARD
                      </Nav.Link>
                      <Nav.Link
                        onClick={() => {
                          navigate("/");
                        }}
                      >
                        <i className="fa fa-money"></i> LEADER BOARD
                      </Nav.Link>
                
                      <Nav.Link
                        onClick={() => {
                          navigate("/");
                        }}
                      >
                        <i className="fa fa-exchange"></i>USER LIST
                      </Nav.Link>

                      <Nav.Link
                        onClick={() => {
                          navigate("/");
                        }}
                      >
                        <i className="fa fa-exchange"></i>USER GENEALOGY
                      </Nav.Link>

                      <Nav.Link
                        onClick={() => {
                          navigate("/");
                        }}
                      >
                        <i className="fa fa-exchange"></i>EARN POINT STATEMENT
                      </Nav.Link>
                 
                    

                      <Nav.Link onClick={() => HandleLogout()}>
                        <i className="fa fa-sign-out"></i> LOGOUT
                      </Nav.Link>
                    </Nav>
                  </Navbar.Collapse>

                     <div className="d-flex align-items-center">
                      <Nav.Link className="user-profile-icon">
                        <img src="assets/img/user.png" alt="" /> Admin Patidar
                      </Nav.Link>

                       <Navbar.Toggle aria-controls="basic-navbar-nav" />
                     </div>
                </div>
              </Col>
            </Row>
          </Container>
        </Navbar>
      </header>
    </>
  )
}
