import React, { useEffect, useState } from "react";
import {
  Col,
  Container,
  Dropdown,
  Form,
  InputGroup,
  Row,
  Tab,
  Tabs,
} from "react-bootstrap";
import { Header } from "../Components/Header";
import Tokens from "../JSON/TokenListDeposit.json";
import useAuth from "../hooks/useAuth";
import { getERC20Balance, getEthBalance } from "../HelperBridge/Balance";
import { commonSwitch } from "../helpers/ChainSwitch";
import { setEVMWallet } from "../store/reducers/authReducer";
import { useDispatch } from "react-redux";
import { approveERC20 } from "../HelperBridge/helperApprove";
import { toast } from "react-toastify";
import { depositEth } from "../HelperBridge/Deposit";
import { depositErc20 } from "../HelperBridge/DepositERC20";
import { withdraw } from "../HelperBridge/withdrawEth";

export const DepositNew = () => {
  const { WalletEVM } = useAuth();
  const dispatch = useDispatch();
  const [amountInDeposit, setAmountInDeposit] = useState(0);
  const [amountInWithdraw, setAmountInWithdraw] = useState(0);
  const [disable, setDisable] = useState(false);
  const [disableWithdraw, setDisableWithdraw] = useState(false);
  const [formError, setFormError] = useState("");
  const [balanceDeposit, setBalanceDeposit] = useState({
    balance: 0,
    allowance: 0,
  });
  const [balanceWithdraw, setBalanceWithdraw] = useState({
    balance: 0,
    allowance: 0,
  });
  const [tokenInDeposit, setTokenInDeposit] = useState({
    name: "ETH",
    address: "0x0000000000000000000000000000000000000000",
    symbol: "ETH",
    chainId: 11155111,
    logos: "assets/DepositImg/eth.png",
    decimals: 18,
  });

  const [tokenInWithdraw, setTokenInWithdraw] = useState({
    name: "ETH",
    address: "0x0000000000000000000000000000000000000000",
    symbol: "ETH",
    chainId: 6806,
    logos: "assets/DepositImg/eth.png",
    decimals: 18,
  });

  const HandelTokenListDeposit = (e) => {
    let eventData = JSON.parse(e);
    setTokenInDeposit({
      ...tokenInDeposit,
      name: eventData.name,
      address: eventData.address,
      symbol: eventData.symbol,
      chainId: eventData.chainId,
      logos: eventData.logos,
      decimals: eventData.decimals,
    });
  };

  const HandelTokenListWithdraw = (e) => {
    let eventData = JSON.parse(e);
    setTokenInWithdraw({
      ...tokenInWithdraw,
      name: eventData.name,
      address: eventData.address,
      symbol: eventData.symbol,
      chainId: eventData.chainId,
      logos: eventData.logos,
      decimals: eventData.decimals,
    });
  };

  useEffect(() => {
    if (WalletEVM?.chainId == 11155111) {
      if (tokenInDeposit?.name == "ETH") {
        console.log("yha");

        getBalanceDepositETH();
      } else {
        getBalanceDepositOther();
      }
    } else {
      setBalanceDeposit({
        ...balanceDeposit,
        balance: 0,
        allowance: 0,
      });
    }
  }, [tokenInDeposit, WalletEVM]);

  const getBalanceDepositETH = async () => {
    try {
      const payload = {
        userAddress: WalletEVM?.selectedAccount,
        chainId: WalletEVM?.chainId,
      };
      const getData = await getEthBalance(payload);
      if (getData) {
        setBalanceDeposit({
          ...balanceDeposit,
          balance: getData,
          allowance: 0,
        });
      }
      console.log(getData, "getData");
    } catch (err) {}
  };

  const getBalanceDepositOther = async () => {
    try {
      const payload = {
        userAddress: WalletEVM?.selectedAccount,
        chainId: WalletEVM?.chainId,
        address: tokenInDeposit?.address,
        TrxType: "Deposit",
        decimals: tokenInDeposit?.decimals,
      };
      const getData = await getERC20Balance(payload);
      if (getData) {
        setBalanceDeposit({
          ...balanceDeposit,
          balance: getData.balance,
          allowance: getData.allowance,
        });
      }
      console.log(getData, "getData");
    } catch (err) {}
  };

  useEffect(() => {
    if (WalletEVM?.chainId == 6806) {
      if (tokenInWithdraw?.name == "ETH") {
        getBalanceWithdrawETH();
      } else {
        getBalanceWithdrawOther();
      }
    } else {
      setBalanceWithdraw({
        ...balanceWithdraw,
        balance: 0,
        allowance: 0,
      });
    }
  }, [tokenInWithdraw, WalletEVM]);

  const getBalanceWithdrawETH = async () => {
    try {
      const payload = {
        userAddress: WalletEVM?.selectedAccount,
        chainId: WalletEVM?.chainId,
      };
      const getData = await getEthBalance(payload);
      if (getData) {
        setBalanceWithdraw({
          ...balanceWithdraw,
          balance: getData,
          allowance: 0,
        });
      }
    } catch (err) {}
  };

  const getBalanceWithdrawOther = async () => {
    try {
      const payload = {
        userAddress: WalletEVM?.selectedAccount,
        chainId: WalletEVM?.chainId,
        address: tokenInWithdraw?.address,
        TrxType: "Withdraw",
        decimals: tokenInWithdraw?.decimals,
      };
      const getData = await getERC20Balance(payload);
      if (getData) {
        setBalanceWithdraw({
          ...balanceWithdraw,
          balance: getData.balance,
          allowance: getData.allowance,
        });
      }
      console.log(getData, "getData");
    } catch (err) {}
  };

  const switchNetwork = async (data) => {
    try {
      let newChain = parseInt(data);
      const getData = await commonSwitch(newChain, WalletEVM?.type);
      if (getData) {
        const payload = {
          selectedAccount: WalletEVM?.selectedAccount,
          chainId: newChain,
          type: WalletEVM?.type,
        };
        dispatch(setEVMWallet(payload));
      }
    } catch (err) {}
  };

  const approveBalance = async () => {
    if (parseFloat(amountInDeposit) <= 0) {
      setFormError("Please enter valid amount");
    } else if (!WalletEVM?.selectedAccount) {
      setFormError("Please connect your wallet");
    } else {
      setFormError("");
      setDisable(true);
      try {
        const payload = {
          chainId: WalletEVM?.chainId,
          TrxType: "Deposit",
          type: WalletEVM?.type,
          amount: amountInDeposit,
          decimals: tokenInDeposit?.decimals,
          userAddress: WalletEVM?.selectedAccount,
          address: tokenInDeposit?.address,
        };

        const approveData = await approveERC20(payload);
        if (approveData) {
          setDisable(false);
          toast.success("Balance approved successfully");
          getBalanceDepositOther();
        } else {
          toast.error("Transaction reverted");
          setDisable(false);
        }
      } catch (err) {
        toast.error("Transaction reverted");
        setDisable(false);
      }
    }
  };

  const approveBalanceWithdraw = async () => {
    if (parseFloat(amountInWithdraw) <= 0) {
      setFormError("Please enter valid amount");
    } else if (!WalletEVM?.selectedAccount) {
      setFormError("Please connect your wallet");
    } else {
      setFormError("");
      setDisableWithdraw(true);
      try {
        const payload = {
          chainId: WalletEVM?.chainId,
          TrxType: "Withdraw",
          type: WalletEVM?.type,
          amount: amountInWithdraw,
          decimals: tokenInWithdraw?.decimals,
          userAddress: WalletEVM?.selectedAccount,
          address: tokenInWithdraw?.address,
        };

        const approveData = await approveERC20(payload);
        if (approveData) {
          setDisableWithdraw(false);
          toast.success("Balance approved successfully");
          getBalanceWithdrawOther();
        } else {
          toast.error("Transaction reverted");
          setDisableWithdraw(false);
        }
      } catch (err) {
        toast.error("Transaction reverted");
        setDisableWithdraw(false);
      }
    }
  };

  const depositBalanceEth = async () => {
    setDisable(true);
    try {
      const payload = {
        chainId: WalletEVM?.chainId,
        TrxType: "Deposit",
        type: WalletEVM?.type,
        amount: amountInDeposit,
        userAddress: WalletEVM?.selectedAccount,
      };

      const approveData = await depositEth(payload);
      if (approveData) {
        setDisable(false);
        toast.success("Balance deposit successfully");
        getBalanceDepositETH();
      } else {
        toast.error("Transaction reverted");
        setDisable(false);
      }
    } catch (err) {
      toast.error("Transaction reverted");
      setDisable(false);
    }
  };
  const depositBalanceOther = async () => {
    setDisable(true);
    try {
      const payload = {
        chainId: WalletEVM?.chainId,
        TrxType: "Deposit",
        type: WalletEVM?.type,
        amount: amountInDeposit,
        userAddress: WalletEVM?.selectedAccount,
        decimals: tokenInDeposit?.decimals,
        tokenAddressEth: tokenInDeposit?.address,
        name: tokenInDeposit?.name,
      };

      const approveData = await depositErc20(payload);
      if (approveData) {
        setDisable(false);
        toast.success("Balance deposit successfully");
        getBalanceDepositETH();
      } else {
        toast.error("Transaction reverted");
        setDisable(false);
      }
    } catch (err) {
      toast.error("Transaction reverted");
      setDisable(false);
    }
  };

  const withdrawBalanceEth = async () => {
    setDisableWithdraw(true);
    try {
      const payload = {
        chainId: WalletEVM?.chainId,
        TrxType: "Withdraw",
        type: WalletEVM?.type,
        amount: parseFloat(amountInWithdraw),
        userAddress: WalletEVM?.selectedAccount,
        decimals: tokenInWithdraw?.decimals,
        tokenAddress: tokenInWithdraw?.address,
      };

      const approveData = await withdraw(payload);
      if (approveData) {
        setDisableWithdraw(false);
        toast.success("Balance Withdraw successfully");
        getBalanceWithdrawETH();
      } else {
        toast.error("Transaction reverted");
        setDisableWithdraw(false);
      }
    } catch (err) {
      toast.error("Transaction reverted");
      setDisableWithdraw(false);
    }
  };
  return (
    <>
      <Header />
      <section className="deposit-step-sec">
        <Container>
          <Row>
            <Col lg={6}>
              <Tabs defaultActiveKey="deposit" className="mb-3 ">
                {/*================================================All============================================== */}
                <Tab eventKey="deposit" title="Deposit">
                  {" "}
                  <div>
                    <h4 className="sub-heading">Deposit</h4>

                    <Form.Group className="mb-3 form-row">
                      <Form.Label>From</Form.Label>
                      <div className="input-flex-row">
                        <InputGroup className="">
                          <Form.Control
                            type="number"
                            placeholder="0"
                            name="amountInDeposit"
                            onChange={(e) => {
                              setAmountInDeposit(e.target.value);
                            }}
                            value={amountInDeposit}
                          />
                          {/* <InputGroup.Text>max</InputGroup.Text> */}
                        </InputGroup>
                        <Dropdown
                          onSelect={(e) => {
                            HandelTokenListDeposit(e);
                          }}
                        >
                          <Dropdown.Toggle>
                            <img
                              className="profile-main-img"
                              height={50}
                              src={tokenInDeposit?.logos}
                              alt="image"
                            />{" "}
                            {tokenInDeposit?.name}
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            {Tokens.tokens?.length > 0
                              ? Tokens.tokens
                                  .filter((item) => item?.chainId == 11155111)
                                  .map((items, index) => {
                                    return (
                                      <Dropdown.Item
                                        eventKey={JSON.stringify(items)}
                                      >
                                        <img
                                          src={items?.logos}
                                          height={30}
                                          alt=""
                                        />{" "}
                                        {items?.name}
                                      </Dropdown.Item>
                                    );
                                  })
                              : ""}
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                      <p>
                        Balance:{" "}
                        {balanceDeposit?.balance
                          ? (balanceDeposit?.balance * 1).toFixed(6)
                          : 0}{" "}
                        {tokenInDeposit?.name}
                      </p>
                    </Form.Group>

                    <Form.Group className="mb-3 form-row">
                      <Form.Label>To</Form.Label>
                      <div className="input-flex-row">
                        <InputGroup className="">
                          <Form.Control
                            placeholder="0.00"
                            value={amountInDeposit ? amountInDeposit : 0}
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
                      {/* <p>Balance: 0.00</p> */}
                    </Form.Group>

                    <Row>
                      <Col lg={6} className="p-1">
                        <p>{formError}</p>
                        {!WalletEVM?.selectedAccount ? (
                          <button className="common-btn w-100 bg-left mt-3 ">
                            Connect Wallet
                          </button>
                        ) : WalletEVM?.chainId != 11155111 ? (
                          <button
                            className="common-btn w-100 bg-left mt-3 "
                            onClick={() => {
                              switchNetwork("11155111");
                            }}
                          >
                            Switch Network
                          </button>
                        ) : amountInDeposit <= 0 ? (
                          <button className="common-btn w-100 bg-left mt-3 ">
                            Enter Amount
                          </button>
                        ) : parseFloat(amountInDeposit) >
                          parseFloat(balanceDeposit?.balance) ? (
                          <button className="common-btn w-100 bg-left mt-3 ">
                            Insufficient Balance
                          </button>
                        ) : tokenInDeposit?.name != "ETH" &&
                          parseFloat(amountInDeposit) >
                            parseFloat(balanceDeposit?.allowance) ? (
                          <button
                            className="common-btn w-100 bg-left mt-3"
                            onClick={() => {
                              approveBalance();
                            }}
                            disabled={disable}
                          >
                            {disable ? "Please wait..." : "Approve"}
                          </button>
                        ) : (
                          <button
                            className="common-btn w-100 bg-left mt-3 "
                            disabled={disable}
                            onClick={() => {
                              if (tokenInDeposit?.name == "ETH") {
                                depositBalanceEth();
                              } else {
                                depositBalanceOther();
                              }
                            }}
                          >
                            {disable ? "Please wait..." : "Deposit"}
                          </button>
                        )}
                      </Col>
                    </Row>
                  </div>
                </Tab>
                <Tab eventKey="withdraw" title="Withdraw">
                  <div>
                    <h4 className="sub-heading">Withdraw</h4>

                    <Form.Group className="mb-3 form-row">
                      <Form.Label>From</Form.Label>
                      <div className="input-flex-row">
                        <InputGroup className="">
                          <Form.Control
                            type="number"
                            placeholder="0.00"
                            name="amountInWithdraw"
                            onChange={(e) => {
                              setAmountInWithdraw(e.target.value);
                            }}
                            value={amountInWithdraw}
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
                      <p>
                        Balance:{" "}
                        {balanceWithdraw?.balance
                          ? (balanceWithdraw?.balance*1).toFixed(6)
                          : 0}{" "}
                        {tokenInWithdraw?.name}
                      </p>
                    </Form.Group>

                    <Form.Group className="mb-3 form-row">
                      <Form.Label>To</Form.Label>
                      <div className="input-flex-row">
                        <InputGroup className="">
                          <Form.Control
                            placeholder="0.00"
                            value={amountInWithdraw ? amountInWithdraw : 0}
                            readOnly
                          />
                          {/* <InputGroup.Text>max</InputGroup.Text> */}
                        </InputGroup>
                        <Dropdown
                          onSelect={(e) => {
                            HandelTokenListWithdraw(e);
                          }}
                        >
                          <Dropdown.Toggle>
                            <img
                              className="profile-main-img"
                              height={50}
                              src={tokenInWithdraw?.logos}
                              alt="image"
                            />{" "}
                            {tokenInWithdraw?.name}
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            {Tokens.tokens?.length > 0
                              ? Tokens.tokens
                                  .filter((item) => item?.chainId == 6806)
                                  .map((items, index) => {
                                    return (
                                      <Dropdown.Item
                                        eventKey={JSON.stringify(items)}
                                      >
                                        <img
                                          src={items?.logos}
                                          height={30}
                                          alt=""
                                        />{" "}
                                        {items?.name}
                                      </Dropdown.Item>
                                    );
                                  })
                              : ""}
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                    </Form.Group>

                    <Row>
                      <Col lg={6} className="p-1">
                        {!WalletEVM?.selectedAccount ? (
                          <button className="common-btn w-100 bg-left mt-3 ">
                            Connect Wallet
                          </button>
                        ) : WalletEVM?.chainId != 6806 ? (
                          <button
                            className="common-btn w-100 bg-left mt-3 "
                            onClick={() => {
                              switchNetwork("6806");
                            }}
                          >
                            Switch Network
                          </button>
                        ) : amountInWithdraw <= 0 ? (
                          <button className="common-btn w-100 bg-left mt-3 ">
                            Enter Amount
                          </button>
                        ) : parseFloat(amountInWithdraw) >
                          parseFloat(balanceWithdraw?.balance) ? (
                          <button className="common-btn w-100 bg-left mt-3 ">
                            Insufficient Balance
                          </button>
                        ) : tokenInDeposit?.name != "ETH" &&
                          parseFloat(amountInWithdraw) >
                            parseFloat(balanceWithdraw?.allowance) ? (
                          <button
                            className="common-btn w-100 bg-left mt-3"
                            onClick={() => {
                              approveBalanceWithdraw();
                            }}
                            disabled={disableWithdraw}
                          >
                            {disableWithdraw ? "Please wait..." : "Approve"}
                          </button>
                        ) : (
                          <button
                            className="common-btn w-100 bg-left mt-3 "
                            disabled={disableWithdraw}
                            onClick={() => {
                              withdrawBalanceEth();
                            }}
                          >
                            {disableWithdraw ? "Please wait..." : "Withdraw"}
                          </button>
                        )}
                      </Col>
                    </Row>
                  </div>
                </Tab>
              </Tabs>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};
