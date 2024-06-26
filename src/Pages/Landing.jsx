import React, { useMemo, useState, useEffect } from "react";
import {
  Col,
  Container,
  Form,
  Modal,
  Row,
  Button,
  Spinner,
} from "react-bootstrap";
import ConnectWalletModal from "../../src/Components/Ui/ConnectWalletModal";
import useAuth from "../hooks/useAuth";
import axiosMain from "../http/axios/axios_main";
import { useNavigate } from "react-router-dom";
import { encryptData } from "../Encrypt-Decrypt/encryption-decryption";
import { Header } from "../Components/Header";
import { useDispatch } from "react-redux";
import { userWalletLogin } from "../store/reducers/authReducer";
import axios from "axios";

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
  const { WalletEVM } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showConnectWalletModal, setShowConnectWalletModal] = useState(false);
  const [showReferralModal, setShowReferralModal] = useState(false);
  const [showNewShareModal, setShowNewShareModal] = useState(false);
  const [showReferralCodesModal, setShowReferralCodesModal] = useState(false);

  const [referralCode, setReferralCode] = useState("");
  const [referralCodes, setReferralCodes] = useState([]); // State to store referral codes

  const [errorMessage, setErrorMessage] = useState("");
  const [ENSName, setENSName] = useState(""); // State to hold the ENS name
  const [walletAddress, setWalletAddress] = useState(""); // State to hold the wallet address

  const [loading, setLoading] = useState(false); // Loading state for async operations
  const [isRestricted, setIsRestricted] = useState(false);

  const handleCloseModals = () => {
    setShowConnectWalletModal(false);
    setShowReferralModal(false);
    setShowNewShareModal(false);
    setShowReferralCodesModal(false);
  };

  //========================================= Display Modal at first =======================================
  const handleShowConnectWalletModal = () => {
    let objData = localStorage.getItem("WalletEVM");

    if (!objData) {
      // If WalletEVM key is not present in localStorage
      setShowConnectWalletModal(true);
    } else {
      // If WalletEVM key is present in localStorage
      setShowReferralModal(true);
      setWalletAddress(WalletEVM.selectedAccount);
    }
  };

  //========================================= Referral code change =======================================
  const handleReferralCodeChange = (event) => {
    setReferralCode(event.target.value);
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

      console.log("Request payload:", { referralCode: encryptedReferralCode });
      console.log("Response data:", response.data);

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
    console.log("Handling referral 1");
  };

  //========================================== Add user to the backend ============================================
  const addUserWithReferralCode = async () => {
    try {
      setLoading(true); // Start loading state

      // Log original data before encryption
      console.log("Original Referral Code:", referralCode);
      console.log("Original Wallet Address:", walletAddress);
      console.log("Original ENS Name:", ENSName);

      // Ensure none of the fields are empty
      if (!referralCode || !walletAddress) {
        setErrorMessage("Missing required fields.");
        return;
      }

      // Prepare payload with encrypted data
      const encryptedReferralCode = await encryptData(referralCode);
      const encryptedWalletAddress = await encryptData(walletAddress); // Use the state walletAddress
      const encryptedENSName = await encryptData(ENSName); // Use fetched ENS name

      // Log payload data
      console.log("Encrypted Referral Code:", encryptedReferralCode);
      console.log("Encrypted Wallet Address:", encryptedWalletAddress);
      console.log("Encrypted ENS Name:", encryptedENSName);

      const payload = {
        referralCode: encryptedReferralCode,
        walletAddress: encryptedWalletAddress,
      };
      console.log("Final payload being sent:", payload);

      // Make API call to add user with address and referral code
      const response = await axiosMain.post(
        "/auth/add-user-with-address-and-referralcode",
        payload
      );

      console.log("Add user response:", response.data); // Log response data

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

  //=========================================== Fetch wallet info and redirect to dashboard ====================================
  useEffect(() => {
    if (WalletEVM?.selectedAccount) {
      checkForAlreadyLogin(WalletEVM?.selectedAccount);
    }
  }, [WalletEVM?.selectedAccount]);

  const checkForAlreadyLogin = async (walletData) => {
    const RowWalletAddress = await encryptData(walletData);
    try {
      const response = await axiosMain.post("/auth/get-user-profile", {
        walletAddress: RowWalletAddress,
      });
      if (response?.data?.status) {
        if (response?.data?.isLogin) {
          dispatch(userWalletLogin(response.data.data));
          navigate("/dashboard");
        }
      }
    } catch (error) {
      console.log(error);
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
        console.log(response);
        const { country } = response.data;
        if (restrictedCountries.includes(country)) {
          setIsRestricted(true);
          //alert("Access restricted in your country.");
          // Optionally redirect to an error page or show a specific message
          document.querySelector(".restrict").innerHTML = `
              <div style="display: flex; justify-content: center; align-items: center; height: 7vh; ">
              <div style="display: flex; justify-content: center; align-items: center; height: 7vh; width: 50vh; background-color: red; color: white; text-align: center;">
                <span>
                <small>This site is not available for people or entities</small><br>
                <small>in US and other restricted jurisdictions.</small>
                </span>
              </div>
              </div>
            `;
        }
      } catch (error) {
        console.error("Error fetching location:", error);
      }
    };

    checkLocation();
  }, []);

  return (
    <>
      <Header />
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
                        <Button
                          variant="primary"
                          className="common-btn"
                          onClick={handleShowConnectWalletModal}
                          disabled={isRestricted}
                        >
                          <img src="assets/img/dash.png" alt="" />
                          <div>
                            Connect Wallet <span>Track your points here</span>
                          </div>
                        </Button>
                        <Button
                          variant="primary"
                          className="common-btn"
                          disabled={isRestricted}
                          href="#"
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

      <ConnectWalletModal
        {...ConnectWalletModalProps}
        handleConnectSuccess={handleShowReferral1} // Pass handleShowReferral1 function as prop
      />

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
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="mr-2 center"
                  />
                  Loading...
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
        onHide={handleCloseModals}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div>
            <img src="assets/img/Logo.png" alt="" className="img-fluid logo" />
            <p>Here are your referral codes</p>
            {referralCodes.map((code, index) => (
              <div className="referal-copy-row" key={index}>
                <div>
                  <span>{index + 1}</span>
                  {code.code}
                </div>
                <a href="#">
                  <img src="assets/img/copy.png" alt="Copy" />
                </a>
              </div>
            ))}
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
