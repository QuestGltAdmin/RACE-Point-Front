import React, { useEffect, useRef, useState } from "react";
import { Header } from "../Components/Header";
import { Button, Col, Container, Modal, Row, Tab, Tabs } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { encryptData } from "../Encrypt-Decrypt/encryption-decryption";
import axiosMain from "../http/axios/axios_main";
import { ShareSocial } from "react-share-social";
import { set } from "lodash";
import { resolveENSName } from "../helpers/ENSname";

export const Activities = () => {
  //=================Global Variables==================//
  const navigate = useNavigate();
  const { user, WalletEVM } = useAuth();
  //===============End of code====================//

  //=================Local Variables==================//
  const [showReferralCodesModal, setShowReferralCodesModal] = useState(false);
  const [referralCodes, setReferralCodes] = useState(user?.referral_codes);
  //===============End of code====================//

  //========================= Leaderboard States ============================
  const [topDeposits, setTopDeposits] = useState([]);
  const [topReferrals, setTopReferrals] = useState([]);
  const [monthlyTopUser, setMonthlyTopUser] = useState([]);
  const [quarterlyTopUser, setQuarterlyTopUser] = useState([]);
  const [activitydata, setActivityData] = useState([]);
  const [showShareSocial, setShowShareSocial] = useState(false);
  const [showIframe, setShowIframe] = useState(false);
  const [depositmodal, setDepositModal] = useState(false);
  const [socialmodal, setSocialModal] = useState(false);
  const [showData, setShowData] = useState([]);
  const [refermodal, setReferModal] = useState(false);
  const [codeShare, setCodeShare] = useState("");
  const [iframelink, setIframeLink] = useState("");
  const [allTopUser, setAllTopUser] = useState([]);
  const [copy, setCopy] = useState(false);
  const [countForAv, setCountForAv] = useState([]);

  //================================End of code==============================//

  useEffect(() => {
    if (user?.referral_codes?.length > 0) {
      const filterData = user?.referral_codes?.filter((items, index) => {
        return !items?.is_used;
      });
      console.log(filterData);
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
  const handlesocialmodalclose = () => {
    setSocialModal(false);
  };
  const handlerefermodalclose = () => {
    setReferModal(false);
  };

  const HandleIframes = (items) => {
    console.log("items", items);

    if (items?.type == "Refer") {
      // setShowReferralCodesModal(true);
      setShowData(items);
      setReferModal(true);
    } else if (items?.type == "Social_Media") {
      setIframeLink(items?.link);
      setShowData(items);
      // setShowIframe(true);
      setSocialModal(true);
    } else if (items?.type == "Deposit") {
      setShowData(items);
      setDepositModal(true);
    }
  };

  const handleShowReferralCodesModal = () => setShowReferralCodesModal(true);

  //===============get refferal data  api====================//

  useEffect(() => {
    // getdata();
    getleaderboardData();
  }, []);

  const getdata = async () => {
    let ensName = await resolveENSName(WalletEVM?.selectedAccount);
    const encryptedReferralCode = await encryptData(user?.from_referral_code);
    const encryptedWalletAddress = await encryptData(
      WalletEVM?.selectedAccount
    );
    const encryptedENSName = ensName ? await encryptData(ensName) : null; // Encrypt ENS name if available

    const payload = {
      referralCode: encryptedReferralCode,
      walletAddress: encryptedWalletAddress,
    };
    if (encryptedENSName) {
      payload.ensName = encryptedENSName;
    }
    try {
      const getdata = await axiosMain.post(
        "/auth/add-user-with-address-and-referralcode",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (getdata?.data?.status) {
        // setReferralCodes(getdata?.data?.data?.referral_codes);
      }
    } catch (err) {}
  };
  //===============End of code====================//

  //================================= Get the leaderboeard data API ==============================================
  const getleaderboardData = async () => {
    try {
      const response = await axiosMain.get("/auth/get-leaderboard-deatils");
      setTopDeposits(response.data.topDeposits); // Set the topDeposits state
      setTopReferrals(response.data.topReferrals);
      setMonthlyTopUser(response.data.monthlyTopUser);
      setQuarterlyTopUser(response.data.weeklyTopUser);
      setAllTopUser(response.data.allTopUser);
    } catch (err) {
      console.error("Error fetching leaderboard data:", err);
    }
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
      // const getData = await axiosMain.get(
      //   "auth/get-activity-plan?page=1&limit=100"
      // );
      if (getData?.data?.status) {
        setActivityData(getData?.data?.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  //==================================End Of Code==================================//
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

              {/* <div className="deposit-outer-box d-block">
                <div className="invite-flex">
                  <div className="deposit-inner-box">
                    <img src="assets/images/invite.png" alt="" />
                    <div>
                      <h3>Invite</h3>
                      <h5>5x invites available</h5>
                      <p>
                        Invite your friends to join the race and earn more
                        points!
                      </p>
                    </div>
                  </div>
                  <button
                    className="common-btn bg-left"
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
                <div className="coming-soon-box">
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining
                    essentially unchanged.
                  </p>
                  <h6>
                    <span>Coming Soon!</span>
                  </h6>
                </div>
              </div> */}

              <Row>
                <Col lg={4}>
                  <div className="deposit-outer-box d-block">
                    <div className="invite-flex d-block">
                      <div className="deposit-inner-box">
                        <img src="assets/images/invite.png" alt="" />
                        <div>
                          <h3>Invite</h3>
                          <h5 className="idex-new">{countForAv?.length}X invites available</h5>
                          
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
                                    {items?.multiplier}{" "}
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
                                    <h5 className="idex-new">
                                    No Expiry
                                    </h5>
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

      {/* ============================================Leaderboard section ======================================================== */}
      {/* <section className="leaderboard-main-sec pt-0">
        <Container>
          <Row>
            <Col>
              <h2 className="common-heading">Leaderboard</h2>
            </Col>
          </Row>
          <Row>
            <Col lg={5}>
              <div className="top-deposit-box for-min-height">
                <h4 className="sub-heading text-start">Top Deposits</h4>
                <Row>
                  {topDeposits.map((deposit, index) => (
                    <Col lg={6} md={6} sm={6} xs={6}>
                      <div className="inner-user-box">
                        <div className="user-img">
                          <img src={deposit.profile} alt="" />
                        </div>
                        <h4>{`${deposit.wallet_address.slice(
                          0,
                          5
                        )}...${deposit.wallet_address.slice(-5)}`}</h4>
                        <p>{deposit.ENS_name ? deposit.ENS_name : "-"}</p>{" "}
                        <h3>
                          <b>
                            {deposit.currency}
                            {deposit.deposit.toFixed(4)}
                          </b>{" "}
                          Deposited
                        </h3>
                      </div>
                    </Col>
                  ))}
                </Row>
              </div>
            </Col>

            <Col lg={7}>
              <div className="top-deposit-box for-min-height">
                <h4 className="sub-heading text-start">Top Referrals</h4>
                <Row>
                  {topReferrals.map((refer, index) => (
                    <Col lg={4} md={4} sm={6} xs={6}>
                      <div className="inner-user-box top-referrals">
                        <div className="user-img">
                          <img src={refer.profile} alt="" />
                        </div>
                        <h4>{`${refer.wallet_address.slice(
                          0,
                          5
                        )}...${refer.wallet_address.slice(-5)}`}</h4>
                        <p>{refer.ENS_name ? refer.ENS_name : "-"}</p>{" "}
                        <div className="referral-point">
                          <h3>
                            <img src="assets/img/referal.png" alt="" />{" "}
                            <b>{refer.referral_count}</b> <span>Referrals</span>
                          </h3>
                          <h3>
                            <img src="assets/img/trophy.png" alt="" />{" "}
                            <div>
                              <b>{refer.earn_points.toFixed(2)}</b>{" "}
                              <span>Points</span>
                            </div>
                          </h3>
                        </div>
                      </div>
                    </Col>
                  ))}
                </Row>
              </div>
            </Col>
          </Row>

          <Row>
            <Col lg={10} className="m-auto">
              <div className="top-deposit-table">
                <Tabs defaultActiveKey="top-depsit-all" className="mb-3 ">
                  <Tab eventKey="top-depsit-all" title="All">
                    <ul className="deposit-list-outer">
                      {allTopUser?.slice(0, 50).map((monthly, index) => (
                        <li>
                          <div className="deposit-list-main">
                            <div className="left-user">
                              <div className="count-deposit">
                                <span>{index + 1}</span>
                                <img
                                  className="crown-img"
                                  src={
                                    index + 1 === 1
                                      ? "assets/img/king.png"
                                      : "assets/img/crown.png"
                                  }
                                  alt=""
                                />
                              </div>
                              <img
                                className="user-img"
                                src={monthly.profile}
                                alt=""
                              />
                              <div>
                                <h4>{monthly.wallet_address} </h4>
                                <p>
                                  {monthly.ENS_name ? monthly.ENS_name : "-"}
                                </p>
                              </div>
                            </div>
                            <div>
                              <h4>
                                {WalletEVM?.selectedAccount?.toLowerCase() ==
                                monthly?.wallet_address?.toLowerCase()
                                  ? "(You)"
                                  : ""}
                              </h4>
                            </div>
                            <div className="right-trophy">
                              <img
                                className="trophy-img"
                                src="assets/img/trophy.png"
                                alt=""
                              />
                              <div>
                                <h4>{monthly.earn_points.toFixed(2)}</h4>
                                <p>Points</p>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </Tab>

                  <Tab eventKey="top-depsit1" title="Monthly">
                    <ul className="deposit-list-outer">
                      {monthlyTopUser?.slice(0, 10).map((monthly, index) => (
                        <li>
                          <div className="deposit-list-main">
                            <div className="left-user">
                              <div className="count-deposit">
                                <span>{index + 1}</span>
                                <img
                                  className="crown-img"
                                  src={
                                    index + 1 === 1
                                      ? "assets/img/king.png"
                                      : "assets/img/crown.png"
                                  }
                                  alt=""
                                />
                              </div>
                              <img
                                className="user-img"
                                src={monthly.profile}
                                alt=""
                              />
                              <div>
                                <h4>{monthly.wallet_address} </h4>
                                <p>
                                  {monthly.ENS_name ? monthly.ENS_name : "-"}
                                </p>
                              </div>
                            </div>
                            <div>
                              <h4>
                                {WalletEVM?.selectedAccount?.toLowerCase() ==
                                monthly?.wallet_address?.toLowerCase()
                                  ? "(You)"
                                  : ""}
                              </h4>
                            </div>
                            <div className="right-trophy">
                              <img
                                className="trophy-img"
                                src="assets/img/trophy.png"
                                alt=""
                              />
                              <div>
                                <h4>
                                  {monthly.monthly_earn_points.toFixed(2)}
                                </h4>
                                <p>Points</p>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </Tab>

                  <Tab eventKey="top-depsit2" title="Weekly">
                    <ul className="deposit-list-outer">
                      {quarterlyTopUser
                        ?.slice(0, 10)
                        .map((quarterly, index) => (
                          <li>
                            <div className="deposit-list-main">
                              <div className="left-user">
                                <div className="count-deposit">
                                  <span>{index + 1}</span>
                                  <img
                                    className="crown-img"
                                    src={
                                      index + 1 === 1
                                        ? "assets/img/king.png"
                                        : "assets/img/crown.png"
                                    }
                                    alt=""
                                  />
                                </div>
                                <img
                                  className="user-img"
                                  src={quarterly.profile}
                                  alt=""
                                />
                                <div>
                                  <h4>{quarterly.wallet_address} </h4>
                                  <p>
                                    {quarterly.ENS_name
                                      ? quarterly.ENS_name
                                      : "-"}
                                  </p>{" "}
                                </div>
                              </div>
                              <div>
                                <h4>
                                  {WalletEVM?.selectedAccount?.toLowerCase() ==
                                  quarterly?.wallet_address?.toLowerCase()
                                    ? "(You)"
                                    : ""}
                                </h4>
                              </div>
                              <div className="right-trophy">
                                <img
                                  className="trophy-img"
                                  src="assets/img/trophy.png"
                                  alt=""
                                />
                                <div>
                                  <h4>
                                    {quarterly.weekly_earn_points?.toFixed(2)}
                                  </h4>
                                  <p>Points</p>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                    </ul>
                  </Tab>
                </Tabs>
              </div>
            </Col>
          </Row>
        </Container>
      </section> */}

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
    </>
  );
};
