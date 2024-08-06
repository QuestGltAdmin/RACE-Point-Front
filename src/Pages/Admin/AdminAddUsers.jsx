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
                      <InputGroup className="mb-3 search-input">
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
                      <div className="table-view-transaction">
                        <div className="thead">
                          <div>
                            <p>S. no</p>
                            <p>Wallet Address</p>
                          </div>
                        </div>
                        <div className="tbody">
                          <div>
                            <p>1</p>
                            <p>0x51EFE4987D9D22032aba856A8E6472913cf1Fa04</p>
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
      </div>
    </>
  );
};
