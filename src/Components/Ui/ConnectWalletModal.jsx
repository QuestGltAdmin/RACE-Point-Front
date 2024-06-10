import React, { useEffect, useState } from "react";
import { Col, Container, Row, Modal, Navbar, Button } from "react-bootstrap";
import { Connect } from "../../helpers/Connect";
import { useDispatch } from "react-redux";

import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";

export default function ConnectWalletModal({
  forMobileView,
  chainData,
  ...props
}) {
  //===================================Global Variable===================================//
  const dispatch = useDispatch();
  //===================================End Of Code===================================//

  //===================================Connect EVM Wallet==================================//
  const connect = async (type) => {
    let loadingToastId;
    try {
      props.modalProps.onHide();

      if (type === "walletConnect") {
        // Display loading toast only for WalletConnect
        loadingToastId = toast("Connecting Wallet...", { autoClose: 3000 });
      }

      const wallet = await Connect(type);

      if (type === "walletConnect") {
        document.addEventListener("ACCOUNT_CONNECTED", (e) => {
          if (e.detail) {
            toast.dismiss(loadingToastId);
            dispatch(setEVMWallet(e.detail));
            window.location.reload();
          }
        });
        document.addEventListener("SELECT_WALLET", (e) => {
          if (e.detail) {
            dispatch(setEVMWallet(e.detail));
          }
        });
        document.addEventListener("MODAL_CLOSE", (e) => {
          if (e.detail) {
            dispatch(setEVMWallet(e.detail));
            window.location.reload();
          }
        });
        document.addEventListener("CONNECT_SUCCESS", (e) => {
          if (e.detail) {
            dispatch(setEVMWallet(e.detail));
            window.location.reload();
          }
        });
      } else {
        dispatch(setEVMWallet(wallet));
        window.location.reload();
      }
    } catch (err) {
      console.log("Connect Wallet: ", err);
      window.location.reload();

      if (loadingToastId) {
        toast.dismiss(loadingToastId);
      }
    }
  };

  //===================================End Of Code===================================//

  return (
    <Modal
      className="token-list-modal connect-wallet-modal"
      centered
      size="md"
      {...props.modalProps}
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title>Connect Wallet</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <>

          {" "}
          <div className="connect-tech-div">
            {forMobileView === false ? (
              <Button
                className="common-btn"
                onClick={() => connect("metamask")}
              >
                Metamask <img src="assets/Compress-img/metamask.svg" />
              </Button>
            ) : (
              ""
            )}

            <Button
              className="common-btn"
              onClick={() => connect("walletConnect")}
            >
              WalletConnect{" "}
              <img src="assets/Compress-img/walletconnect.svg" />
            </Button>
          </div>
          <p className="learnmore-link">
            New to Ethereum?{" "}
            <a href="https://ethereum.org/en/wallets/" target={"_blank"}>
              Learn more about wallets →
            </a>
          </p>
        </>
      </Modal.Body>
    </Modal>
  );
}
