import React from "react";
import { Col, Container, Nav, Navbar, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logout } from "../../store/reducers/authReducer";
import { useDispatch } from "react-redux";

export const AdmindashHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
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
                          navigate("/admin-dashboard");
                        }}
                      >
                        <i className="fa fa-th-large"></i> DASHBOARD
                      </Nav.Link>
                      <Nav.Link
                        onClick={() => {
                          navigate("/admin-leaderboard");
                        }}
                      >
                        <i className="fa fa-money"></i> LEADER BOARD
                      </Nav.Link>

                      <Nav.Link
                        onClick={() => {
                          navigate("/admin-userlist");
                        }}
                      >
                        <i className="fa fa-exchange"></i>USER LIST
                      </Nav.Link>

                      <Nav.Link
                        onClick={() => {
                          navigate("/admin-genealogy");
                        }}
                      >
                        <i className="fa fa-exchange"></i>USER GENEALOGY
                      </Nav.Link>

                      <Nav.Link
                        onClick={() => {
                          navigate("/admin-earnpoint");
                        }}
                      >
                        <i className="fa fa-exchange"></i>EARN POINT STATEMENT
                      </Nav.Link>

                      <Nav.Link
                        onClick={() => {
                          navigate("/admin-update-multi");
                        }}
                      >
                        <i className="fa fa-exchange"></i>MULTIPLIER
                      </Nav.Link>

                      <Nav.Link onClick={() => HandleLogout()}>
                        <i className="fa fa-sign-out"></i> LOGOUT
                      </Nav.Link>
                    </Nav>
                  </Navbar.Collapse>

                  <div className="d-flex align-items-center">
                    <Nav.Link className="user-profile-icon">
                      <img src="assets/img/user.png" alt="" /> Admin
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
  );
};
