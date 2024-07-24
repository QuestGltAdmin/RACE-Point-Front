import React, { useEffect, useMemo, useState } from "react";
import { Container, Row, Col, Form, InputGroup } from "react-bootstrap";
import { Adminheader } from "../../Components/Ui/Adminheader";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { encryptData } from "../../Encrypt-Decrypt/encryption-decryption";
import axiosMain from "../../http/axios/axios_main";
import { toast } from "react-toastify";
import ConnectWalletModal from "../../Components/Ui/ConnectWalletModal";
import useAuth from "../../hooks/useAuth";
import { generateSignature } from "../../helpers/generateSignature";
import { adminloginSuccess, logout } from "../../store/reducers/authReducer";

export const AdminLogin = () => {
  //=============== Globle vaiable ====================//
  const { WalletEVM } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //===============End of code====================//

  //=============== Local vaiable ====================//
  const [formError, setFormError] = useState("");
  const [disable, setDisable] = useState(false);
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });

  const [disableWallet, setDisableWallet] = useState(false);
  const [showConnectWalletModal, setShowConnectWalletModal] = useState(false);
  const [checkForOne, setCheckForOne] = useState(false);
  //===============End of code====================//

  //========================= show password on eye click =========================//
  const [eyeShow, setEyeShow] = useState(false);
  const seepass = () => {
    const password = document.getElementById("id_pass");
    {
      password.type === "password"
        ? (password.type = "text")
        : (password.type = "password");
    }
  };

  const showeye = () => {
    const password = document.getElementById("id_pass");
    {
      password.type === "password" ? setEyeShow(true) : setEyeShow(false);
    }
  };

  useEffect(() => {
    showeye();
  }, []);
  //========================= end of code =========================//

  //========================= Handle login function =========================//
  const HandleData = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

  const HandleLogin = async () => {
    if (!inputValue.email) {
      setFormError("Please enter valid Email");
    } else if (!inputValue.password) {
      setFormError("Please enter your password!");
    } else {
      setDisable(true);
      setFormError("");

      const RowEmail = await encryptData(inputValue.email);
      const RowPassword = await encryptData(inputValue.password);

      const payload = {
        email: RowEmail,
        password: RowPassword,
      };

      try {
        const loginData = await axiosMain.post("/admin/login", payload);
        if (loginData?.data?.status) {
          setDisable(false);
          toast.success("Admin login success. Please verify otp.");
          setTimeout(() => {
            navigate("/admin-otp", { state: { email: RowEmail } });
          }, 3000);
        }
      } catch (err) {
        setDisable(false);
        toast.error(err?.response.data.message);
      }
    }
  };
  //========================= end of code =========================//

  const handleCloseModals = () => {
    setShowConnectWalletModal(false);
  };

  const ConnectWalletModalProps = useMemo(
    () => ({
      modalProps: {
        show: showConnectWalletModal,
        onHide: handleCloseModals,
      },
      checkForAdmin : true
      // Check this line for correct function reference
    }),
    [showConnectWalletModal]
  );

  useEffect(() => {
    if (WalletEVM?.selectedAccount && checkForOne == false) {
      loginWithWallet();
    }
  }, [WalletEVM?.selectedAccount]);

  const loginWithWallet = async () => {
    setDisableWallet(true);
    try {
      const walletPayload = {
        type: WalletEVM?.type,
      };
      const getSignature = await generateSignature(walletPayload);
      if (getSignature) {
        setCheckForOne(true);
        const RowMessage = await encryptData(getSignature?.message);
        const RowSignature = await encryptData(getSignature?.signatures);
        const RowType = await encryptData(WalletEVM?.type);
        const payload = {
          signature: RowSignature,
          message: RowMessage,
          type: RowType,
        };
        try {
          const loginObj = await axiosMain.post(
            "/admin/login-with-wallet",
            payload
          );
          if (loginObj?.data?.status) {
            setDisableWallet(false);
            dispatch(adminloginSuccess(loginObj?.data?.data));
            toast.success("Admin login success");
            setTimeout(() => {
              navigate("/admin-dashboard");
            }, 2000);
          }
        } catch (err) {
          setDisableWallet(false);
          setCheckForOne(false);
          toast.error("Admin Not Exist, Please Try Again");
          dispatch(logout());
        }
      }
    } catch (err) {
      setDisableWallet(false);
      dispatch(logout());
      setCheckForOne(false);
    }
  };
  return (
    <>
      <Adminheader />
      <section className="signup-sec">
        <Container>
          <Row>
            <Col lg={5} className="m-auto">
              <div className="outer-bg-signup">
                <h3> Welcome </h3>
                <h5>Admin Login</h5>

                <Form.Group className="mb-3">
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    name="email"
                    onChange={HandleData}
                    value={inputValue.email}
                    className="mb-0"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <InputGroup className="mb-3">
                    <Form.Control
                      type="password"
                      className="mb-0"
                      placeholder="Enter your password"
                      id="id_pass"
                      name="password"
                      onChange={HandleData}
                      value={inputValue.password}
                    />
                    <InputGroup.Text
                      onClick={() => {
                        seepass();
                        showeye();
                      }}
                    >
                      {eyeShow ? (
                        <i className="fa fa-eye-slash"></i>
                      ) : (
                        <i className="fa fa-eye"></i>
                      )}
                    </InputGroup.Text>
                  </InputGroup>
                </Form.Group>
                <p style={{ color: "red" }}>{formError}</p>
                <div>
                  <button
                    className="common-btn bg-left w-100 m-0"
                    disabled={disable}
                    onClick={() => {
                      HandleLogin();
                    }}
                  >
                    {disable === true ? "Processing" : "Login"}
                  </button>
                </div>
                <p className="text-center">Or</p>

                {!WalletEVM?.selectedAccount ? (
                  <button
                    className="common-btn bg-left w-100 m-0"
                    onClick={() => {
                      setShowConnectWalletModal(true);
                    }}
                  >
                    {disableWallet ? "Processing" : "Connect Wallet"}
                  </button>
                ) : (
                  <button className="common-btn bg-left w-100 m-0">
                    {disableWallet
                      ? "Processing"
                      : WalletEVM?.selectedAccount?.replace(
                          WalletEVM?.selectedAccount?.substring(5, 37),
                          "..."
                        )}
                  </button>
                )}
              </div>
            </Col>
          </Row>
        </Container>

        <ConnectWalletModal {...ConnectWalletModalProps} />
      </section>
    </>
  );
};
