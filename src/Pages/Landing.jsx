import React, { useMemo, useState, useEffect } from "react";
import {
  Col,
  Container,
  Form,
  Modal,
  Row,
  Button,
  Spinner,
  Tabs,
  Tab,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import ConnectWalletModal from "../../src/Components/Ui/ConnectWalletModal";
import useAuth from "../hooks/useAuth";
import axiosMain from "../http/axios/axios_main";
import { useNavigate } from "react-router-dom";
import { encryptData } from "../Encrypt-Decrypt/encryption-decryption";
import { useDispatch } from "react-redux";
import { isLogin, userWalletLogin } from "../store/reducers/authReducer";
import axios from "axios";
import { LandingPageHeader } from "../Components/LandingPageHeader";
import { resolveENSName } from "../helpers/ENSname";

//================================================== All the juridictions restricted countries ===================================
{
  /*const restrictedCountries = [
  'US', 'KP', 'IR', 'SY', 'SD', 'UA', 'CU',  // Existing restricted countries
  'SY', 'JM', 'ML', 'SS', 'BF', 'CD', 'HT', 'MZ', 'NG', 'PH', 
  'SN', 'ZA', 'TZ', 'TR', 'BB', 'GI', 'IR', 'CU', 'KP', 'KY', 'HR', 'JO'
]; */
}

//=======================================Restricted Countries===========================================
const restrictedCountries = ["US"]; // add "IN" for testing

const Landing = () => {
  //=================================Global Variable=================================//
  const { WalletEVM, isUserAuthenticated } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //=================================End Of Code=================================//

  //=================================Local Variable=================================//
  const [showConnectWalletModal, setShowConnectWalletModal] = useState(false);
  const [showReferralModal, setShowReferralModal] = useState(false);
  const [showNewShareModal, setShowNewShareModal] = useState(false);
  const [showReferralCodesModal, setShowReferralCodesModal] = useState(false);

  const [referralCode, setReferralCode] = useState("");
  const [referralCodes, setReferralCodes] = useState([]); // State to store referral codes

  const [errorMessage, setErrorMessage] = useState("");
  // const [ENSName, setENSName] = useState(""); // State to hold the ENS name
  const [walletAddress, setWalletAddress] = useState(""); // State to hold the wallet address

  const [loading, setLoading] = useState(false); // Loading state for async operations
  const [isRestricted, setIsRestricted] = useState(false);
  const [checkApiRes, setCheckApiRes] = useState(0);
  const [copiedCodeIndex, setCopiedCodeIndex] = useState(null);
  //=================================End Of Code=================================//

  const handleCloseReferralCodesModal = () => {
    setShowReferralCodesModal(false);
    navigate("/dashboard"); // Redirect to dashboard when closing the referral codes modal
  };

  const handleCloseModals = () => {
    setShowConnectWalletModal(false);
    setShowReferralModal(false);
    setShowNewShareModal(false);
    //setShowReferralCodesModal(false);
  };

  //=========================================== Fetch wallet info and redirect to dashboard ====================================
  useEffect(() => {
    if (WalletEVM?.selectedAccount) {
      checkForAlreadyLogin(WalletEVM?.selectedAccount);
    }
  }, [WalletEVM?.selectedAccount]);

  const checkForAlreadyLogin = async (walletData) => {
    setCheckApiRes(0);
    const RowWalletAddress = await encryptData(walletData);
    try {
      const response = await axiosMain.post("/auth/get-user-profile", {
        walletAddress: RowWalletAddress,
      });
      // console.log("response", response);
      if (response?.data?.status) {
        if (response?.data?.isLogin) {
          dispatch(userWalletLogin(response.data.data));
          setCheckApiRes(1);
        } else {
          setCheckApiRes(2);
        }
      }
    } catch (error) {
      setCheckApiRes(0);
      // console.log(error);
    }
  };

  //=====================================End Of Code=======================================//

  //========================================= Display Modal at first =======================================
  const handleShowConnectWalletModal = () => {
    // If WalletEVM key is present in localStorage
    setShowReferralModal(true);
    setWalletAddress(WalletEVM.selectedAccount);
  };
  //=====================================End Of Code=======================================//

  //========================================= Referral code change =======================================
  const handleReferralCodeChange = (event) => {
    setReferralCode(event.target.value);
    setWalletAddress(WalletEVM?.selectedAccount);
    setErrorMessage(""); // Clear any previous error message
  };

  //========================================= Referral code verify =======================================
  const handleVerifyReferralCode = async () => {
    try {
      if (!referralCode) {
        setErrorMessage("Referral code cannot be empty.");
        return;
      }

      setLoading(true); // Start loading state

      const encryptedReferralCode = await encryptData(referralCode); // Encrypt the referral code
      const response = await axiosMain.post("/auth/verify-referral-code", {
        referralCode: encryptedReferralCode,
      });

      if (response.data.status) {
        // If referral code is verified successfully
        await addUserWithReferralCode(); // Call API to add user with referral code
      } else {
        setErrorMessage(
          response.data.message || "Invalid referral code. Please try again."
        );
      }
    } catch (error) {
      console.error("Error verifying referral code:", error);
      setErrorMessage(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setLoading(false); // Stop loading state
    }
  };

  const handleShowReferral1 = () => {
    // console.log("Handling referral 1");
  };

  //========================================== Add user to the backend ============================================
  const addUserWithReferralCode = async () => {
    try {
      setLoading(true); // Start loading state

      // Ensure none of the fields are empty
      if (!referralCode || !walletAddress) {
        setErrorMessage("Missing required fields.");
        return;
      }

      let ensName = await resolveENSName(walletAddress);

      // Prepare payload with encrypted data
      const encryptedReferralCode = await encryptData(referralCode);
      const encryptedWalletAddress = await encryptData(walletAddress); // Use the state walletAddress
      const encryptedENSName = ensName ? await encryptData(ensName) : null; // Encrypt ENS name if available

      const payload = {
        referralCode: encryptedReferralCode,
        walletAddress: encryptedWalletAddress,
      };
      if (encryptedENSName) {
        payload.ensName = encryptedENSName;
      }

      // Make API call to add user with address and referral code
      const response = await axiosMain.post(
        "/auth/add-user-with-address-and-referralcode",
        payload
      );

      if (!response.data.status) {
        setErrorMessage(response.data.message || "Failed to add user.");
      } else {
        setReferralCodes(response.data.data.referral_codes); // Store referral codes in state

        setShowNewShareModal(true); // Show the "New Share" modal
        setShowReferralModal(false);
      }
    } catch (error) {
      console.error("Error adding user with referral code:", error);
      setErrorMessage(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setLoading(false); // Stop loading state
    }
  };

  //======================================== Define ConnectWalletModalProps ===========================================
  const ConnectWalletModalProps = useMemo(
    () => ({
      modalProps: {
        show: showConnectWalletModal,
        onHide: handleCloseModals,
      },
      handleConnectSuccess: handleShowReferral1, // Check this line for correct function reference
    }),
    [showConnectWalletModal]
  );

  const handleShowReferralCodesModal = () => setShowReferralCodesModal(true);

  //=========================================== Check for location restriction =============================================
  useEffect(() => {
    const checkLocation = async () => {
      try {
        const response = await axios.get("https://ipapi.co/json/");
        const { country } = response.data;
        if (restrictedCountries.includes(country)) {
          setIsRestricted(true);
          //alert("Access restricted in your country.");
          // Optionally redirect to an error page or show a specific message
          document.querySelector(".restrict").innerHTML = `
            
              <div className="error-note" style="border-radius: 8px;
              background: #B91C1C;
              color: #FFF;
              font-size: 0.7;
              font-style: normal;
              font-weight: 500;
              line-height: 1.4rem;
              letter-spacing: 0.1px;
              padding: 12px 10px;
              text-align: left;
              display: flex;
              align-items: center;
              justify-content: flex-start;
                  max-width: 400px;
                 margin: 24px auto;">
              <img style="height: 24px;
              width: 24px;
              object-fit: contain;
              margin-right: 10px;" src="assets/img/warning.png" alt="" />
              This site is not available for people or entities in US and other
              restricted jurisdictions
            </div>
            `;
        }
      } catch (error) {
        console.error("Error fetching location:", error);
      }
    };

    checkLocation();
  }, []);
  //=========================================== End of code =============================================

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

  //=============================== Display referral modal on load if walletEVM in localStorage =================================
  /* useEffect(() => {
    const timer = setTimeout(() => {
      showReferral();
    }, 2000);

    return () => clearTimeout(timer); // Cleanup the timer on unmount or dependency change
  }, []);

  const showReferral = () => {
    console.log(isUserAuthenticated);
    if (WalletEVM?.selectedAccount && !isUserAuthenticated) {
      setShowReferralModal(true);
    }
  };*/

  const [topDeposits, setTopDeposits] = useState([]);
  const [topReferrals, setTopReferrals] = useState([]);
  const [monthlyTopUser, setMonthlyTopUser] = useState([]);
  const [quarterlyTopUser, setQuarterlyTopUser] = useState([]);
  const [allTopUser, setAllTopUser] = useState([]);

  //===============get refferal data  api====================//

  useEffect(() => {
    getleaderboardData();
  }, []);

  //================================= Get the leaderboeard data API ==============================================
  const getleaderboardData = async () => {
    try {
      const response = await axiosMain.get("/auth/get-leaderboard-deatils");
      // console.log(response);
      setTopDeposits(response.data.topDeposits); // Set the topDeposits state
      setTopReferrals(response.data.topReferrals);
      setMonthlyTopUser(response.data.monthlyTopUser);
      setQuarterlyTopUser(response.data.weeklyTopUser);
      setAllTopUser(response.data.allTopUser);
    } catch (err) {
      console.error("Error fetching leaderboard data:", err);
    }
  };

  /////////////////////new models ////////////////////////////////////

  const [show1, setShow1] = useState(false);
  const handleModal1 = () => {
    setShow1(true);
  };
  const handleModalClose1 = () => {
    setShow1(false);
  };

  const [show2, setShow2] = useState(false);
  const handleModal2 = () => {
    setShow2(true);
  };
  const handleModalClose2 = () => {
    setShow2(false);
  };

  const [showdashboard, setShowDashboard] = useState(false);
  const handleModaldashboard = () => {
    setShowDashboard(true);
  };
  const handleModaldashboardClose = () => {
    setShowDashboard(false);
  };

  const [showActivity, setShowActivity] = useState(false);
  const handleModalActivity = () => {
    setShowActivity(true);
  };
  const handleModalActivityClose = () => {
    setShowActivity(false);
  };
  /////////////////////end of code////////////////////////////////////

  return (
    <>
      <LandingPageHeader />
      <section className="landing-banner-sec">
        <Container>
          <Row>
            <Col>
              <div>
                <Row className="align-items-center">
                  <Col lg={5}>
                    <div className="left-img">
                      <img
                        src="assets/img/left-img.gif"
                        className="img-fluid"
                        alt=""
                      />
                    </div>
                  </Col>
                  <Col lg={7}>
                    <div className="right-sid-content">
                      <h2>
                        The more activities you complete, the more points you
                        get.
                      </h2>
                      <p>Watch out for the multipliers!</p>
                      <div className="banner-btn">
                        {WalletEVM?.selectedAccount ? (
                          <Button
                            variant="primary"
                            className={
                              isRestricted
                                ? "common-btn disable-btn"
                                : "common-btn"
                            }
                            onClick={() => {
                              if (checkApiRes == 0) {
                              } else if (checkApiRes == 1) {
                                navigate("/dashboard");
                              } else {
                                handleShowConnectWalletModal();
                              }
                            }}
                            disabled={isRestricted}
                          >
                            <img src="assets/img/dash.png" alt="" />

                            <div>Dashboard</div>
                          </Button>
                        ) : (
                          <Button
                            variant="primary"
                            className={
                              isRestricted
                                ? "common-btn disable-btn"
                                : "common-btn"
                            }
                            onClick={() => {
                              setShowConnectWalletModal(true);
                            }}
                            disabled={isRestricted}
                          >
                            <img src="assets/img/dash.png" alt="" />

                            <div>
                              Connect Wallet <span>Track your points here</span>
                            </div>
                          </Button>
                        )}

                        <Button
                          variant="primary"
                          className={
                            isRestricted
                              ? "common-btn disable-btn"
                              : "common-btn"
                          }
                          disabled={isRestricted}
                          onClick={() => {
                            if (isUserAuthenticated) {
                              navigate("/activities");
                            } else {
                              navigate("/");
                            }
                          }}
                        >
                          <img src="assets/img/star.png" alt="" />
                          Activities
                        </Button>
                      </div>
                    </div>
                  </Col>
                </Row>{" "}
                <Row className="align-items-center">
                  <p className="restrict "></p>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <div className="text-center">
        <a href="#leaderboard" className="arrow-img">
          <img src="assets/img/arrow-down.png" alt="" />
        </a>
      </div>
      {/* ============================================Leaderboard section ======================================================== */}
      <section className="leaderboard-main-sec" id="leaderboard">
        <Container>
          <Row>
            <Col>
              <h2 className="common-heading">
                Leaderboard
                <span className="info-tooltip">
                  <img
                    src="assets/img/infor2.png"
                    className="info-icon"
                    alt=""
                  />
                  <div>
                    <h5>Welcome to the Leaderboard!</h5>
                    <p>
                      Here, you can check your current ranking and see how you
                      stack up against others. Keep an eye on the top
                      spots—future awards will be given to the best-ranked
                      individuals.
                    </p>
                    {/* <p className="text-end">
                      <button className="okey-btn">Okey</button>
                    </p> */}
                  </div>
                </span>
              </h2>
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
                          <img src="assets/images/avatar.png" alt="" />
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
                          <img src="assets/images/avatar.png" alt="" />
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
                <Tabs defaultActiveKey="top-depsit-all" className="mb-3 ">
                  {/*================================================All============================================== */}
                  <Tab eventKey="top-depsit-all" title="All">
                    <ul className="deposit-list-outer">
                      {allTopUser?.slice(0, 50).map((monthly, index) => (
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
                                src="assets/images/avatar.png"
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

                  {/*================================================End Of Code============================================== */}
                  {/*================================================Monthly============================================== */}
                  <Tab eventKey="top-depsit1" title="Monthly">
                    <ul className="deposit-list-outer">
                      {monthlyTopUser?.slice(0, 10).map((monthly, index) => (
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
                                src="assets/images/avatar.png"
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
                  {/*================================================End of code =================================== */}

                  {/*================================================Quarterly =================================== */}
                  <Tab eventKey="top-depsit2" title="Weekly">
                    <ul className="deposit-list-outer">
                      {quarterlyTopUser
                        ?.slice(0, 10)
                        .map((quarterly, index) => (
                          <li>
                            <div
                              className={
                                WalletEVM?.selectedAccount?.toLowerCase() ==
                                quarterly?.wallet_address?.toLowerCase()
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
                                  src="assets/images/avatar.png"
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
                  {/*================================================End of code =================================== */}
                </Tabs>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <ConnectWalletModal
        {...ConnectWalletModalProps}
        handleConnectSuccess={handleShowReferral1} // Pass handleShowReferral1 function as prop
      />
      /////////////////////////////////////* new
      models*///////////////////////////////////////////////
      <Modal
        className="new-user-modal"
        centered
        show={show1}
        onHide={handleModalClose1}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div>
            <h4>Welcome to the RACE Points System!</h4>
            <p className="mt-4">
              <small>
                The “Point System” is your gateway to understand the future of
                asset tokenization and to learn about RACE.
              </small>
            </p>

            <Button variant="primary" className="common-btn bg-left">
              {/* <img src="assets/img/arrow_forward.png" alt="" /> */}
              Next
            </Button>
          </div>
        </Modal.Body>
      </Modal>
      <Modal
        className="new-user-modal"
        centered
        show={show2}
        onHide={handleModalClose2}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div>
            <h4>Welcome to the RACE Points System!</h4>
            <p className="mt-4">
              <small>
                The platform is designed to facilitate your learning through a
                structured rewards mechanism.
              </small>
            </p>

            <Button variant="primary" className="common-btn bg-left">
              {/* <img src="assets/img/arrow_forward.png" alt="" /> */}
              Okey
            </Button>
          </div>
        </Modal.Body>
      </Modal>
      <Modal
        className="new-user-modal"
        centered
        show={showdashboard}
        onHide={handleModaldashboardClose}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div>
            <h4>Welcome to your Dashboard!</h4>
            <p className="mt-4">
              <small>
                Here, you can easily track your deposits, view your total
                points, and check the distribution of your vaults.
              </small>
            </p>

            <Button variant="primary" className="common-btn bg-left">
              Next
            </Button>
          </div>
        </Modal.Body>
      </Modal>
      <Modal
        className="new-user-modal"
        centered
        show={showActivity}
        onHide={handleModalActivityClose}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div>
            <h4>Welcome to your Activities!</h4>
            <p className="mt-4">
              <small>
                Here, you have the opportunity to multiply the points you've
                already earned by completing dynamic tasks. Explore the tasks to
                see how you can boost your point totals.
              </small>
            </p>

            <Button variant="primary" className="common-btn bg-left">
              Next <img src="assets/img/arrow_forward.png" alt="" />
            </Button>
          </div>
        </Modal.Body>
      </Modal>
      /////////////////////////////////////* new models
      end*///////////////////////////////////////////////
      {/* New user modal */}
      <Modal
        className="new-user-modal"
        centered
        show={showReferralModal}
        onHide={handleCloseModals}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div>
            <img src="assets/img/Logo.png" alt="" className="img-fluid logo" />
            <p>Welcome to the RACE Points System!</p>
            <p>
              This site is only available to invited users. Please input the
              referral code you’ve received to proceed
            </p>
            <Form.Group className="mb-3 outer-input">
              <Form.Label>Referral Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Referral Code here"
                value={referralCode}
                onChange={handleReferralCodeChange}
                disabled={loading} // Disable input field when loading
              />
            </Form.Group>
            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <Button
              variant="primary"
              className="common-btn bg-left"
              onClick={handleVerifyReferralCode}
              disabled={loading} // Disable button when loading
            >
              {loading ? (
                <>
                  <div className="spinner-flex-box">
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      className=""
                    />
                    Loading...
                  </div>
                </>
              ) : (
                <>
                  Enter <img src="assets/img/arrow_forward.png" alt="" />
                </>
              )}
            </Button>
          </div>
        </Modal.Body>
      </Modal>
      {/* New share */}
      <Modal
        className="new-user-modal"
        centered
        show={showNewShareModal}
        onHide={handleCloseModals}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div>
            <img src="assets/img/Logo.png" alt="" className="img-fluid logo" />
            <p>Pay close attention!</p>
            <p>
              You only have 5 referral codes. Your multiplier will depend on who
              you invite successfully to the platform.
            </p>

            <Button
              variant="primary"
              className="common-btn bg-left"
              onClick={handleShowReferralCodesModal}
              disabled={loading} // Disable button when loading
            >
              {loading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="mr-2"
                  />
                  Loading...
                </>
              ) : (
                <>
                  Proceed with wisdom{" "}
                  <img src="assets/img/arrow_forward.png" alt="" />
                </>
              )}
            </Button>
          </div>
        </Modal.Body>
      </Modal>
      {/* Referral Codes Modal */}
      <Modal
        className="new-user-modal"
        centered
        show={showReferralCodesModal}
        onHide={handleCloseReferralCodesModal}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div>
            <img src="assets/img/Logo.png" alt="" className="img-fluid logo" />
            <p>Here are your referral codes</p>
            <div className="more-scroll">
              {referralCodes.map((code, index) => (
                <div className="referal-copy-row" key={index}>
                  <div>
                    <span>{index + 1}</span>
                    {code.code}
                  </div>
                  {copiedCodeIndex === index ? (
                    <span className="text-white m-2">Copied!</span>
                  ) : (
                    <a
                      href="#"
                      onClick={(event) => handleCopy(code.code, index, event)}
                    >
                      <img src="assets/img/copy.png" alt="Copy" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Modal.Body>
      </Modal>
      {/* wallet connect popup */}
      {/* <Modal
          className="new-user-modal wallet-connect"
          centered
          show={show}
          onHide={handleClose}
        >
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <div>
              <img src="assets/img/Logo.png" alt="" className="img-fluid logo" />
              <p>
                You’ll need an Ethereum wallet to sign in.{" "}
                <a href="" className="links">
                  Learn more <img src="assets/img/open_in_new.png" alt="" />
                </a>
              </p>
              <p>
                Once connected, you will need to sign a message to agree to the{" "}
                <a href="" className="links">
                  legal disclaimer
                </a>{" "}
                before using this website.
              </p>

              <p>
                <b>Connect with:</b>
              </p>
              <a href="" className="browse-btn">
                <img src="assets/img/Icon.png" alt="" /> Browser Wallet
              </a>
              <a href="" className="wallet-connect">
                <img src="assets/img/connect.png" alt="" /> Wallet Connect
              </a>
            </div>
          </Modal.Body>
        </Modal> */}
    </>
  );
};

export default Landing;
