import React, { useCallback, useEffect, useState } from "react";
import { AdmindashHeader } from "../../Components/Ui/AdmindashHeader";
import { Col, Container, Form, InputGroup, Modal, Row } from "react-bootstrap";
import useAuth from "../../hooks/useAuth";
import axiosMain from "../../http/axios/axios_main";
import { debounce } from "lodash";
import moment from "moment/moment";
import { toast } from "react-toastify";

export const AdminAddUsers = () => {
  //==================================Global Variable================================//
  const { user } = useAuth();
  //==================================End of code================================//

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="dashboard-layout">
        <AdmindashHeader />
        <section className="outer-dash-section">
          <Container>
            <Row>
              <Col lg={12}>
                <div className="dashboard-white-box">
                  <div className="w-100">
                    <h2 className="inner-page-heading">User List</h2>

                    <div className="table-box-new shadow-box-main">
                      <div className="d-flex align-items-center justify-content-between mb-3">
                          <InputGroup className=" search-input">
                            <Form.Control
                              placeholder="Search...."
                              name="searchTrxAll"
                              type="text"
                            />
                            <InputGroup.Text id="basic-addon2">
                              <a href="">
                                <i class="fa fa-search"></i>
                              </a>
                            </InputGroup.Text>
                          </InputGroup>
                          <button onClick={handleShow} className="common-btn bg-left">+ Add User Wallet</button>
                      </div>
                      <div className="table-view-transaction">
                        <div className="thead">
                          <div>
                            <p>S. no</p>
                            <p>Wallet Address</p>
                            <p>Status</p>
                          </div>
                        </div>
                        <div className="tbody">
                          <div>
                            <p>1</p>
                            <p>0x51EFE4987D9D22032aba856A8E6472913cf1Fa04</p>
                            <p>Active</p>
                          </div>
                          <div>
                            <p>2</p>
                            <p>0x51EFE4987D9D22032aba856A8E6472913cf1Fa04</p>
                            <p>Active</p>
                          </div>
                          <div>
                            <p>3</p>
                            <p>0x51EFE4987D9D22032aba856A8E6472913cf1Fa04</p>
                            <p>Active</p>
                          </div>
                          <div>
                            <p>4</p>
                            <p>0x51EFE4987D9D22032aba856A8E6472913cf1Fa04</p>
                            <p>Active</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>


        <Modal
          size="md"
          className="network-popup  add-wallet-popup"
          centered
          show={show} onHide={handleClose}
        >
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <div className="">
              <h4 className="sub-heading mb-3">Add Wallet Address</h4>
                    <Form.Group className="mb-3 text-start">
                      <Form.Label>Add Wallet Address</Form.Label>
                      <Form.Control
                        type="number"
                       placeholder=""
                      />
                   </Form.Group>
                   <button className="common-btn bg-left">Submit</button>
            </div>
          </Modal.Body>
        </Modal>



      </div>
    </>
  );
};
