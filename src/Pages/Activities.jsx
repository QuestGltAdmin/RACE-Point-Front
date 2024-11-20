import React, { useEffect, useState } from "react";
import { Header } from "../Components/Header";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { encryptData } from "../Encrypt-Decrypt/encryption-decryption";
import axiosMain from "../http/axios/axios_main";
import { ShareSocial } from "react-share-social";
import { toast } from "react-toastify";
import { quizresult } from "../store/reducers/authReducer";
import { useDispatch } from "react-redux";

export const Activities = () => {
  //=================Global Variables==================//
  const { user, WalletEVM, quizdata } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //===============End of code====================//

  //=================Local Variables==================//
  const [showReferralCodesModal, setShowReferralCodesModal] = useState(false);
  const [referralCodes, setReferralCodes] = useState(user?.referral_codes);
  //===============End of code====================//

  //========================= Leaderboard States ============================
  const [questiondata, setQuestiondata] = useState([]);
  const [activitydata, setActivityData] = useState([]);
  const [showShareSocial, setShowShareSocial] = useState(false);
  const [showIframe, setShowIframe] = useState(false);
  const [depositmodal, setDepositModal] = useState(false);
  const [questionmodal, setQuestionModal] = useState(false);
  const [quizmodal, setQuizModal] = useState(false);
  const [resultmodal, setResultModal] = useState(false);
  const [socialmodal, setSocialModal] = useState(false);
  const [showData, setShowData] = useState([]);
  const [refermodal, setReferModal] = useState(false);
  const [registermodal, setRegisterModal] = useState(false);
  const [codeShare, setCodeShare] = useState("");
  const [iframelink, setIframeLink] = useState("");
  const [copy, setCopy] = useState(false);
  const [countForAv, setCountForAv] = useState([]);
  const [disable, setDisable] = useState(false);
  const [formerror, setFormError] = useState("");
  //================================End of code==============================//

  useEffect(() => {
    if (user?.referral_codes?.length > 0) {
      const filterData = user?.referral_codes?.filter((items, index) => {
        return !items?.is_used;
      });
      setCountForAv(filterData);
    }
  }, []);

  //================================Style for social share==============================//
  const style = {
    root: {
      padding: "0",
      background: "transparent",
    },
    copyContainer: {
      background: "transparent",
    },
    iconContainer: {
      display: "flex",
    },
    title: {
      color: "aquamarine",
      fontStyle: "italic",
    },
    copyUrl: {
      color: "#fff",
      fontWeight: "600",
    },
    copyIcon: {
      background: "#945b3b",
      color: "#fff",
      height: "35px",
      margin: "3px",
      padding: "4px",
    },
  };
  //================================End of code==============================//

  //============================ Copy button state ==============================
  const [copiedCodeIndex, setCopiedCodeIndex] = useState(null);
  //===============================End of code=================================

  //===============================modal close function=================================
  const handleShareSocial = () => {
    setShowShareSocial(false);
  };
  const handleCloseIframe = () => {
    setShowIframe(false);
  };
  const handleCloseModals = () => {
    setShowReferralCodesModal(false);
  };
  const handledepositmodalclose = () => {
    setDepositModal(false);
  };
  const handlequizmodalclose = () => {
    setQuizModal(false);
  };
  const handlesocialmodalclose = () => {
    setSocialModal(false);
  };
  const handlerefermodalclose = () => {
    setReferModal(false);
  };
  //===============================End of code=================================

  const HandleIframes = (items) => {
    if (items?.type == "Refer") {
      setShowData(items);
      setReferModal(true);
    } else if (items?.type == "Social_Media") {
      setIframeLink(items?.link);
      setShowData(items);
      setSocialModal(true);
    } else if (items?.type == "Deposit") {
      setShowData(items);
      setDepositModal(true);
    } else if (items?.type == "Quiz") {
      setShowData(items);
      setQuizModal(true);
      getquestiondata(items);
    } else if (items?.type == "Register") {
      setShowData(items);
      setRegisterModal(true);
    }
  };

  const handleShowReferralCodesModal = () => setShowReferralCodesModal(true);

  const HandleRegister = () => {
    window.open("https://raceecosystem.com/", "_blank");
  };
  //=============================== Funtion to copy referral code to clipboard =================================
  const handleCopy = (code, index) => {
    navigator.clipboard
      .writeText(code)
      .then(() => {
        setCopiedCodeIndex(index);
        setTimeout(() => setCopiedCodeIndex(null), 2000);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };
  //============================================= End of code ==================================================

  //==================================Share social model==================================//
  const HandleReferral = (code) => {
    handleCloseModals();
    setCodeShare(code);
    setShowShareSocial(true);
  };
  //==================================End Of Code==================================//

  //=================================get activity=================================//

  useEffect(() => {
    getDashboardData();
  }, []);

  const getDashboardData = async () => {
    const RawWallet = await encryptData(WalletEVM?.selectedAccount);
    const payload = {
      walletAddress: RawWallet,
    };
    try {
      const getData = await axiosMain.post(
        "auth/get-activity-plan?page=1&limit=100",
        payload
      );

      if (getData?.data?.status) {
        setActivityData(getData?.data?.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  //==================================End Of Code==================================//

  //==================================reverse time code==================================//

  const [timeRemaining, setTimeRemaining] = useState({});

  useEffect(() => {
    const timerInterval = setInterval(() => {
      const updatedTimeRemaining = {};

      activitydata.forEach((item, index) => {
        const targetDate = new Date(item.end_date);
        const now = new Date();
        const timeDiff = targetDate - now;

        if (timeDiff > 0) {
          const hours = Math.floor(timeDiff / (1000 * 60 * 60));
          const minutes = Math.floor(
            (timeDiff % (1000 * 60 * 60)) / (1000 * 60)
          );

          if (hours >= 24) {
            const days = Math.floor(hours / 24);
            updatedTimeRemaining[index] = `${days} days left`;
          } else {
            updatedTimeRemaining[
              index
            ] = `${hours} hours ${minutes} minutes left`;
          }
        } else {
          updatedTimeRemaining[index] = "Expired";
        }
      });

      setTimeRemaining(updatedTimeRemaining);
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [activitydata]);
  //==================================End Of Code==================================//

  //==================================getQuestionData================================//
  const getquestiondata = async (data) => {
    try {
      const getdata = await axiosMain.get(
        `/auth/questions?id=${data?.quiz_id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (getdata?.data?.status) {
        setQuestiondata(getdata?.data?.data);
      }
    } catch (err) {
      console.log();
    }
  };
  //==================================End of code================================//

  //==================================question selected answers code===============================//

  const [selectedAnswers, setSelectedAnswers] = useState([]);

  const handleOptionChange = (id, answer) => {
    setSelectedAnswers((prev) => {
      const existingAnswerIndex = prev.findIndex((answer) => answer.id === id);
      if (existingAnswerIndex > -1) {
        const updatedAnswers = [...prev];
        updatedAnswers[existingAnswerIndex].answer = answer;
        return updatedAnswers;
      }
      return [
        ...prev,
        {
          id,
          answer,
        },
      ];
    });
  };

  const transformedAnswers = selectedAnswers.map((answer) => ({
    id: answer.id,
    answer: answer.answer + 1,
  }));

  //==================================End of code================================//

  const SubmitQuiz = async () => {
    if (selectedAnswers.length !== questiondata.length) {
      setFormError("Please answer all the questions before submitting.");
      return;
    }
    {
      setDisable(true);

      const payload = {
        id: showData?.quiz_id,
        answers: [...transformedAnswers],
        walletAddress: WalletEVM?.selectedAccount,
      };

      try {
        const submit = await axiosMain.post("/auth/submitquiz", payload, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (submit?.data?.status) {
          setFormError("");
          setDisable(false);
          toast.success(submit?.data?.message);
          dispatch(quizresult(submit?.data));
          setTimeout(() => {
            setQuestionModal(false);
            setResultModal(true);
            getDashboardData();
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
      <Header />
      <section className="activity-main-sec">
        <Container>
          <Row>
            <Col md={11} className="m-auto">
              <h2 className="common-heading text-start mb-2">Activities</h2>
              <p className="sub-heading text-start">
                Complete the activities below and multiply your points .
              </p>

              <div className="deposit-outer-box">
                <div className="deposit-inner-box">
                  <img src="assets/images/deposit.png" alt="" />
                  <div>
                    <h3>Deposit</h3>
                    <p>
                      Deposit in one of our vaults in one of our partner chains
                    </p>
                  </div>
                </div>
                <button
                  className="common-btn bg-left"
                  onClick={() => {
                    navigate("/deposit-step-1");
                  }}
                >
                  <img src="assets/images/save_alt.png" alt="" />
                  Deposit now
                </button>
              </div>

              <h2 className="common-heading text-start mb-2 font-mid">
                Multipliers
              </h2>

              <Row>
                <Col lg={4}>
                  <div className="deposit-outer-box d-block">
                    <div className="invite-flex d-block">
                      <div className="deposit-inner-box">
                        <img src="assets/images/invite.png" alt="" />
                        <div>
                          <h3>Invite</h3>
                          <h5 className="idex-new">
                            {countForAv?.length} invites available
                          </h5>
                        </div>
                      </div>
                      <p className=" text-center">
                        Invite your friends to join the race and earn more
                        points!
                      </p>
                      <button
                        className="common-btn bg-left w-100 mt-3"
                        onClick={() => {
                          if (referralCodes?.length > 0) {
                            handleShowReferralCodesModal();
                          }
                        }}
                      >
                        <img src="assets/images/share.png" alt="" />
                        Invite now
                      </button>
                    </div>
                  </div>
                </Col>
                {activitydata?.length > 0 &&
                  activitydata?.map((items, index) => {
                    const currentDate = new Date();
                    const startDate = new Date(items?.start_date);
                    return (
                      <Col lg={4} key={index}>
                        <div className="deposit-outer-box d-block">
                          {startDate <= currentDate ? (
                            <div className="invite-flex d-block">
                              <div className="deposit-inner-box">
                                <img src="assets/images/invite.png" alt="" />
                                <div>
                                  <h5 className="info-deposit-new">
                                    {items?.multiplier}
                                    {"X"}
                                    {/* <span className="info-tooltip">
                                      <img
                                        src="assets/img/infor2.png"
                                        className="info-icon"
                                        alt=""
                                      />
                                      <div>
                                        <p>
                                          This is where you can see the total
                                          amount of money you've deposited. It’s
                                          your personal vault that
                                        </p>
                                      </div>
                                    </span> */}
                                  </h5>
                                  <h3>
                                    {items?.type == "Social_Media"
                                      ? "Social Media"
                                      : items?.type}
                                  </h3>{" "}
                                  {items?.end_date ? (
                                    <h5 className="idex-new">
                                      {timeRemaining[index]}
                                    </h5>
                                  ) : (
                                    // <h5 className="idex-new">
                                    // No Expiry
                                    // </h5>
                                    ""
                                  )}
                                </div>
                              </div>
                              <div>
                                <p className="text-center desc">
                                  {items?.title}{" "}
                                  {/* <span className="info-tooltip">
                                    <img
                                      src="assets/img/infor2.png"
                                      className="info-icon"
                                      alt=""
                                    />
                                    <div>
                                      <p>
                                        This is where you can see the total
                                        amount of money you've deposited.
                                      </p>
                                    </div>
                                  </span> */}
                                </p>
                                {items?.type != "Social_Media" &&
                                items?.doneStatus ? (
                                  <button className="common-btn bg-left w-100 mt-3 transation-successfull">
                                    Completed &nbsp;{" "}
                                    <i className="fa fa-check-circle"></i>
                                  </button>
                                ) : (
                                  <button
                                    className="common-btn bg-left w-100 mt-3"
                                    onClick={() => {
                                      HandleIframes(items);
                                    }}
                                  >
                                    Start
                                  </button>
                                )}
                              </div>
                            </div>
                          ) : (
                            <div className="invite-flex d-block">
                              <div className="deposit-inner-box">
                                <img
                                  src="assets/images/coming-soon.png"
                                  alt=""
                                />
                                <div>
                                  <h5 className="info-deposit-new">
                                    Multiplier
                                  </h5>
                                  <h3>XXXX</h3>{" "}
                                  <h5 className="idex-new"># days left</h5>
                                </div>
                              </div>
                              <div className="coming-soon-box ms-0">
                                <p className="text-center desc">
                                  {items?.title}
                                </p>
                                <button className="common-btn bg-left w-100 mt-3 blur-btn-coming-soon">
                                  Start
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </Col>
                    );
                  })}
                {/* <Col lg={4}>
                  <div className="deposit-outer-box d-block">
                    <div className="invite-flex d-block">
                      <div className="deposit-inner-box">
                        <img src="assets/images/coming-soon.png" alt="" />
                        <div>
                          <h3>Coming Soon</h3>
                        </div>
                      </div>
                      <div className="coming-soon-box">
                        <p>
                          Invite your friends to join the race and earn more
                          points!
                        </p>
                      </div>
                      <button className="common-btn bg-left w-100 mt-3 blur-btn-coming-soon">
                        <img src="assets/images/share.png" alt="" />
                        Invite now
                      </button>
                    </div>
                  </div>
                </Col> */}
              </Row>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Referral Codes Modal */}
      <Modal
        className="new-user-modal"
        centered
        show={showReferralCodesModal}
        onHide={handleCloseModals}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div>
            <img src="assets/img/Logo.png" alt="" className="img-fluid logo" />
            <p>Here are your referral codes</p>
            <div className="more-scroll">
              {referralCodes?.map((items, index) => (
                <div className="referal-copy-row" key={index}>
                  {items?.is_used ? (
                    <>
                      <div
                        style={{ cursor: "not-allowed", userSelect: "none" }}
                      >
                        <span>{index + 1}</span>
                        {items.code}
                      </div>

                      <a href="#">
                        <img
                          src="assets/img/Green-Tick-Vector-PNG-Images.png"
                          alt="Copy"
                        />
                      </a>
                    </>
                  ) : (
                    <>
                      <div>
                        <span>{index + 1}</span>
                        {items.code}
                      </div>
                      {copiedCodeIndex === index ? (
                        <span className="text-white m-2">Copied!</span>
                      ) : (
                        <>
                          <div className="d-flex align-items-center">
                            <a
                              href="#"
                              onClick={() => handleCopy(items.code, index)}
                            >
                              <img src="assets/img/copy.png" alt="Copy" />
                            </a>
                            <a
                              className="text-white"
                              onClick={() => {
                                HandleReferral(items.code);
                              }}
                            >
                              <i class="fa fa-share" aria-hidden="true"></i>
                            </a>
                          </div>
                        </>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Modal.Body>
      </Modal>
      {/*end of  Referral Codes Modal */}

      <Modal
        className="new-user-modal"
        centered
        show={showShareSocial}
        onHide={handleShareSocial}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div>
            <img src="assets/img/Logo.png" alt="" className="img-fluid logo" />
            <p>Here are your referral code</p>
            <ShareSocial
              style={style}
              url={codeShare}
              socialTypes={[
                "facebook",
                "twitter",
                "reddit",
                "linkedin",
                "whatsapp",
              ]}
            />
          </div>
        </Modal.Body>
      </Modal>

      {/*socialmedia activity Codes Modal */}
      <Modal
        className="new-user-modal"
        centered
        show={socialmodal}
        onHide={handlesocialmodalclose}
        size="md"
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div>
            <h4>{showData?.title}</h4>
            <p>{showData?.description}</p>
            <p className="dash-count-box">
              Please use this wallet address for your reward redemption.
              Incorrect wallet addresses cannot be corrected after submission
              and will result in the loss of your rewards.
            </p>
            <h4>
              {WalletEVM?.selectedAccount?.replace(
                WalletEVM?.selectedAccount?.substring(5, 37),
                "..."
              )}{" "}
              <span className="copy-activity-popup">
                {" "}
                {copy ? (
                  <img
                    width={50}
                    src="assets/img/Green-Tick-Vector-PNG-Images.png"
                    alt="Copy"
                  />
                ) : (
                  <img
                    src="assets/img/copy.png"
                    onClick={() => {
                      navigator.clipboard.writeText(WalletEVM?.selectedAccount);
                      setCopy(true);
                      // setTimeout(() => {
                      //   setCopy(false);
                      // }, 2000);
                    }}
                  />
                )}
              </span>
            </h4>
            <div className="d-flex gap-4">
              <Button
                variant="primary"
                className="common-btn bg-left"
                onClick={() => {
                  handlesocialmodalclose();
                }}
              >
                Back
              </Button>{" "}
              {copy ? (
                <Button
                  variant="primary"
                  className="common-btn bg-left"
                  onClick={() => {
                    setShowIframe(true);

                    handlesocialmodalclose();
                  }}
                >
                  Continue
                </Button>
              ) : (
                <Button
                  variant="primary"
                  className="common-btn bg-left"
                  onClick={() => {
                    navigator.clipboard.writeText(WalletEVM?.selectedAccount);
                    setCopy(true);
                  }}
                >
                  Copy
                </Button>
              )}
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <Modal
        className="new-user-modal"
        centered
        show={showIframe}
        onHide={handleCloseIframe}
        size="lg"
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div>
            <iframe
              src={iframelink}
              // src={`https://sweepwidget.com/c/85960-ksa3hjty?data-name=harshal&data-email=test.user@example.com&sw_text_input_7_1=${WalletEVM?.selectedAccount}`}
              // src="https://sweepwidget.com/c/85960-ksa3hjty?data-name=harshal&data-email=test.user@example.com&data-wallet-Address=0x7E1f02Ecb7616a15F3891C7e0365e56C5f6c3A16&data-auto-login=0"
              // src="https://sweepwidget.com/c/438-tu2zjsh4?data-name=harshal&data-email=test.user@example.com&data-auto-login=0"
              width="100%"
              height="910px"
              frameBorder="0"
              allowFullScreen
              style={{ border: "none" }}
            ></iframe>
          </div>
        </Modal.Body>
      </Modal>
      {/* end of socialmedia activity Codes Modal */}

      {/*deposite activity Codes Modal */}
      <Modal
        className="new-user-modal"
        centered
        show={depositmodal}
        onHide={handledepositmodalclose}
        size="md"
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div>
            <h4>{showData?.title}</h4>
            <p>{showData?.description}</p>
            <div className="d-flex gap-4">
              <Button
                variant="primary"
                className="common-btn bg-left"
                onClick={() => {
                  handledepositmodalclose();
                }}
              >
                Back
              </Button>{" "}
              <Button
                variant="primary"
                className="common-btn bg-left"
                onClick={() => {
                  navigate("/deposit-step-1");
                }}
              >
                Continue
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      {/* end of deposite activity Codes Modal */}

      {/*referral activity Codes Modal */}
      <Modal
        className="new-user-modal"
        centered
        show={refermodal}
        onHide={handlerefermodalclose}
        size="md"
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div>
            <h4>{showData?.title}</h4>
            <p>{showData?.description}</p>
            <div className="d-flex gap-4">
              <Button
                variant="primary"
                className="common-btn bg-left"
                onClick={() => {
                  handlerefermodalclose();
                }}
              >
                Back
              </Button>{" "}
              <Button
                variant="primary"
                className="common-btn bg-left"
                onClick={() => {
                  setShowReferralCodesModal(true);
                  handlerefermodalclose();
                }}
              >
                Continue
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      {/* end of referral activity Codes Modal */}

      {/*quiz activity Codes Modal */}
      <Modal
        className="new-user-modal"
        centered
        show={quizmodal}
        onHide={handlequizmodalclose}
        size="md"
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div>
            <h4>{showData?.title}</h4>
            <p>{showData?.description}</p>
            <div className="d-flex gap-4">
              <Button
                variant="primary"
                className="common-btn bg-left"
                onClick={() => {
                  handlequizmodalclose();
                }}
              >
                Back
              </Button>{" "}
              <Button
                variant="primary"
                className="common-btn bg-left"
                onClick={() => {
                  handlequizmodalclose();
                  setQuestionModal(true);
                }}
              >
                Continue
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <Modal
        className="new-user-modal"
        centered
        show={questionmodal}
        onHide={() => {
          setQuestionModal(false);
        }}
        size="lg"
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <h4 className="text-start mb-3">Quiz Questions</h4>
          <div className="quiz-outer-scroll">
            {questiondata?.map((items, index) => (
              <div className="quiz-ques-box shadow-box-main" key={items._id}>
                <p className="text-start">
                  {index + 1}. {items?.question}
                </p>
                <div className="radio-flex-btn">
                  {items?.options?.map((item, optionIndex) => (
                    <Form.Check
                      key={optionIndex}
                      label={`${String.fromCharCode(
                        65 + optionIndex
                      )}. ${item}`}
                      type="radio"
                      name={`question-${items._id}`}
                      value={optionIndex}
                      onChange={() =>
                        handleOptionChange(items._id, optionIndex)
                      }
                      checked={
                        selectedAnswers?.find(
                          (answer) => answer.id === items._id
                        )?.answer === optionIndex
                      }
                    />
                  ))}
                </div>
              </div>
            ))}
            {formerror && <p className="text-danger mt-3">{formerror}</p>}
            <Button
              variant="primary"
              className="common-btn bg-left"
              disabled={disable}
              onClick={() => {
                SubmitQuiz();
              }}
            >
              {" "}
              {disable === true ? "Processing" : "Submit"}
            </Button>
          </div>
        </Modal.Body>
      </Modal>
      <Modal
        className="new-user-modal"
        centered
        show={resultmodal}
        onHide={() => {
          setResultModal(false);
        }}
        size="lg"
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <h4 className="text-start mb-3">Quiz Result</h4>
          <div className="quiz-outer-scroll">
            {quizdata?.questionsDetail?.map((items, index) => (
              <div className="quiz-ques-box shadow-box-main" key={items._id}>
                <p className="text-start">
                  {index + 1}. {items?.question}
                </p>
                <div className="radio-flex-btn">
                  {items?.options?.map((item, optionIndex) => (
                    <>
                      <Form.Check
                        key={optionIndex}
                        label={`${String.fromCharCode(
                          65 + optionIndex
                        )}. ${item}`}
                        type="radio"
                        name={`question-${items._id}`}
                        value={optionIndex}
                        onChange={() =>
                          handleOptionChange(items._id, optionIndex)
                        }
                        checked={
                          selectedAnswers?.find(
                            (answer) => answer.id === items._id
                          )?.answer === optionIndex
                        }
                      />
                    </>
                  ))}
                </div>{" "}
                <p
                  className="text-end"
                  style={{
                    color:
                      items?.correctAnswer === items?.userAnswers
                        ? "green"
                        : "red",
                  }}
                >
                  Correct Answer:{" "}
                  {["", "A", "B", "C", "D"][items?.correctAnswer] || ""}
                </p>
              </div>
            ))}
            <p>
              Your Score {quizdata?.receivedMarks}/{quizdata?.totalMarks}{" "}
            </p>
            <p>
              You will receive {quizdata?.finalMultiplier}x multiplier points!
            </p>

            <Button
              variant="primary"
              className="common-btn bg-left"
              onClick={() => {
                setResultModal(false);
              }}
            >
              Done
            </Button>
          </div>
        </Modal.Body>
      </Modal>
      {/* end of quiz activity Codes Modal */}

      {/*register activity Codes Modal */}
      <Modal
        className="new-user-modal"
        centered
        show={registermodal}
        onHide={() => {
          setRegisterModal(false);
        }}
        size="md"
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div>
            <h4>{showData?.title}</h4>
            <p>{showData?.description}</p>
            <div className="d-flex gap-4">
              <Button
                variant="primary"
                className="common-btn bg-left"
                onClick={() => {
                  setRegisterModal(false);
                }}
              >
                Back
              </Button>{" "}
              <Button
                variant="primary"
                className="common-btn bg-left"
                onClick={() => {
                  setRegisterModal(false);
                  HandleRegister();
                }}
              >
                Continue
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      {/* end of register activity modals Codes */}
    </>
  );
};
