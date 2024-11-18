import React, { useState } from "react";
import { AdmindashHeader } from "../../Components/Ui/AdmindashHeader";
import { Col, Container, Row, Form, Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Multiselect from "multiselect-react-dropdown";
import { encryptData } from "../../Encrypt-Decrypt/encryption-decryption";
import { toast } from "react-toastify";
import axiosMain from "../../http/axios/axios_main";
import useAuth from "../../hooks/useAuth";

const AdminAddActivity = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("");
  const [selecttype, setSelectType] = useState("");
  const [finalchainlist, setFinalChanList] = useState([]);
  const [formerror, setFormError] = useState("");
  const [disable, setDisable] = useState(false);

  const initialquestionRow = {
    question: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    correctoption: "",
  };

  const [arrayquestiondata, setArrayQuestionData] = useState([
    initialquestionRow,
  ]);

  const [inputValue, setInputValue] = useState({
    title: "",
    multiplier: "",
    description: "",
    start_date: "",
    end_date: "",
    activity_id: "",
    link: "",
    deposit_chain: "",
    min_deposit: "",
    per_mcq_point: "",
  });

  const [options, setOptions] = useState([
    { chain: "Optimism" },
    { chain: "Polygon" },
    { chain: "Arbitrum" },
    { chain: "Base" },
    { chain: "Racemainnet" },
  ]);
  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const handleChangetype = (event) => {
    setSelectType(event.target.value);
  };
  const HandleData = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

  //============================question row functionality===========================//

  const handleAddRowQuestion = () => {
    setArrayQuestionData([...arrayquestiondata, initialquestionRow]);
  };

  const handleChangeQuestion = (index, field, value) => {
    const updatedRows = [...arrayquestiondata];
    updatedRows[index][field] = value;
    setArrayQuestionData(updatedRows);
  };

  const handleRemoveRowQuestion = (index) => {
    const updatedRows = [...arrayquestiondata];
    updatedRows.splice(index, 1);
    setArrayQuestionData(updatedRows);
  };
  //============================End Of Code===========================//

  //===============Handle mulitselect code for chain filter================//
  const handleMultiSelect = (selectedList) => {
    setFinalChanList(selectedList);
  };

  const handleMultiSelectRemove = (selectedList) => {
    setFinalChanList(selectedList);
  };

  const finaldata = arrayquestiondata?.map((item) => ({
    question: item.question,
    options: [item.option1, item.option2, item.option3, item.option4],
    correctAnswer: Number(item.correctoption),
  }));

  //===========================End Of Code=================================//

  const AddActivity = async () => {
    if (!inputValue.title) {
      setFormError("Please enter title");
    } else if (!inputValue.multiplier) {
      setFormError("Please enter Multiplier");
    } else if (!inputValue.start_date) {
      setFormError("Please enter Start Date");
    } else if (!selectedOption) {
      setFormError("Please Select type");
    } else if (selectedOption == "Deposit" && finalchainlist.length <= 0) {
      setFormError("Please Select chain");
    } else if (selectedOption == "Deposit" && !inputValue.min_deposit) {
      setFormError("Please enter Deposite");
    } else if (selectedOption == "Social_Media" && !inputValue.activity_id) {
      setFormError("Please enter activity id");
    } else if (selectedOption == "Social_Media" && !inputValue.link) {
      setFormError("Please enter Link");
    } else {
      setDisable(true);
      setFormError("");

      const RowTitle = await encryptData(inputValue.title);
      const RowMultiplier = await encryptData(inputValue.multiplier);
      const RowStartDate = await encryptData(inputValue.start_date);
      const RowType = await encryptData(selectedOption);
      const RowEndDate = await encryptData(inputValue.end_date);
      const RowActivityId = await encryptData(inputValue.activity_id);
      const RowMinDeposite = await encryptData(inputValue.min_deposit);
      const RowLink = await encryptData(inputValue.link);
      const RowDescription = await encryptData(inputValue.description);
      // const RowPerMcqPoint = await encryptData(inputValue.per_mcq_point);

      const payload = {
        title: RowTitle,
        multiplier: RowMultiplier,
        description: RowDescription,
        start_date: RowStartDate,
        type: RowType,
        end_date: RowEndDate,
        activity_id: RowActivityId,
        deposit_chain: [...finalchainlist],
        min_deposit: RowMinDeposite,
        link: RowLink,
        quizType: selecttype,
        questionWithAnswers: [...finaldata],
        per_mcq_point: inputValue.per_mcq_point,
      };

      try {
        const adddata = await axiosMain.post(
          "/admin/create-activity",
          payload,
          {
            headers: {
              "Content-Type": "application/json",
              authorization: `bearer ${user.token}`,
            },
          }
        );

        if (adddata?.data?.status) {
          setDisable(false);
          toast.success(adddata?.data?.message);
          setTimeout(() => {
            navigate("/main-activity");
          }, 3000);
        }
      } catch (err) {
        setDisable(false);
        toast.error(err?.response.data.message);
      }
    }
  };

  return (
    <>
      <div className="dashboard-layout">
        <AdmindashHeader />
        <section className="outer-dash-section">
          <Container>
            <Row>
              <Col lg={12}>
                <div className="dashboard-white-box">
                  <div className="d-flex justify-content-between">
                    <h2 className="inner-page-heading mb-2">Add Activity</h2>
                    <button
                      className="common-btn mt-2"
                      onClick={() => {
                        navigate("/main-activity");
                      }}
                    >
                      Back
                    </button>
                  </div>
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
                            name="title"
                            onChange={HandleData}
                            value={inputValue.title}
                          />
                        </Form.Group>
                      </Col>{" "}
                      <Col md={6}>
                        <Form.Group controlId="description">
                          <Form.Label className="formlabel">
                            Description :
                          </Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter description "
                            name="description"
                            onChange={HandleData}
                            value={inputValue.description}
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
                            type="date"
                            placeholder="Enter startdate"
                            name="start_date"
                            onChange={HandleData}
                            value={inputValue.start_date}
                            min={new Date().toISOString().split("T")[0]}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group controlId="enddate">
                          <Form.Label className="formlabel">
                            End Date :
                          </Form.Label>
                          <Form.Control
                            type="date"
                            placeholder="Enter enddate"
                            name="end_date"
                            onChange={HandleData}
                            value={inputValue.end_date}
                            min={inputValue.start_date}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <Form.Group controlId="Multiplier">
                          <Form.Label className="formlabel">
                            Multiplier :
                          </Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="Enter Multiplier"
                            name="multiplier"
                            onChange={HandleData}
                            value={inputValue.multiplier}
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
                                displayValue="chain"
                                onRemove={handleMultiSelectRemove}
                                onSelect={handleMultiSelect}
                                options={options}
                                showCheckbox
                                placeholder="Select Expertise/Skills"
                              />
                            </Form.Group>
                          </Col>
                          <Col md={6}>
                            <Form.Group controlId="min_deposit">
                              <Form.Label className="formlabel">
                                Minimum deposit :
                              </Form.Label>
                              <Form.Control
                                type="number"
                                placeholder="Enter deposit"
                                name="min_deposit"
                                onChange={HandleData}
                                value={inputValue.min_deposit}
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
                                name="activity_id"
                                onChange={HandleData}
                                value={inputValue.activity_id}
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
                                name="link"
                                onChange={HandleData}
                                value={inputValue.link}
                              />
                            </Form.Group>
                          </Col>
                        </>
                      ) : (
                        ""
                      )}
                      {selectedOption == "Quiz" ? (
                        <>
                          <Col md={6}>
                            <Form.Group controlId="startdate">
                              <Form.Label className="formlabel">
                                Quiz Type :
                              </Form.Label>
                              <select
                                id="options"
                                className="form-control"
                                value={selecttype}
                                onChange={handleChangetype}
                              >
                                <option value="" disabled>
                                  Select Quiz type
                                </option>
                                <option value="Tokenization">
                                  Tokenization{" "}
                                </option>
                                <option value="Blockchain">Blockchain </option>
                              </select>{" "}
                            </Form.Group>
                          </Col>
                          <Col md={6}>
                            <Form.Group controlId="per_mcq_point">
                              <Form.Label className="formlabel">
                                MCQ Point :
                              </Form.Label>
                              <Form.Control
                                type="text"
                                placeholder="Enter Mcq Point"
                                name="per_mcq_point"
                                onChange={HandleData}
                                value={inputValue.per_mcq_point}
                              />
                            </Form.Group>
                          </Col>
                          {arrayquestiondata?.map((items, index) => (
                            <Row key={index}>
                              <Col md={12}>
                                <Form.Group controlId="question">
                                  <Form.Label className="formlabel">
                                    Question {index + 1} :
                                  </Form.Label>
                                  <Form.Control
                                    type="text"
                                    placeholder="Enter question"
                                    as="textarea"
                                    rows={2}
                                    name="question"
                                    value={items.question}
                                    onChange={(e) =>
                                      handleChangeQuestion(
                                        index,
                                        "question",
                                        e.target.value
                                      )
                                    }
                                  />
                                </Form.Group>
                              </Col>
                              <Col md={6}>
                                <Form.Group controlId="option1">
                                  <Form.Label className="formlabel">
                                    Option 1 :
                                  </Form.Label>
                                  <Form.Control
                                    type="text"
                                    placeholder="Enter option 1"
                                    value={items.option1}
                                    onChange={(e) =>
                                      handleChangeQuestion(
                                        index,
                                        "option1",
                                        e.target.value
                                      )
                                    }
                                  />
                                </Form.Group>
                              </Col>
                              <Col md={6}>
                                <Form.Group controlId="option2">
                                  <Form.Label className="formlabel">
                                    Option 2 :
                                  </Form.Label>
                                  <Form.Control
                                    type="text"
                                    placeholder="Enter option 2"
                                    value={items.option2}
                                    onChange={(e) =>
                                      handleChangeQuestion(
                                        index,
                                        "option2",
                                        e.target.value
                                      )
                                    }
                                  />
                                </Form.Group>
                              </Col>
                              <Col md={6}>
                                <Form.Group controlId="option3">
                                  <Form.Label className="formlabel">
                                    Option 3 :
                                  </Form.Label>
                                  <Form.Control
                                    type="text"
                                    placeholder="Enter option 3"
                                    value={items.option3}
                                    onChange={(e) =>
                                      handleChangeQuestion(
                                        index,
                                        "option3",
                                        e.target.value
                                      )
                                    }
                                  />
                                </Form.Group>
                              </Col>
                              <Col md={6}>
                                <Form.Group controlId="option4">
                                  <Form.Label className="formlabel">
                                    Option 4 :
                                  </Form.Label>
                                  <Form.Control
                                    type="text"
                                    placeholder="Enter option 4"
                                    value={items.option4}
                                    onChange={(e) =>
                                      handleChangeQuestion(
                                        index,
                                        "option4",
                                        e.target.value
                                      )
                                    }
                                  />
                                </Form.Group>
                              </Col>
                              <Col md={6}>
                                <Form.Group controlId="correctoption">
                                  <Form.Label className="formlabel">
                                    Correct Option :
                                  </Form.Label>
                                  <Form.Control
                                    type="text"
                                    placeholder="Enter Correct Option"
                                    value={items.correctoption}
                                    onChange={(e) =>
                                      handleChangeQuestion(
                                        index,
                                        "correctoption",
                                        e.target.value
                                      )
                                    }
                                  />
                                </Form.Group>
                              </Col>
                              <Col md="1">
                                <div className="mb-3">
                                  <button
                                    onClick={() =>
                                      handleRemoveRowQuestion(index)
                                    }
                                  >
                                    <i
                                      class="fa fa-remove"
                                      aria-hidden="true"
                                    ></i>{" "}
                                  </button>
                                </div>
                              </Col>
                            </Row>
                          ))}

                          <Col md="1" className="offset-md-11">
                            <div style={{ textAlign: "start" }}>
                              <button onClick={handleAddRowQuestion}>
                                <i class="fa fa-plus" aria-hidden="true"></i>{" "}
                              </button>
                            </div>
                          </Col>
                        </>
                      ) : (
                        ""
                      )}
                    </Row>
                    {formerror && (
                      <p className="text-danger mt-3">{formerror}</p>
                    )}
                    <button
                      className="common-btn mt-4"
                      disabled={disable}
                      onClick={() => {
                        AddActivity();
                      }}
                    >
                      {" "}
                      {disable === true ? "Processing" : "Add Activity"}
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
