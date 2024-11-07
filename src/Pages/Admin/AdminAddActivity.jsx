import React, { useState } from "react";
import { AdmindashHeader } from "../../Components/Ui/AdmindashHeader";
import { Col, Container, Row, Form, Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Multiselect from "multiselect-react-dropdown";

const AdminAddActivity = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [finalchainlist, setFinalChanList] = useState([]);
  const [error, setError] = useState("");

  const [options, setOptions] = useState([
    { name: "Optimism" },
    { name: "Polygon" },
    { name: "Arbitrum" },
    { name: "Base" },
    { name: "Racemainnet" },
  ]);
  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };
  console.log(finalchainlist);

  //===============Handle mulitselect code for chain filter================//
  const handleMultiSelect = (selectedList) => {
    setFinalChanList(selectedList);
  };

  const handleMultiSelectRemove = (selectedList) => {
    console.log("111111");
    setFinalChanList(selectedList);
  };

  //===========================End Of Code=================================//

  return (
    <>
      <div className="dashboard-layout">
        <AdmindashHeader />
        <section className="outer-dash-section">
          <Container>
            <Row>
              <Col lg={12}>
                <div className="dashboard-white-box">
                  <h2 className="inner-page-heading mb-2">Add Activity</h2>
                  <div className="table-box-new shadow-box-main">
                    <Row>
                      <Col md={6}>
                        <Form.Group controlId="Title">
                          <Form.Label className="formlabel">
                            Add Title :
                          </Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter title name"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group controlId="Multiplier">
                          <Form.Label className="formlabel">
                            Multiplier :
                          </Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="Enter Multiplier"
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      {" "}
                      <Col md={6}>
                        <Form.Group controlId="startdate">
                          <Form.Label className="formlabel">
                            Start Date :
                          </Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter startdate"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group controlId="startdate">
                          <Form.Label className="formlabel">Type :</Form.Label>
                          <select
                            id="options"
                            className="form-control"
                            value={selectedOption}
                            onChange={handleChange}
                          >
                            <option value="" disabled>
                              Select type
                            </option>
                            <option value="Deposit">Deposit </option>
                            <option value="Refer">Refer </option>
                            <option value="Quiz">Quiz </option>
                            <option value="Register">Register </option>
                            <option value="Social_Media">Social Media</option>
                          </select>{" "}
                        </Form.Group>
                      </Col>
                      {selectedOption == "Deposit" ? (
                        <>
                          <Col md={6}>
                            <Form.Group controlId="Type">
                              <Form.Label className="formlabel">
                                Deposit Chain :
                              </Form.Label>

                              <Multiselect
                                displayValue="name"
                                onRemove={handleMultiSelectRemove}
                                onSelect={handleMultiSelect}
                                options={options}
                                showCheckbox
                                placeholder="Select Expertise/Skills"
                              />
                            </Form.Group>
                          </Col>
                          <Col md={6}>
                            <Form.Group controlId="min_deposite">
                              <Form.Label className="formlabel">
                                Minimum deposite :
                              </Form.Label>
                              <Form.Control
                                type="number"
                                placeholder="Enter deposite"
                              />
                            </Form.Group>
                          </Col>
                        </>
                      ) : (
                        ""
                      )}
                      {selectedOption == "Social_Media" ? (
                        <>
                          <Col md={6}>
                            <Form.Group controlId="Activity_Id">
                              <Form.Label className="formlabel">
                                Activity Id :
                              </Form.Label>
                              <Form.Control
                                type="text"
                                placeholder="Enter activity id"
                              />
                            </Form.Group>
                          </Col>
                          <Col md={6}>
                            <Form.Group controlId="Type">
                              <Form.Label className="formlabel">
                                Link :
                              </Form.Label>
                              <Form.Control
                                type="text"
                                placeholder="Enter Link"
                              />
                            </Form.Group>
                          </Col>
                        </>
                      ) : (
                        ""
                      )}
                    </Row>

                    {error && <p className="text-danger">{error}</p>}
                    <button
                      className="common-btn mt-3"
                      variant="primary"
                      type="submit"
                    >
                      Add Activity
                    </button>
                  </div>{" "}
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </div>
    </>
  );
};

export default AdminAddActivity;
