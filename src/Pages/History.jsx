import React, { useCallback, useEffect, useState } from "react";
import { Col, Container, Form, InputGroup, Modal, Row } from "react-bootstrap";
import useAuth from "../hooks/useAuth";
import RaceToken from "../JSON/RaceTokenList.json";
import { Header } from "../Components/Header";
const Token = RaceToken?.tokens;

export const History = () => {
  //==================================Global Variable================================//
  const { user } = useAuth();
  const [showData, setShowData] = useState(Token);

  //==================================End of code================================//

  return (
    <>
      <div className="dashboard-layout">
        <Header />
        <section className="outer-dash-section">
          <Container>
            <Row>
              <Col lg={12}>
                <div className="dashboard-white-box">
                  <div className="w-100">
                    <h2 className="inner-page-heading">Vault List</h2>

                    <div className="table-box-new shadow-box-main">
                      <div className="table-view-transaction">
                        <div className="thead">
                          <div>
                            <p>S. no</p>
                            <p>Token Name</p>
                            <p>Chain ID</p>
                            <p>Address</p>
                            <p>Action</p>
                          </div>
                        </div>
                        <div className="tbody">
                          {showData?.length > 0 &&
                            showData?.map((items, index) => {
                              return (
                                <div>
                                  <p>{index + 1}</p>
                                  <p>
                                    <span class="mobile-only">Token Name</span>{" "}
                                    {items?.name}
                                  </p>
                                  <p>
                                    <span class="mobile-only">Chain ID - </span>{" "}
                                    {items?.chainId}
                                  </p>
                                  <p>
                                    <span class="mobile-only">Address - </span>
                                    {items?.address}
                                  </p>
                                  <p>
                                    <span class="mobile-only">Action - </span>
                                    <a
                                      href={`https://dhedge.org/vault/${items?.address}`}
                                      target="_blank"
                                      className="common-btn"
                                    >
                               View dHedge 
                                    </a>
                                  </p>
                                </div>
                              );
                            })}
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
