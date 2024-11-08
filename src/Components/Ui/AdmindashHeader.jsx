import React, { useEffect } from "react";
import { Col, Container, Nav, Navbar, Row } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logout } from "../../store/reducers/authReducer";
import { useDispatch } from "react-redux";
import useAuth from "../../hooks/useAuth";
import { jwtDecode } from "jwt-decode";

export const AdmindashHeader = () => {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const HandleLogout = async () => {
    toast.success("Logged Out Successfully!");
    navigate("/");
    dispatch(logout({}));
  };

  const verifyTokenSignature = () => {
    try {
      let newDate = new Date();
      newDate = newDate.toISOString();
      const token = user.token;
      const decoded = jwtDecode(token);
      const date = new Date(decoded?.exp * 1000);
      const isoString = date.toISOString();
      if (newDate > isoString) {
        HandleLogout();
      }
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    verifyTokenSignature();
  }, [location]);
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
                          navigate("/main-dashboard");
                        }}
                      >
                        <i className="fa fa-th-large"></i> DASHBOARD
                      </Nav.Link>
                      <Nav.Link
                        onClick={() => {
                          navigate("/main-leaderboard");
                        }}
                      >
                        <i className="fa fa-money"></i> LEADER BOARD
                      </Nav.Link>

                      <Nav.Link
                        onClick={() => {
                          navigate("/main-userlist");
                        }}
                      >
                        <i className="fa fa-exchange"></i>USER LIST
                      </Nav.Link>

                      <Nav.Link
                        onClick={() => {
                          navigate("/main-genealogy");
                        }}
                      >
                        <i className="fa fa-exchange"></i>USER GENEALOGY
                      </Nav.Link>

                      <Nav.Link
                        onClick={() => {
                          navigate("/main-earnpoint");
                        }}
                      >
                        <i className="fa fa-exchange"></i>EARN POINT STATEMENT
                      </Nav.Link>

                      <Nav.Link
                        onClick={() => {
                          navigate("/main-update-multi");
                        }}
                      >
                        <i className="fa fa-exchange"></i>MULTIPLIER
                      </Nav.Link>

                      <Nav.Link
                        onClick={() => {
                          navigate("/main-token-list");
                        }}
                      >
                        <i className="fa fa-exchange"></i>VAULT LIST
                      </Nav.Link>
                      {/* <Nav.Link
                        onClick={() => {
                          navigate("/main-activity");
                        }}
                      >
                        <i className="fa fa-exchange"></i>ACTIVITY
                      </Nav.Link> */}
                        <Nav.Link
                        onClick={() => {
                          navigate("/main-add-manager");
                        }}
                      >
                        <i className="fa fa-exchange"></i>ADD PROTOCOL MANAGER 
                      </Nav.Link>
                      <Nav.Link
                        onClick={() => {
                          navigate("/main-add-user");
                        }}
                      >
                        <i className="fa fa-exchange"></i>ADD WALLET
                      </Nav.Link>

                      <Nav.Link onClick={() => HandleLogout()}>
                        <i className="fa fa-sign-out"></i> LOGOUT
                      </Nav.Link>
                    </Nav>
                  </Navbar.Collapse>

                  <div className="d-flex align-items-center">
                    {/* <Nav.Link className="user-profile-icon">
                    {user?.email?.replace(user?.email?.substring(4 , 15) , "...")}
                    </Nav.Link> */}

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
