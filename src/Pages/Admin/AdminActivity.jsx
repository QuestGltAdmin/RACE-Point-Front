import React, { useCallback, useEffect, useState } from "react";
import { AdmindashHeader } from "../../Components/Ui/AdmindashHeader";
import { Col, Container, Form, InputGroup, Modal, Row } from "react-bootstrap";
import { debounce } from "lodash";
import axiosMain from "../../http/axios/axios_main";
import useAuth from "../../hooks/useAuth";
import moment from "moment/moment";
import { useNavigate } from "react-router-dom";
import { IphoneSpinner } from "../../Components/IphoneSpinner";

const AdminActivity = () => {
  //==================================Global Variable================================//
  const { user } = useAuth();
  const navigate = useNavigate();
  //==================================End of code================================//

  //==================================Local Variables================================//
  const [pagenumber, setPagenumber] = useState(1);
  const [searchall, setSearchall] = useState("");
  const [totaldatacount, setTotalDataCount] = useState(1);
  const [showdata, setShowData] = useState([]);
  const [activitydetails, setActivityDetails] = useState([]);
  const [questiondetails, setQuestionDetails] = useState([]);
  const [checkForData, setCheckForData] = useState(0);
  const [detailsmodal, setDetailsModal] = useState(false);
  //==================================End of code================================//

  //==============================Get Data All Trx==============================//
  const getdata = async (pagenumber, searchall) => {
    try {
      setCheckForData(0);

      const getResAll = await axiosMain.get(
        `/admin/get-all-activity?page=${pagenumber}&limit=10&search=${searchall}`,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `bearer ${user.token}`,
          },
        }
      );
      if (getResAll?.data?.status) {
        if (getResAll?.data?.data?.content?.length > 0) {
          setCheckForData(2);
          setShowData(getResAll?.data?.data?.content);
          setTotalDataCount(getResAll?.data?.data?.total);
        } else {
          setCheckForData(1);
        }
      }
    } catch (err) {
      setCheckForData(1);
    }
  };
  //==================================End of code================================//

  const incressFunction = () => {
    if (pagenumber < Math.ceil(totaldatacount / 10)) {
      setPagenumber(pagenumber + 1);
    }
  };
  const decressFunction = () => {
    if (pagenumber > 1) {
      setPagenumber(pagenumber - 1);
    }
  };

  const filterData = useCallback(debounce(getdata, 1000), []);
  useEffect(() => {
    filterData(pagenumber, searchall);
  }, [pagenumber, searchall]);

  //==============================Get Data All Trx==============================//

  const handledetails = (items) => {
    setActivityDetails(items);
    setQuestionDetails(items?.quizData[0]?.questionWithAnswers);
    setDetailsModal(true);
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
                  <div className="w-100">
                    <h2 className="inner-page-heading">Activity List</h2>
                    <button
                      className="common-btn"
                      onClick={() => {
                        navigate("/main-activity-add");
                      }}
                    >
                      Create Activity
                    </button>
                    <div className="table-box-new shadow-box-main">
                      <div className="d-flex gap-2">
                        <InputGroup className="mb-3 search-input">
                          <Form.Control
                            placeholder="Search...."
                            name="searchall"
                            type="text"
                            onChange={(e) => {
                              setSearchall(e.target.value);
                            }}
                            value={searchall}
                          />
                          <InputGroup.Text id="basic-addon2">
                            <a href="">
                              <i class="fa fa-search"></i>
                            </a>
                          </InputGroup.Text>
                        </InputGroup>
                      </div>
                      {checkForData === 0 ? (
                        <p className="text-center">
                          <IphoneSpinner />
                        </p>
                      ) : checkForData === 1 ? (
                        <p className="text-center">No Data Found</p>
                      ) : (
                        <>
                          <div className="table-view-transaction">
                            <div className="thead">
                              <div>
                                <p>S. no</p>
                                <p>Title</p>
                                <p>Multiplier</p>
                                <p>Type</p>
                                <p>Start Date</p>
                                <p>End Date</p>
                                <p>Action</p>
                              </div>
                            </div>
                            <div className="tbody">
                              {showdata?.length > 0 &&
                                showdata?.map((items, index) => {
                                  const adjustedIndex =
                                    index + 1 + (pagenumber - 1) * 10;
                                  return (
                                    <div key={adjustedIndex}>
                                      <p>{adjustedIndex}</p>
                                      <p>
                                        <span class="mobile-only">Title -</span>
                                        {items?.title ? items?.title : "-"}
                                      </p>
                                      <p>
                                        <span class="mobile-only">
                                          Multiplier
                                        </span>
                                        {items?.multiplier}
                                      </p>
                                      <p>
                                        <span class="mobile-only">Type</span>
                                        {items?.type}
                                      </p>
                                      <p>
                                        <span class="mobile-only">
                                          Start Date
                                        </span>
                                        {moment
                                          .utc(items?.start_date)
                                          .format("MMMM D, YYYY")}
                                      </p>
                                      <p>
                                        <span class="mobile-only">
                                          End Date
                                        </span>
                                        {items?.end_date
                                          ? moment
                                              .utc(items?.end_date)
                                              .format("MMMM D, YYYY")
                                          : "-"}
                                      </p>
                                      <p>
                                        <div className="gap-2">
                                          <button
                                            className="common-btn"
                                            onClick={() => {
                                              // setDetailsModal(true);
                                              handledetails(items);
                                            }}
                                          >
                                            <i className="fa fa-eye"></i>
                                          </button>

                                          <button
                                            className="common-btn"
                                            onClick={() => {
                                              navigate(
                                                "/main-update-activity",
                                                {
                                                  state: {
                                                    activitydata: items,
                                                  },
                                                }
                                              );
                                            }}
                                          >
                                            <i className="fa fa-edit"></i>
                                          </button>
                                          <button className="common-btn">
                                            <i className="fa fa-trash"></i>
                                          </button>
                                        </div>
                                      </p>
                                    </div>
                                  );
                                })}
                            </div>
                          </div>

                          <div className="d-flex justify-content-end">
                            {showdata?.length > 0 ? (
                              <div className="d-flex justify-content-center paginate-register">
                                <div className="d-flex align-items-center">
                                  <button
                                    className="common-btn"
                                    onClick={() => {
                                      decressFunction();
                                    }}
                                  >
                                    <i className="fa fa-angle-left"></i>
                                  </button>
                                  <button className="common-btn m-2">
                                    Page {pagenumber} of
                                    {Math.ceil(totaldatacount / 10)}
                                  </button>
                                  <button
                                    className="common-btn"
                                    onClick={() => {
                                      incressFunction();
                                    }}
                                  >
                                    <i className="fa fa-angle-right"></i>
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <></>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </div>
      <Modal
        className="new-user-modal"
        centered
        show={detailsmodal}
        onHide={() => {
          setDetailsModal(false);
        }}
        size="lg"
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <h4>Activity Details</h4>
          <div className="shadow-box-main">
            {" "}
            <Row className="text-start mt-5">
              <Col md="6">
                <p>
                  <b>Title</b>:{" "}
                  {activitydetails?.title ? activitydetails?.title : "-"}
                </p>
              </Col>
              <Col md="6">
                <p>
                  <b>Multiplier</b>:{" "}
                  {activitydetails?.multiplier
                    ? activitydetails?.multiplier
                    : "-"}
                </p>
              </Col>
              <Col md="12">
                <p>
                  <b>Description</b>:{" "}
                  {activitydetails?.description
                    ? activitydetails?.description
                    : "-"}
                </p>
              </Col>
              <Col md="6">
                <p>
                  <b>Type</b>:{" "}
                  {activitydetails?.type ? activitydetails?.type : "-"}
                </p>
              </Col>
              <Col md="6">
                <p>
                  <b>Start Date</b>:{" "}
                  {activitydetails?.start_date
                    ? moment
                        .utc(activitydetails?.start_date)
                        .format("MMMM D, YYYY")
                    : "-"}
                </p>
              </Col>
              <Col md="6">
                <p>
                  <b>end Date</b>:{" "}
                  {activitydetails?.end_date
                    ? moment
                        .utc(activitydetails?.end_date)
                        .format("MMMM D, YYYY")
                    : "-"}
                </p>
              </Col>
              {activitydetails?.type == "Deposit" ? (
                <>
                  {" "}
                  <Col md="6">
                    <p>
                      <b>Deposit Chain</b>:{" "}
                      {activitydetails?.deposit_chain
                        ? activitydetails?.deposit_chain?.map((items) => {
                            return items + " , ";
                          })
                        : "-"}
                    </p>
                  </Col>
                  <Col md="6">
                    <p>
                      <b>Minimum deposit</b>:{" "}
                      {activitydetails?.min_deposit
                        ? activitydetails?.min_deposit
                        : "-"}
                    </p>
                  </Col>{" "}
                </>
              ) : activitydetails?.type == "Social_Media" ? (
                <>
                  {" "}
                  <Col md="6">
                    <p>
                      <b>Link</b>:{" "}
                      {activitydetails?.link ? activitydetails?.link : "-"}
                    </p>
                  </Col>
                  <Col md="6">
                    <p>
                      <b>Activity Id</b>:{" "}
                      {activitydetails?.activity_id
                        ? activitydetails?.activity_id
                        : "-"}
                    </p>
                  </Col>
                </>
              ) : activitydetails?.type == "Quiz" ? (
                <>
                  {" "}
                  <Col md="6">
                    <p>
                      <b>Quiz Type</b>:{" "}
                      {activitydetails?.quizData
                        ? activitydetails?.quizData[0]?.type
                        : "-"}
                    </p>
                  </Col>
                  <Col md="6">
                    <p>
                      <b>Per MCQ Point</b>:{" "}
                      {activitydetails?.quizData
                        ? activitydetails?.quizData[0]?.per_mcq_point
                        : "-"}
                    </p>
                  </Col>
                  {questiondetails?.map((items, index) => (
                    <div key={index}>
                      <Col md="12">
                        <p>
                          <b>Question {index + 1}</b>:{" "}
                          {items?.question ? items?.question : "-"}
                        </p>
                      </Col>
                      {items?.options?.map((option, optionIndex) => (
                        <Col md="6" key={optionIndex}>
                          <p>
                            <b>Option {optionIndex + 1}</b>: {option}
                          </p>
                        </Col>
                      ))}
                      <Col md="6">
                        <p>
                          <b>Correct Option</b>:{" "}
                          {items?.correctAnswer ? items?.correctAnswer : "-"}
                        </p>
                      </Col>
                    </div>
                  ))}
                </>
              ) : (
                ""
              )}
            </Row>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AdminActivity;
