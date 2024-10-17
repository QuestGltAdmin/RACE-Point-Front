import React, { useEffect } from "react";
import { Col, Container, Nav, Navbar, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../store/reducers/authReducer";

const SuperUserHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const HandleLogout = async () => {
    toast.success("Logged Out Successfully!");
    navigate("/");
    dispatch(logout({}));
  };

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
                          navigate("/manager-dashboard");
                        }}
                      >
                        <i className="fa fa-th-large"></i> DASHBOARD
                      </Nav.Link>
                      <Nav.Link
                        onClick={() => {
                          navigate("/manager-leaderboard");
                        }}
                      >
                        <i className="fa fa-money"></i> LEADER BOARD
                      </Nav.Link>
                      <Nav.Link
                        onClick={() => {
                          navigate("/manager-list");
                        }}
                      >
                        <i className="fa fa-exchange"></i>USER LIST
                      </Nav.Link>
                      <Nav.Link
                        onClick={() => {
                          navigate("/manager-genealogy");
                        }}
                      >
                        <i className="fa fa-exchange"></i>USER GENEALOGY
                      </Nav.Link>
                      <Nav.Link
                        onClick={() => {
                          navigate("/manager-earnpoints");
                        }}
                      >
                        <i className="fa fa-exchange"></i>EARN POINT STATEMENT
                      </Nav.Link>
                      <Nav.Link
                        onClick={() => {
                          navigate("/manager-refferals-earnpoints");
                        }}
                      >
                        <i className="fa fa-exchange"></i>REFFERALS EARN POINT
                      </Nav.Link>{" "}
                      <Nav.Link onClick={() => HandleLogout()}>
                        <i className="fa fa-sign-out"></i> LOGOUT
                      </Nav.Link>
                    </Nav>
                  </Navbar.Collapse>

                  <div className="d-flex align-items-center">
                    <a
                      style={{ cursor: "pointer" }}
                      className="common-btn bg-left"
                      onClick={() => {
                        navigate("/dashboard");
                      }}
                    >
                      Back
                    </a>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </Navbar>
      </header>
    </>
  );
};

export default SuperUserHeader;
