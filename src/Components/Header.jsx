import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Dropdown,
  Modal,
  Nav,
  Navbar,
} from "react-bootstrap";
import { Provider } from "../helpers/Web3Helper";
import { Connect, onDisconnect } from "../helpers/Connect";
import { logout, setEVMWallet } from "../store/reducers/authReducer";
import { useDispatch } from "react-redux";
import { ethers } from "ethers";
import useAuth from "../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import { reConnect } from "../helpers/web3Model";
import { commonSwitch } from "../helpers/ChainSwitch";

export const Header = () => {
  //========================= Global variable =========================//
  const { WalletEVM, walletbalance } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  let path = location.pathname;
  path = path.split("/")[1];
  const [chainData, setChainData] = useState(WalletEVM?.chainId);
  const [showLogout1, setShowLogout1] = useState(false);
  const [showLogout2, setShowLogout2] = useState(false);
  const handleCloseLogout1 = () => {
    setShowLogout1(false);
  };
  const handleCloseLogout2 = () => {
    setShowLogout2(false);
  };
  //========================= end of code =========================//

  const controlNavbar = () => {
    if (window.scrollY) {
      document.getElementById("headerId").classList.add("darker-header");
      //   HandleClass12();
    }
    if (window.scrollY == 0) {
      document.getElementById("headerId").classList.remove("darker-header");
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, []);

  useEffect(() => {
    if (WalletEVM?.selectedAccount) {
      const handleChain = async () => {
        let provider = await Provider(WalletEVM?.type);
        if (WalletEVM?.type === "walletConnect") {
          let reconnect = await reConnect();
          if (reconnect) {
            dispatch(setEVMWallet(reconnect));
          }
        } else {
          //=================Account change code===============//
          provider.on("accountsChanged", async (accounts) => {
            // const walletAcc = await Connect(WalletEVM?.type);

            // dispatch(setEVMWallet(walletAcc));
            dispatch(logout());
            navigate("/");
            // window.location.reload();
            // }
          });

          //=================Chain change code===============//
          provider.on("chainChanged", async (chainId) => {
            const walletChain = await Connect(WalletEVM?.type);

            dispatch(setEVMWallet(walletChain));
            // window.location.reload();
            // }
          });
        }
      };
      handleChain();
    }
  }, []);

  const handleChain = async (chain_id) => {
    // console.log("chain_id", chain_id);
    if (chain_id != null) {
      try {
        const chain = await commonSwitch(chain_id, WalletEVM?.type);
        if (chain) {
          // console.log("chain", chain);
          // const connect = await Connect(WalletEVM?.type)
          // console.log("connect" , connect);
          const payload = {
            chainId: chain_id,
            selectedAccount: WalletEVM?.selectedAccount,
            type: WalletEVM?.type,
          };
          setChainData(chain_id);
          dispatch(setEVMWallet(payload));
        }
        // setRaceLivePrice(raceliveprice);
      } catch (error) {
        console.error("Error to change:", error);
      }
    }
  };

  const handleLogout = async () => {
    handleCloseLogout1();
    setShowLogout2(true);
    setTimeout(async () => {
      const disconect = await onDisconnect(WalletEVM?.type);
      dispatch(logout({}));
      navigate("/");
    }, 2000);
  };

  return (
    <>
      <header className="header-landing" id="headerId">
        <Navbar expand="lg" className="">
          <Container>
            <a
              className="text-white"
              href="#"
              onClick={() => {
                if (path == "dashboard") {
                  navigate("/");
                } else if (path == "activities") {
                  navigate("/dashboard");
                }else{
                  navigate("/activities");
                }
              }}
            >
              <i class="fa fa-arrow-left" aria-hidden="true"></i>
            </a>
            <Navbar.Brand
              onClick={() => {
                navigate("/");
              }}
            >
              <h1>
                <img src="assets/img/Logo.png" alt="" /> Points
              </h1>
            </Navbar.Brand>
            <div className="d-flex align-items-center">
            
                <>
                  <Dropdown
                    className="wallet-address-dropdown"
                    onSelect={(e) => {
                      handleChain(e);
                    }}
                  >
                    <Dropdown.Toggle id="dropdown-basic">
                      <img
                        src={`assets/img/${
                          chainData == 10
                            ? "coin1.png"
                            : chainData == 42161
                            ? "coin3.png"
                            : chainData == 137
                            ? "coin2.png"
                            : "coin4.png"
                        }`}
                        alt=""
                      />
                      {WalletEVM?.selectedAccount?.replace(
                        WalletEVM?.selectedAccount?.substring(5, 37),
                        "..."
                      )}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item eventKey="10">
                        {" "}
                        <img src="assets/img/coin1.png" alt="" /> Optimism
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="42161">
                        {" "}
                        <img src="assets/img/coin3.png" alt="" /> Arbitrum
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="137">
                        {" "}
                        <img src="assets/img/coin2.png" alt="" /> Polygon
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="8453">
                        {" "}
                        <img src="assets/img/coin4.png" alt="" /> Base
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item
                        onClick={() => {
                          setShowLogout1(true);
                        }}
                      >
                        {" "}
                        <img src="assets/img/logout.png" alt="" /> Log Out
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  <a href="" className="social-head">
                    <img src="assets/images/telegram.png" alt="" />
                  </a>
                  <a href="" className="social-head">
                    <img src="assets/images/twitt.png" alt="" />
                  </a>
                </>
           
              {/* {path !== "dashboard" && (
                <Nav.Link
                  onClick={() => {
                    if (path == "dashboard") {
                      navigate("/");
                    } else {
                      navigate("/dashboard");
                    }
                  }}
                >
                  <img src="assets/img/arrow.png" alt="" /> Return to Foundation
                </Nav.Link>
              )} */}
            </div>
          </Container>
        </Navbar>

        <Modal
          className="network-popup logout-popup"
          size="md"
          centered
          show={showLogout1}
          onHide={handleCloseLogout1}
        >
          <Modal.Body>
            <div>
              <h4 className="sub-heading">Log Out </h4>
              <p>Are you sure you want to log out?</p>

              <Button
                className="w-50"
                variant="danger"
                onClick={handleCloseLogout1}
              >
                Cancel
              </Button>
              <Button
                className="w-50"
                variant="success"
                onClick={() => {
                  handleLogout();
                }}
              >
                Yes
              </Button>
            </div>
          </Modal.Body>
        </Modal>
        <Modal
          className="network-popup logout-popup"
          size="md"
          centered
          show={showLogout2}
          onHide={handleCloseLogout2}
        >
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <div>
              <h4 className="sub-heading">Log Out </h4>
              <p>You have successfully logged out</p>
            </div>
          </Modal.Body>
        </Modal>
      </header>
    </>
  );
};
