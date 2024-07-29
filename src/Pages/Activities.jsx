import React, { useEffect, useState } from "react";
import { Header } from "../Components/Header";
import { Col, Container, Modal, Row, Tab, Tabs } from "react-bootstrap";
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
  const [referralCodes, setReferralCodes] = useState([]);
  //===============End of code====================//

  //========================= Leaderboard States ============================
  const [topDeposits, setTopDeposits] = useState([]);
  const [topReferrals, setTopReferrals] = useState([]);
  const [monthlyTopUser, setMonthlyTopUser] = useState([]);
  const [quarterlyTopUser, setQuarterlyTopUser] = useState([]);
  const [showShareSocial, setShowShareSocial] = useState(false);
  const [codeShare, setCodeShare] = useState("");
  //================================End of code==============================//

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

  const handleCloseModals = () => {
    setShowReferralCodesModal(false);
  };
  const handleShowReferralCodesModal = () => setShowReferralCodesModal(true);

  //===============get refferal data  api====================//

  useEffect(() => {
    getdata();
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
        setReferralCodes(getdata?.data?.data?.referral_codes);
      }
    } catch (err) {}
  };
  //===============End of code====================//

  //================================= Get the leaderboeard data API ==============================================
  const getleaderboardData = async () => {
    try {
      const response = await axiosMain.get("/auth/get-leaderboard-deatils");
      // console.log(response);
      setTopDeposits(response.data.topDeposits); // Set the topDeposits state
      setTopReferrals(response.data.topReferrals);
      setMonthlyTopUser(response.data.monthlyTopUser);
      setQuarterlyTopUser(response.data.quarterlyTopUser);
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

  return (
    <>
      <Header />
      <section className="activity-main-sec">
        <Container>
          <Row>
            <Col md={11} className="m-auto">
              <h2 className="common-heading text-start mb-2">Activities</h2>
              <p className="sub-heading text-start">
                Complete the activities below and earn points
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
                Multiplier
              </h2>

              <div className="deposit-outer-box d-block">
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
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ============================================Leaderboard section ======================================================== */}
      <section className="leaderboard-main-sec pt-0">
        <Container>
          <Row>
            <Col>
              <h2 className="common-heading">Leaderboard</h2>
            </Col>
          </Row>
          <Row>
            {/* =============================Top deposits ====================================== */}
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
            {/* ===============================================End of code ======================================= */}

            {/* ================================================Top Referrals ==================================== */}
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
            {/* ========================================End of code ================================================ */}
          </Row>

          <Row>
            <Col lg={10} className="m-auto">
              <div className="top-deposit-table">
                <Tabs defaultActiveKey="top-depsit1" className="mb-3 ">
                  {/*================================================Monthly============================================== */}
                  <Tab eventKey="top-depsit1" title="Monthly">
                    <ul className="deposit-list-outer">
                      {monthlyTopUser.slice(0, 10).map((monthly, index) => (
                        <li>
                          <div
                            className={
                              WalletEVM?.selectedAccount?.toLowerCase() ==
                              monthly?.wallet_address?.toLowerCase()
                                ? "deposit-list-main user-address-main"
                                : "deposit-list-main"
                            }
                          >
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
                                <h4>
                                  {monthly.wallet_address}{" "}
                                  {WalletEVM?.selectedAccount?.toLowerCase() ==
                                  monthly?.wallet_address?.toLowerCase()
                                    ? "(You)"
                                    : ""}
                                </h4>
                                <p>
                                  {monthly.ENS_name ? monthly.ENS_name : "-"}
                                </p>
                              </div>
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
                  {/*================================================End of code =================================== */}

                  {/*================================================Quarterly =================================== */}
                  <Tab eventKey="top-depsit2" title="Quarterly">
                    <ul className="deposit-list-outer">
                      {quarterlyTopUser.slice(0, 10).map((quarterly, index) => (
                        <li>
                          <div
                            className={
                              WalletEVM?.selectedAccount?.toLowerCase() ==
                              monthly?.wallet_address?.toLowerCase()
                                ? "deposit-list-main user-address-main"
                                : "deposit-list-main"
                            }
                          >
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
                                <h4>
                                  {quarterly.wallet_address}{" "}
                                  {WalletEVM?.selectedAccount?.toLowerCase() ==
                                  quarterly?.wallet_address?.toLowerCase()
                                    ? "(You)"
                                    : ""}
                                </h4>
                                <p>
                                  {quarterly.ENS_name
                                    ? quarterly.ENS_name
                                    : "-"}
                                </p>{" "}
                              </div>
                            </div>
                            <div className="right-trophy">
                              <img
                                className="trophy-img"
                                src="assets/img/trophy.png"
                                alt=""
                              />
                              <div>
                                <h4>
                                  {quarterly.quarterly_earn_points.toFixed(2)}
                                </h4>
                                <p>Points</p>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </Tab>
                  {/*================================================End of code =================================== */}
                </Tabs>
              </div>
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
            {referralCodes?.map((items, index) => (
              <div className="referal-copy-row" key={index}>
                {items?.is_used ? (
                  <>
                    <div style={{ cursor: "not-allowed", userSelect: "none" }}>
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
                      </>
                    )}
                  </>
                )}
              </div>
            ))}
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
    </>
  );
};
