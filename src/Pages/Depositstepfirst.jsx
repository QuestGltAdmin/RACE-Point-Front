import React, { useEffect, useState } from "react";
import { Header } from "../Components/Header";
import {
  Col,
  Container,
  Dropdown,
  Form,
  InputGroup,
  Modal,
  ProgressBar,
  Row,
} from "react-bootstrap";
import { getUsdtAndUsdcBalance } from "../helpers/getUSDTBalance";
import useAuth from "../hooks/useAuth";
import { encryptData } from "../Encrypt-Decrypt/encryption-decryption";
import axiosMain from "../http/axios/axios_main";
import { getRaceBalance } from "../helpers/raceTokenBalance";
import { getUsdtAndUsdcPrice } from "../helpers/getUSDTPrice";
import { getRaceTokenPrice } from "../helpers/getRaceTokenPrice";
import { ToastContainer, toast } from "react-toastify";
import { deposit } from "../helpers/deposit";
import { approveERC20 } from "../helpers/ApproveToken";
import { commonSwitch } from "../helpers/ChainSwitch";
import { withdrawVault } from "../helpers/withdraw";
import { approveRace } from "../helpers/ApproveRaceToken";
import { getWithdrawPricedetails } from "../helpers/withdrawAssetCalc";

export const Depositstepfirst = () => {
  //========================= Global variable =========================//
  const { WalletEVM, walletbalance, user } = useAuth();
  //========================= end of code =========================//

  //========================= local variable =========================//
  const [show, setShow] = useState(false);
  const [showwithdraw, setShowWithdraw] = useState(false);
  const [showtransaction, setShowTransaction] = useState(false);
  const [flag, setFlag] = useState(false);
  const [balance, setBalance] = useState(0); //dummy balance
  const [racebalance, setRaceBalance] = useState(0); //dummy balance
  const [raceAllowance, setRaceAllowance] = useState(0); //dummy balance
  const [liveprice, setLivePrice] = useState(0);
  const [allowance, setAllowance] = useState(0);
  const [RaceLivePrice, setRaceLivePrice] = useState(0);
  const [cointype, setCoinType] = useState("USDT");
  const [chainid, setChainId] = useState();
  const [formError, setFormError] = useState("");
  const [activeflag, setActiveFlag] = useState(0);
  const [activesellflag, setActiveSellFlag] = useState(0);
  const [transactionhash, setTransactionHash] = useState(0);
  const [walletaddress, setWalletAddress] = useState(
    WalletEVM?.selectedAccount
  );
  const [currency, setCurrency] = useState();
  const [approvedisable, setApproveDisable] = useState(false);
  const [depositeDisable, setDepositeDisable] = useState(false);
  const [withdrawDisable, setWithdrawDisable] = useState(false);
  const [inputValue, setInputValue] = useState({
    amount: "",
  });

  const [inputWithdraw, setInputWithdraw] = useState("");
  const [showAfterWithdraw, setShowAfterWithdraw] = useState(false);
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [assetInOnePoint, setAssetInOnePoint] = useState(0);
  const [raceTokenPrice, setRaceTokenPrice] = useState(0);

  const HandleComingSoon = () => {
    setShowComingSoon(false);
  };

  const HandleAfterWithdraw = () => {
    setShowAfterWithdraw(false);
  };
  //========================= end of code =========================//
  const totalpercentage = (inputValue?.amount / balance) * 100;

  const BasePoints = liveprice / RaceLivePrice;

  const HandleData = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };
  // console.log(user?.wallet_address, "user");
  // console.log(walletaddress, "walletaddress");
  const HandleCoinType = (e) => {
    setCoinType(e);
  };

  const handleShow = async (data) => {
    setShow(true);
    setFlag(true);
    setChainId(data?.chainId);
    setCurrency(data?.currency);
    setCoinType(cointype);
  };

  const handleClose = () => {
    setShow(false);
    setFlag(false);
    setInputValue({
      amount: "",
    });
  };
  //=========================fetching main balance=========================//

  useEffect(() => {
    const balancefuntion = async () => {
      try {
        const mainBalanceData = await getUsdtAndUsdcBalance(
          chainid,
          currency,
          walletaddress,
          cointype
        );
        const LivePrice = await getUsdtAndUsdcPrice(
          chainid,
          currency,
          cointype,
          inputValue?.amount
        );
        setLivePrice(LivePrice);
        setBalance(mainBalanceData?.balance);
        setAllowance(mainBalanceData?.allowance);
      } catch (error) {
        // console.error("Error fetching balance:", error);
      }
    };

    if (cointype) {
      balancefuntion();
    }
  }, [flag, cointype, WalletEVM, inputValue?.amount]);
  //========================= end of code =========================//

  //=========================fetching race tokan balance=========================//

  const racetokenbalance = async () => {
    try {
      const racebalance = await getRaceBalance(chainid, walletaddress);
      const raceliveprice = await getRaceTokenPrice(chainid);
      setRaceLivePrice(raceliveprice);
      setRaceBalance(racebalance?.balance);
      // setRaceBalance(60);
      setRaceAllowance(racebalance?.allowance);
    } catch (error) {
      // console.error("Error fetching balance:", error);
    }
  };
  useEffect(() => {
    if (cointype) {
      racetokenbalance();
    }
  }, [flag, cointype, WalletEVM]);
  //========================= end of code =========================//

  //=========================handle chain change=========================//
  const handleChain = async () => {
    try {
      const chain = await commonSwitch(chainid, WalletEVM?.type);
      // setRaceLivePrice(raceliveprice);
    } catch (error) {
      console.error("Error to change:", error);
    }
  };

  //========================= end of code =========================//

  //========================= reason withdraw popup code  =========================//
  const [selectedOption, setSelectedOption] = useState("");
  const [inputValuereason, setInputValueReason] = useState({
    reason: "",
  });

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleopenWithdraw = () => {
    setShowWithdraw(true);
  };

  const handleCloseWithdraw = () => {
    setShowWithdraw(false);
    setSelectedOption("");
    setInputValueReason({
      reason: "",
    });
  };
  const handleopentransaction = () => {
    setShowTransaction(true);
  };

  const handleClosetransaction = () => {
    setShowTransaction(false);
  };
  const HandleReasonData = (e) => {
    setInputValueReason({
      ...inputValuereason,
      [e.target.name]: e.target.value,
    });
  };

  //===============reason api integration====================//

  const HandleReason = async () => {
    if (!walletaddress) {
      setFormError("Walletaddress is not selected");
    } else if (!selectedOption && !inputValuereason?.reason) {
      setFormError("Please select feedback reason");
    } else {
      const wallet = await encryptData(walletaddress);
      const reason = await encryptData(
        inputValuereason?.reason ? inputValuereason?.reason : selectedOption
      );

      const payload = {
        walletAddress: wallet,
        reason: reason,
      };
      try {
        const getdata = await axiosMain.post(
          "/auth/add-withdraw-deatils",
          payload,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (getdata?.data?.status) {
          handleopenWithdrawMain();
          setShow(false);
          handleCloseWithdraw();
        }
      } catch (err) {}
    }
  };
  //========================= end of code =========================//

  //=============Function to handle deduction on percentage click buy=========================//
  const handlePercentageClick = (percentage) => {
    setActiveFlag(percentage);
    const amountToDeduct = balance * (percentage / 100);
    setInputValue({
      amount: amountToDeduct,
    });
  };
  //========================= end of code =========================//

  //========================= Sell popup code=========================//
  const [showwithdrawMain, setShowWithdrawMain] = useState(false);
  const [coinselltype, setCoinSellType] = useState("USDT");

  const [inputValuesell, setInputValueSell] = useState({
    sellamount: "",
  });

  const totalracepercentage = (inputValuesell?.sellamount / racebalance) * 100;

  const HandleSellData = (e) => {
    setInputValueSell({ ...inputValuesell, [e.target.name]: e.target.value });
  };

  const handleCloseWithdrawMain = () => {
    setShowWithdrawMain(false);
  };

  const handleopenWithdrawMain = async () => {
    setShowWithdrawMain(true);
    const racebalance = await getRaceBalance(chainid, walletaddress);
  };

  const handlePercentageClickSell = (percentage) => {
    setActiveSellFlag(percentage);
    const amountToDeduct = racebalance * (percentage / 100);
    setInputValueSell({
      sellamount: amountToDeduct,
    });
  };
  //========================= end of code =========================//

  useEffect(() => {
    getWithdrawPrice();
  }, [currency, chainid, coinselltype]);

  const getWithdrawPrice = async () => {
    try {
      const payload = {
        chainId: chainid,
        currency: currency,
        cointype: coinselltype,
      };
      const getPrice = await getWithdrawPricedetails(payload);
      if (getPrice) {
        setRaceTokenPrice(getPrice?.raceTokenPrice);
        setAssetInOnePoint(getPrice?.AssetInOnePoint);
      }
    } catch (err) {}
  };

  //===============deposite code====================//

  const HandleDeposit = async () => {
    if (!walletaddress) {
      setFormError("Walletaddress is not selected");
    } else if (walletaddress !== user?.wallet_address) {
      setFormError("Please select registered wallet address");
    } else if (!inputValue?.amount) {
      setFormError("Please enter amount");
    } else if (inputValue?.amount >= balance) {
      setFormError("Balance is insufficient");
    } else {
      setDepositeDisable(true);

      try {
        let data = {
          chainId: chainid,
          currency: currency,
          cointype: cointype,
          type: WalletEVM?.type,
          amount: inputValue?.amount,
          userAddress: walletaddress,
        };
        let deposite = await deposit(data);
        // console.log(deposite?.transactionHash);

        if (deposite) {
          setTransactionHash(deposite?.transactionHash);
          setDepositeDisable(false);
          toast.success("Deposited Successfully");
          handleopentransaction();
        } else {
          setDepositeDisable(false);
        }
      } catch (err) {
        setDepositeDisable(false);
      }
    }
  };
  //========================= end of code =========================//

  const approveToken = async () => {
    if (!walletaddress) {
      setFormError("Walletaddress is not selected");
    } else if (walletaddress !== user?.wallet_address) {
      setFormError("Please select registered wallet address");
    } else if (!inputValue?.amount) {
      setFormError("Please enter amount");
    } else if (inputValue?.amount >= balance) {
      setFormError("Balance is insufficient");
    } else {
      setApproveDisable(true);
      let data = {
        chainId: chainid,
        currency: currency,
        cointype: cointype,
        type: WalletEVM?.type,
        amount: inputValue?.amount,
      };
      let approve = await approveERC20(data);
      if (approve) {
        setApproveDisable(false);
        const mainBalanceData = await getUsdtAndUsdcBalance(
          chainid,
          currency,
          walletaddress,
          cointype
        );
        setAllowance(mainBalanceData?.allowance);
      } else {
        setApproveDisable(false);
      }
    }
  };

  const approveTokenWithdraw = async () => {
    if (!walletaddress) {
      setFormError("Walletaddress is not selected");
    } else if (
      walletaddress?.toLowerCase() !== user?.wallet_address?.toLowerCase()
    ) {
      setFormError("Please select registered wallet address");
    } else if (!inputValuesell?.sellamount) {
      setFormError("Please enter amount");
    } else if (inputValuesell?.sellamount >= racebalance) {
      setFormError("Balance is insufficient");
    } else {
      setApproveDisable(true);
      let data = {
        chainId: chainid,
        type: WalletEVM?.type,
        amount: inputValuesell?.sellamount,
      };
      let approve = await approveRace(data);
      if (approve) {
        setApproveDisable(false);
        racetokenbalance();
      } else {
        setApproveDisable(false);
      }
    }
  };

  const HandleWithdraw = async () => {
    if (!walletaddress) {
      setFormError("Walletaddress is not selected");
    } else if (
      walletaddress?.toLowerCase() !== user?.wallet_address?.toLowerCase()
    ) {
      setFormError("Please select registered wallet address");
    } else if (!inputValuesell?.sellamount) {
      setFormError("Please enter amount");
    } else if (inputValuesell?.sellamount >= racebalance) {
      setFormError("Balance is insufficient");
    } else {
      setDepositeDisable(true);

      try {
        let data = {
          chainId: chainid,
          currency: currency,
          cointype: coinselltype,
          type: WalletEVM?.type,
          amount: inputValuesell?.sellamount,
          userAddress: walletaddress,
        };
        let withdrawAmt = await withdrawVault(data);
        // console.log(deposite?.transactionHash);

        if (withdrawAmt) {
          setTransactionHash(withdrawAmt?.transactionHash);
          setDepositeDisable(false);
          toast.success("Withdraw Successfully");
          setShowAfterWithdraw(true);
        } else {
          setDepositeDisable(false);
        }
      } catch (err) {
        setDepositeDisable(false);
      }
    }
  };

  return (
    <>
      <Header />
      <section className="deposit-step-sec">
        <Container>
          <ToastContainer />

          <Row>
            <Col>
              <h2 className="common-heading">Start Your Points Journey</h2>
            </Col>
          </Row>
          <Row>
            <Col lg={3} md={6} sm={6} xs={6}>
              <div
                className="coin-box"
                onClick={(data) =>
                  handleShow({
                    chainId: 10,
                    currency: "optimism",
                  })
                }
              >
                <img src="assets/img/coin1.png" alt="" />
                <h3>Optimism</h3>
                <h5>Deposit in</h5>
                <div className="btn-row">
                  <button className="coin-btn">USDC</button>
                  <button className="coin-btn">USDT</button>
                </div>
              </div>
            </Col>
            <Col lg={3} md={6} sm={6} xs={6}>
              <div
                className="coin-box"
                onClick={
                  (data) => setShowComingSoon(true)

                  // handleShow({
                  //   chainId: 137,
                  //   currency: "Matic",
                  // })
                }
              >
                <img src="assets/img/coin2.png" alt="" />
                <h3>Polygon</h3>
                <h5>Deposit in</h5>
                <div className="btn-row">
                  <button className="coin-btn">USDC</button>
                  <button className="coin-btn">USDT</button>
                </div>
              </div>
            </Col>
            <Col lg={3} md={6} sm={6} xs={6}>
              <div
                className="coin-box"
                onClick={
                  (data) => setShowComingSoon(true)

                  // handleShow({
                  //   chainId: 42161,
                  //   currency: "Arbitrum",
                  // })
                }
              >
                <img src="assets/img/coin3.png" alt="" />
                <h3>Arbitrium</h3>
                <h5>Deposit in</h5>
                <div className="btn-row">
                  <button className="coin-btn">USDC</button>
                  <button className="coin-btn">USDT</button>
                </div>
              </div>
            </Col>
            <Col lg={3} md={6} sm={6} xs={6}>
              <div
                className="coin-box"
                onClick={
                  (data) => setShowComingSoon(true)

                  // handleShow({
                  //   chainId: 8453,
                  //   currency: "Base",
                  // })
                }
              >
                <img src="assets/img/coin4.png" alt="" />
                <h3>Base</h3>
                <h5>Deposit in</h5>
                <div className="btn-row">
                  <button className="coin-btn">USDC</button>
                  <button className="coin-btn">USDT</button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* deposite popup 1 */}
      <Modal
        className="network-popup deposit-input-popup"
        size="md"
        centered
        show={show}
        onHide={handleClose}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div>
            <h4 className="sub-heading">Deposit</h4>

            {/* <div className="error-note">
              <img src="assets/img/warning.png" alt="" />
              Trading is not available for people or entities in US and other
              restricted jurisdictions
            </div> */}

            <Form.Group className="mb-3 form-row">
              <Form.Label>Buy with</Form.Label>
              <div className="input-flex-row">
                <InputGroup className="">
                  <Form.Control
                    type="number"
                    placeholder="0.00"
                    name="amount"
                    onChange={HandleData}
                    value={inputValue?.amount}
                    // max={ balance }
                  />
                  <InputGroup.Text
                    onClick={() =>
                      setInputValue({
                        amount: balance,
                      })
                    }
                  >
                    max
                  </InputGroup.Text>
                </InputGroup>
                <Dropdown onSelect={(e) => HandleCoinType(e)}>
                  <Dropdown.Toggle>
                    {cointype === "USDT" ? (
                      <img src="assets/img/Tokens.png" alt="" />
                    ) : (
                      <img src="assets/img/daller.png" alt="" />
                    )}{" "}
                    {cointype}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item eventKey="USDT">USDT</Dropdown.Item>
                    <Dropdown.Item eventKey="USDC">USDC</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              <p>Balance: {balance}</p>
            </Form.Group>

            <div>
              <ProgressBar
                className="progress-main-line"
                variant="success"
                now={totalpercentage}
                // label={`${totalpercentage?.toFixed(2)}%`}
              />
            </div>
            <div className="date-rang-percentage ">
              <span
                className={activeflag == 0 ? "active" : ""}
                onClick={() => handlePercentageClick(0)}
              >
                0%
              </span>
              <span
                className={activeflag == 25 ? "active" : ""}
                onClick={() => handlePercentageClick(25)}
              >
                25%
              </span>
              <span
                className={activeflag == 50 ? "active" : ""}
                onClick={() => handlePercentageClick(50)}
              >
                50%
              </span>
              <span
                className={activeflag == 75 ? "active" : ""}
                onClick={() => handlePercentageClick(75)}
              >
                75%
              </span>
              <span
                className={activeflag == 100 ? "active" : ""}
                onClick={() => handlePercentageClick(100)}
              >
                100%
              </span>
            </div>

            <Form.Group className="mb-3 form-row">
              <Form.Label>Base Points</Form.Label>
              <div className="input-flex-row">
                <InputGroup className="">
                  <Form.Control
                    placeholder="0.00"
                    value={BasePoints ? BasePoints : 0.0}
                    readOnly
                  />
                  {/* <InputGroup.Text>max</InputGroup.Text> */}
                </InputGroup>
                <Dropdown>
                  <Dropdown.Toggle className="content-none">
                    <img src="assets/img/Logo.png" alt="" />
                    RACE
                  </Dropdown.Toggle>
                </Dropdown>
              </div>
              <p>Balance: {racebalance}</p>
            </Form.Group>

            <div className="by-with-test mt-4">
              Buy with:
              <span>{liveprice} $</span>
            </div>

            <div className="by-with-test">
              Received:
              <span>{liveprice} $</span>
            </div>
            <p>{formError}</p>

            {walletaddress !== user?.wallet_address ? (
              <button className="common-btn bg-left disable-btn" disabled>
                Please select registered wallet address{" "}
              </button>
            ) : chainid != WalletEVM?.chainId ? (
              <button
                className="common-btn bg-left"
                onClick={() => handleChain()}
              >
                Switch Network
              </button>
            ) : inputValue?.amount >= balance ? (
              <button className="common-btn bg-left disable-btn" disabled>
                Insufficient balance
              </button>
            ) : inputValue?.amount > allowance ? (
              <button
                className="common-btn bg-left"
                disabled={approvedisable}
                onClick={() => approveToken()}
              >
                {" "}
                {approvedisable ? "Processing" : "Approve"}
              </button>
            ) : (
              <button
                className="common-btn bg-left"
                disabled={depositeDisable}
                onClick={() => HandleDeposit()}
              >
                {depositeDisable ? "Processing" : "Deposit"}
              </button>
            )}
            {/* <button className="common-btn bg-left ">
              Enter {cointype} Amount
            </button> */}
            {/* <button className="common-btn bg-left disable-btn">
              Not available for US
            </button> */}

            <button
              className="withdraw-btn"
              onClick={() => {
                if (balance <= 0) {
                  toast.warn("You don't have sufficient amount to withdraw")
                } else {
                  handleopenWithdraw();
                }
              }}
            >
              Withdraw <img src="assets/img/withdraw.png" alt="" />
            </button>
          </div>
        </Modal.Body>
      </Modal>

      {/* Withdraw popup 1 */}
      <Modal
        className="new-user-modal network-popup deposit-input-popup"
        size="md"
        centered
        show={showwithdraw}
        onHide={handleCloseWithdraw}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div>
            <h4 className="sub-heading">Withdraw</h4>
            <Form.Group className="mb-3 form-row feedback-check">
              <Form.Label> We’d love to hear your feedback</Form.Label>
              <Form.Check
                type="radio"
                label="The points system is too complex for me."
                value="The points system is too complex for me."
                checked={
                  selectedOption === "The points system is too complex for me."
                }
                onChange={handleOptionChange}
              />
              <Form.Check
                type="radio"
                label="I don't see enough value in the points I accumulate."
                value="I don't see enough value in the points I accumulate."
                checked={
                  selectedOption ===
                  "I don't see enough value in the points I accumulate."
                }
                onChange={handleOptionChange}
              />
              <Form.Check
                type="radio"
                label="I find it difficult to use or track my point"
                value="I find it difficult to use or track my point"
                checked={
                  selectedOption ===
                  "I find it difficult to use or track my point"
                }
                onChange={handleOptionChange}
              />
              <Form.Check
                type="radio"
                label="I have found better incentives with other platforms."
                value="I have found better incentives with other platforms."
                checked={
                  selectedOption ===
                  "I have found better incentives with other platforms."
                }
                onChange={handleOptionChange}
              />
              <Form.Check
                type="radio"
                label="I'm not engaged enough with the platform to benefit from points."
                value="I'm not engaged enough with the platform to benefit from points."
                checked={
                  selectedOption ===
                  "I'm not engaged enough with the platform to benefit from points."
                }
                onChange={handleOptionChange}
              />
              <Form.Check
                type="radio"
                label="There aren't enough options or desirable rewards available."
                value="There aren't enough options or desirable rewards available."
                checked={
                  selectedOption ===
                  "There aren't enough options or desirable rewards available."
                }
                onChange={handleOptionChange}
              />
              <Form.Check
                type="radio"
                label="Earning points takes too long for any tangible benefit."
                value="Earning points takes too long for any tangible benefit."
                checked={
                  selectedOption ===
                  "Earning points takes too long for any tangible benefit."
                }
                onChange={handleOptionChange}
              />
              <Form.Check
                type="radio"
                label="Other reasons not listed (please specify in a few words)."
                value="Other reasons not listed (please specify in a few words)."
                checked={
                  selectedOption ===
                  "Other reasons not listed (please specify in a few words)."
                }
                onChange={handleOptionChange}
              />
            </Form.Group>

            <Form.Group className="mb-3 outer-input other-reason-box">
              <Form.Label>Other Reason</Form.Label>
              <Form.Control
                type="text"
                name="reason"
                onChange={HandleReasonData}
                placeholder="What other feedback do you have?"
                value={inputValuereason.reason}
              />
            </Form.Group>
            <p>{formError}</p>

            <button
              className="common-btn bg-left "
              onClick={() => HandleReason()}
            >
              Continue to withdraw
            </button>
          </div>
        </Modal.Body>
      </Modal>

      {/* Withdraw popup 2  */}
      <Modal
        className="network-popup deposit-input-popup"
        size="md"
        centered
        show={showwithdrawMain}
        onHide={handleCloseWithdrawMain}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div>
            <h4 className="sub-heading">Withdraw</h4>

            <Form.Group className="mb-3 form-row">
              <Form.Label>Sell</Form.Label>
              <div className="input-flex-row">
                <InputGroup className="">
                  <Form.Control
                    type="number"
                    placeholder="0.00"
                    name="sellamount"
                    onChange={HandleSellData}
                    value={inputValuesell?.sellamount}
                  />
                  <InputGroup.Text
                    onClick={() =>
                      setInputValueSell({
                        sellamount: racebalance,
                      })
                    }
                  >
                    max
                  </InputGroup.Text>
                </InputGroup>
                <Dropdown>
                  <Dropdown.Toggle className="content-none">
                    <img src="assets/img/Logo.png" alt="" />
                    RACE
                  </Dropdown.Toggle>
                </Dropdown>
              </div>
              <p>
                Balance: <span>{racebalance}</span>
              </p>
            </Form.Group>

            <div>
              <ProgressBar
                className="progress-main-line"
                variant="success"
                now={totalracepercentage}
              />
            </div>
            <div className="date-rang-percentage ">
              <span
                className={activesellflag == 0 ? "active" : ""}
                onClick={() => handlePercentageClickSell(0)}
              >
                0%
              </span>
              <span
                className={activesellflag == 25 ? "active" : ""}
                onClick={() => handlePercentageClickSell(25)}
              >
                25%
              </span>
              <span
                className={activesellflag == 50 ? "active" : ""}
                onClick={() => handlePercentageClickSell(50)}
              >
                50%
              </span>
              <span
                className={activesellflag == 75 ? "active" : ""}
                onClick={() => handlePercentageClickSell(75)}
              >
                75%
              </span>
              <span
                className={activesellflag == 100 ? "active" : ""}
                onClick={() => handlePercentageClickSell(100)}
              >
                100%
              </span>
            </div>

            <Form.Group className="mb-3 form-row">
              <Form.Label>Receive</Form.Label>
              <Dropdown
                className="recieve-dropdown-new"
                onSelect={(e) => setCoinSellType(e)}
              >
                <Dropdown.Toggle>
                  {coinselltype == "USDT" ? (
                    <img src="assets/img/Tokens.png" alt="" />
                  ) : coinselltype == "USDC" ? (
                    <img src="assets/img/daller.png" alt="" />
                  ) : (
                    <img src="assets/img/coin5.png" alt="" />
                  )}
                  {coinselltype}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item eventKey="USDT">
                    <img src="assets/img/Tokens.png" alt="" /> USDT
                  </Dropdown.Item>
                  <Dropdown.Item eventKey="USDC">
                    <img src="assets/img/daller.png" alt="" /> USDC
                  </Dropdown.Item>
                  <Dropdown.Item eventKey="WETH">
                    <img src="assets/img/coin5.png" alt="" /> WETH
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>

            <div className="by-with-test with-img mt-4">
              <div>
                {" "}
                <span className="text-white">
                  {(assetInOnePoint * inputValuesell?.sellamount).toFixed(6)}
                </span>
                {coinselltype == "USDC" ? (
                  <img src="assets/img/daller.png" alt="" />
                ) : coinselltype == "USDT" ? (
                  <img src="assets/img/Tokens.png" alt="" />
                ) : (
                  <img src="assets/img/coin5.png" alt="" />
                )}
                {coinselltype}
              </div>
              <span>
                ~ ${(raceTokenPrice * inputValuesell?.sellamount).toFixed(4)}
              </span>
            </div>
            <div className="by-with-test race-value-box mt-3">
              <span>
                <img src="assets/img/info.png" alt="" /> 1 RACE ={" "}
                {assetInOnePoint?.toFixed(6)} {coinselltype} ($
                {raceTokenPrice?.toFixed(4)})
              </span>
            </div>

            {/* <button className="common-btn bg-left ">
              Enter {coinselltype} Amount
            </button> */}
            {walletaddress?.toLowerCase() !==
            user?.wallet_address?.toLowerCase() ? (
              <button className="common-btn bg-left disable-btn" disabled>
                Please select registered wallet address{" "}
              </button>
            ) : chainid != WalletEVM?.chainId ? (
              <button
                className="common-btn bg-left"
                onClick={() => handleChain()}
              >
                Switch Network
              </button>
            ) : inputValuesell?.sellamount >= racebalance ? (
              <button className="common-btn bg-left disable-btn" disabled>
                Insufficient balance
              </button>
            ) : inputValuesell?.sellamount > raceAllowance ? (
              <button
                className="common-btn bg-left"
                disabled={approvedisable}
                onClick={() => approveTokenWithdraw()}
              >
                {" "}
                {approvedisable ? "Processing" : "Approve"}
              </button>
            ) : (
              <button
                className="common-btn bg-left"
                disabled={withdrawDisable}
                onClick={() => HandleWithdraw()}
              >
                {withdrawDisable ? "Processing" : "Withdraw"}
              </button>
            )}
          </div>
        </Modal.Body>
      </Modal>

      {/* transaction popup  */}

      <Modal
        className="network-popup deposit-input-popup"
        size="md"
        centered
        show={showtransaction}
        onHide={handleClosetransaction}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div>
            <h4 className="sub-heading">Deposited Successfully </h4>

            <div>
              {/* //https://optimistic.etherscan.io/tx/{deposite?.transactionHash};
              10 //https://polygonscan.com/tx/{deposite?.transactionHash};137 //
              https://basescan.org/tx/{deposite?.transactionHash}; 8453 //
              https://arbiscan.io/tx/{deposite?.transactionHash}; 42161 */}
              {chainid == 10 ? (
                <a
                  href={`https://optimistic.etherscan.io/tx/${transactionhash}`}
                  style={{ color: "#FFF" }}
                  target="_blank"
                >
                  {" "}
                  View on Explorer
                </a>
              ) : chainid == 137 ? (
                <a
                  href={`https://polygonscan.com/tx/${transactionhash}`}
                  style={{ color: "#FFF" }}
                  target="_blank"
                >
                  {" "}
                  View on Explorer
                </a>
              ) : chainid == 8453 ? (
                <a
                  href={`https://basescan.org/tx/${transactionhash}`}
                  style={{ color: "#FFF" }}
                  target="_blank"
                >
                  {" "}
                  View on Explorer
                </a>
              ) : chainid == 42161 ? (
                <a
                  href={`https://arbiscan.io/tx/${transactionhash}`}
                  style={{ color: "#FFF" }}
                  target="_blank"
                >
                  {" "}
                  View on Explorer
                </a>
              ) : (
                ""
              )}
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        className="network-popup deposit-input-popup"
        size="md"
        centered
        show={showAfterWithdraw}
        onHide={HandleAfterWithdraw}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div>
            <h4 className="sub-heading">Withdraw Successfully </h4>

            <div>
              {/* //https://optimistic.etherscan.io/tx/{deposite?.transactionHash};
              10 //https://polygonscan.com/tx/{deposite?.transactionHash};137 //
              https://basescan.org/tx/{deposite?.transactionHash}; 8453 //
              https://arbiscan.io/tx/{deposite?.transactionHash}; 42161 */}
              {chainid == 10 ? (
                <a
                  href={`https://optimistic.etherscan.io/tx/${transactionhash}`}
                  style={{ color: "#FFF" }}
                  target="_blank"
                >
                  {" "}
                  View on Explorer
                </a>
              ) : chainid == 137 ? (
                <a
                  href={`https://polygonscan.com/tx/${transactionhash}`}
                  style={{ color: "#FFF" }}
                  target="_blank"
                >
                  {" "}
                  View on Explorer
                </a>
              ) : chainid == 8453 ? (
                <a
                  href={`https://basescan.org/tx/${transactionhash}`}
                  style={{ color: "#FFF" }}
                  target="_blank"
                >
                  {" "}
                  View on Explorer
                </a>
              ) : chainid == 42161 ? (
                <a
                  href={`https://arbiscan.io/tx/${transactionhash}`}
                  style={{ color: "#FFF" }}
                  target="_blank"
                >
                  {" "}
                  View on Explorer
                </a>
              ) : (
                ""
              )}
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        className="network-popup deposit-input-popup"
        size="md"
        centered
        show={showComingSoon}
        onHide={HandleComingSoon}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div>
            <img src="assets/img/Logo.png" alt="" />
            <h4 className="text-white">Coming Soon...!</h4>
          </div>
        </Modal.Body>
      </Modal>

      {/* deposite 1 popup  */}
      {/* <Modal
        className="network-popup"
        size="lg"
        centered
        show={show}
        onHide={handleClose}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div>
            <h4 className="sub-heading">Choose Network</h4>
            <div className="radio-check-row">
              <div className="radio-check-box active">
                <Form.Check checked type="radio" />
                <div className="inner-img">
                  <img src="assets/img/coin5.png" alt="" />
                  <h5>Ethereum</h5>
                </div>
              </div>
              <div className="radio-check-box">
                <Form.Check type="radio" />
                <div className="inner-img">
                  <img src="assets/img/coin2.png" alt="" />
                  <h5>Polygon</h5>
                </div>
              </div>
              <div className="radio-check-box">
                <Form.Check type="radio" />
                <div className="inner-img">
                  <img src="assets/img/coin1.png" alt="" />
                  <h5>Optimism</h5>
                </div>
              </div>
              <div className="radio-check-box">
                <Form.Check type="radio" />
                <div className="inner-img">
                  <img src="assets/img/coin3.png" alt="" />
                  <h5>Arbitrium</h5>
                </div>
              </div>
              <div className="radio-check-box">
                <Form.Check type="radio" />
                <div className="inner-img">
                  <img src="assets/img/coin4.png" alt="" />
                  <h5>Base</h5>
                </div>
              </div>
            </div>

            <h4 className="sub-heading mt-1">Choose Wallet</h4>
            <div className="radio-check-row">
              <div className="radio-check-box active">
                <Form.Check checked type="radio" />
                <div className="inner-img">
                  <img src="assets/img/coin6.png" alt="" />
                  <h5>Metamask</h5>
                </div>
              </div>
              <div className="radio-check-box">
                <Form.Check type="radio" />
                <div className="inner-img">
                  <img src="assets/img/coin7.png" alt="" />
                  <h5>Coinbase Wallet</h5>
                </div>
              </div>
              <div className="radio-check-box">
                <Form.Check type="radio" />
                <div className="inner-img">
                  <img src="assets/img/coin8.png" alt="" />
                  <h5>WalletConnect</h5>
                </div>
              </div>
            </div>

            <div className="connect-wallet-text">
              <p>By connecting a wallet, you agree to RACE’s Terms of Use.</p>
              <h6>What is a Wallet?</h6>
              <p>
                A wallet stores and sends digital assets. It allows one-click
                logins, no password required.
              </p>

              <div className="more-link">
                <a href="">Install a Wallet</a>
                <a href="">Learn more</a>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal> */}
    </>
  );
};
