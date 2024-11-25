import React, { useCallback, useEffect, useState } from "react";
import { AdmindashHeader } from "../../Components/Ui/AdmindashHeader";
import {
  Button,
  Col,
  Container,
  Form,
  InputGroup,
  Modal,
  Row,
} from "react-bootstrap";
import { debounce } from "lodash";
import axiosMain from "../../http/axios/axios_main";
import useAuth from "../../hooks/useAuth";
import moment from "moment/moment";
import { useNavigate } from "react-router-dom";
import { IphoneSpinner } from "../../Components/IphoneSpinner";
import { toast } from "react-toastify";

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
  const [deletemodal, setDeleteModal] = useState(false);
  const [deleteid, setDeleteID] = useState(false);
  const [disable, setDisable] = useState(false);

  //==================================End of code================================//
  const handleclosedelete = () => {
    setDeleteModal(false);
  };

  const handledelete = (items) => {
    setDeleteModal(true);
    setDeleteID(items?._id);
  };
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

  const DeleteActivity = async () => {
    const payload = {
      id: deleteid,
    };

    try {
      setDisable(true);

      const deletedata = await axiosMain.post(
        "admin/delete-activity",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `bearer ${user.token}`,
          },
        }
      );
      if (deletedata?.data?.status) {
        setDisable(false);
        toast.success(deletedata?.data?.message);
        handleclosedelete();
        getdata();
      }
    } catch (err) {
      toast.error(err?.deletedata?.data?.message);
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
                                            className="common-btn m-1"
                                            onClick={() => {
                                              // setDetailsModal(true);
                                              handledetails(items);
                                            }}
                                          >
                                            <i className="fa fa-eye"></i>
                                          </button>
                                          {items?.isRunning ? (
                                            ""
                                          ) : (
                                            <>
                                              <button
                                                className="common-btn m-1"
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
                                              <button
                                                className="common-btn m-1"
                                                onClick={() => {
                                                  handledelete(items);
                                                }}
                                              >
                                                <i className="fa fa-trash"></i>
                                              </button>
                                            </>
                                      )}
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
          <div className="admin-activity-details-box">
            {" "}
            <Row className="text-start mt-5">
              <Col md="12">
                <p>
                  <b>Title</b>:{" "}
                  {activitydetails?.title ? activitydetails?.title : "-"}
                </p>
              </Col>
              <Col md="12">
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
              <Col md="12">
                <p>
                  <b>Type</b>:{" "}
                  {activitydetails?.type ? activitydetails?.type : "-"}
                </p>
              </Col>
              <Col md="12">
                <p>
                  <b>Start Date</b>:{" "}
                  {activitydetails?.start_date
                    ? moment
                        .utc(activitydetails?.start_date)
                        .format("MMMM D, YYYY")
                    : "-"}
                </p>
              </Col>
              <Col md="12">
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
                  <Col md="12">
                    <p>
                      <b>Deposit Chain</b>:{" "}
                      {activitydetails?.deposit_chain
                        ? activitydetails?.deposit_chain?.map((items) => {
                            return items + " , ";
                          })
                        : "-"}
                    </p>
                  </Col>
                  <Col md="12">
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
                  <Col md="12">
                    <p>
                      <b>Link</b>:{" "}
                      {activitydetails?.link ? activitydetails?.link : "-"}
                    </p>
                  </Col>
                  <Col md="12">
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
                  <Col md="12">
                    <p>
                      <b>Quiz Type</b>:{" "}
                      {activitydetails?.quizData
                        ? activitydetails?.quizData[0]?.type
                        : "-"}
                    </p>
                  </Col>
                  {/* <Col md="12">
                    <p>
                      <b>Per MCQ Point</b>:{" "}
                      {activitydetails?.quizData
                        ? activitydetails?.quizData[0]?.per_mcq_point
                        : "-"}
                    </p>
                  </Col> */}
                  {questiondetails?.map((items, index) => (
                    <div className="shadow-box-main" key={index}>
                      <Col md="12">
                        <p>
                          <b>Question {index + 1}</b>{" "}
                        </p>
                        <p>{items?.question ? items?.question : "-"}</p>
                      </Col>
                      {items?.options?.map((option, optionIndex) => (
                        <Col md="12" key={optionIndex}>
                          <p>
                            Option {optionIndex + 1} : {option}
                          </p>
                        </Col>
                      ))}
                      <Col md="12">
                        <p>
                          Correct Option:{" "}
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

      <Modal
        className="new-user-modal"
        centered
        show={deletemodal}
        onHide={handleclosedelete}
        size="md"
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div>
            <h4>Are you sure you want to delete this activity?</h4>
            <div className="d-flex gap-4">
              <Button
                variant="primary"
                className="common-btn bg-left"
                onClick={() => {
                  handleclosedelete();
                }}
              >
                Back
              </Button>{" "}
              <Button
                variant="primary"
                className="common-btn bg-left"
                disabled={disable}
                onClick={() => {
                  DeleteActivity();
                }}
              >
                {disable === true ? "Processing" : "Continue"}
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AdminActivity;
