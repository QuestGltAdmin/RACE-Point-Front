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

export const Depositstepfirst = () => {
  //========================= Global variable =========================//
  const { WalletEVM, walletbalance } = useAuth();
  //========================= end of code =========================//

  //========================= local variable =========================//
  const [show, setShow] = useState(false);
  const [showwithdraw, setShowWithdraw] = useState(false);
  const [flag, setFlag] = useState(false);
  const [balance, setBalance] = useState(0); //dummy balance
  const [racebalance, setRaceBalance] = useState(0); //dummy balance
  const [liveprice, setLivePrice] = useState(0); 
  const [RaceLivePrice, setRaceLivePrice] = useState(0); 
  const [cointype, setCoinType] = useState("USDT");
  const [chainid, setChainId] = useState();
  const [formError, setFormError] = useState("");
  const [activeflag, setActiveFlag] = useState(0);
  const [walletaddress, setWalletAddress] = useState(
    WalletEVM?.selectedAccount
  );
  const [currency, setCurrency] = useState();
  const [inputValue, setInputValue] = useState({
    amount: "",
  });
  //========================= end of code =========================//
  const totalpercentage = (inputValue?.amount / balance) * 100;

  const HandleData = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

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
        setBalance(mainBalanceData);
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    };

    if (cointype) {
      balancefuntion();
    }
  }, [flag, cointype, WalletEVM,inputValue?.amount]);
  //========================= end of code =========================//

  //=========================fetching race tokan balance=========================//

  useEffect(() => {
    const racetokenbalance = async () => {
      try {
        const racebalance = await getRaceBalance(chainid, walletaddress);
        const raceliveprice = await getRaceTokenPrice(chainid);
        setRaceLivePrice(raceliveprice);
        setRaceBalance(racebalance);
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    };
    if (cointype) {
      racetokenbalance();
    }
  }, [flag, cointype, WalletEVM]);
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
    setActiveFlag(percentage);
    const amountToDeduct = racebalance * (percentage / 100);
    setInputValueSell({
      sellamount: amountToDeduct,
    });
  };
  //========================= end of code =========================//
  console.log(liveprice,"liveprice")
  console.log(RaceLivePrice,"RaceLivePrice")
console.log(liveprice/ RaceLivePrice,"mainvalue")
  return (
    <>
      <Header />
      <section className="deposit-step-sec">
        <Container>
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
                    chainId: "10",
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
                onClick={(data) =>
                  handleShow({
                    chainId: "137",
                    currency: "Matic",
                  })
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
                onClick={(data) =>
                  handleShow({
                    chainId: "42161",
                    currency: "Arbitrum",
                  })
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
                onClick={(data) =>
                  handleShow({
                    chainId: "8453",
                    currency: "Base",
                  })
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
                    <img src="assets/img/coin5.png" alt="" /> {cointype}
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
                    value={liveprice/ RaceLivePrice }
                    readOnly
                  />
                  {/* <InputGroup.Text>max</InputGroup.Text> */}
                </InputGroup>
                <Dropdown>
                  <Dropdown.Toggle className="content-none">
                    {/* <img src="assets/img/coin5.png" alt="" />  */}
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

            <button className="common-btn bg-left ">
              Enter {cointype} Amount
            </button>
            {/* <button className="common-btn bg-left disable-btn">
              Not available for US
            </button> */}

            <button
              className="withdraw-btn"
              onClick={() => handleopenWithdraw()}
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
                    {/* <img src="assets/img/coin5.png" alt="" />  */}
                    RACE
                  </Dropdown.Toggle>
                  {/* <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">
                      Another action
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-3">
                      Something else
                    </Dropdown.Item>
                  </Dropdown.Menu> */}
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
                // label={`${totalracepercentage.toFixed(2)}%`}
              />
            </div>
            <div className="date-rang-percentage ">
              <span
                className={activeflag == 0 ? "active" : ""}
                onClick={() => handlePercentageClickSell(0)}
              >
                0%
              </span>
              <span
                className={activeflag == 25 ? "active" : ""}
                onClick={() => handlePercentageClickSell(25)}
              >
                25%
              </span>
              <span
                className={activeflag == 50 ? "active" : ""}
                onClick={() => handlePercentageClickSell(50)}
              >
                50%
              </span>
              <span
                className={activeflag == 75 ? "active" : ""}
                onClick={() => handlePercentageClickSell(75)}
              >
                75%
              </span>
              <span
                className={activeflag == 100 ? "active" : ""}
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
                  {coinselltype == "USDC" ? (
                    <img src="assets/img/daller.png" alt="" />
                  ) : (
                    <img src="assets/img/coin5.png" alt="" />
                  )}
                  {coinselltype}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item eventKey="USDC">
                    <img src="assets/img/daller.png" alt="" /> USDC
                  </Dropdown.Item>
                  <Dropdown.Item eventKey="USDT">
                    <img src="assets/img/coin5.png" alt="" /> USDT
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>

            <div className="by-with-test with-img mt-4">
              <div>
                {coinselltype == "USDC" ? (
                  <img src="assets/img/daller.png" alt="" />
                ) : (
                  <img src="assets/img/coin5.png" alt="" />
                )}
                {coinselltype}
              </div>
              <span>~ $0</span>
            </div>
            <div className="by-with-test race-value-box mt-3">
              <span>
                <img src="assets/img/info.png" alt="" /> RACE = 200 USDC ($2.03)
              </span>
            </div>

            <button className="common-btn bg-left ">
              Enter {coinselltype} Amount
            </button>
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
