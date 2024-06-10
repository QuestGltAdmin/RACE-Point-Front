import React, { useEffect, useState } from "react";
import { Col, Container, Row, Modal, Navbar, Button } from "react-bootstrap";
import { Connect } from "../../helpers/Connect";
import { useDispatch } from "react-redux";

import { toast } from "react-toastify";
// import useAuth from "../../hooks/useAuth";

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
    console.log(type,"llllll")
    let loadingToastId;
    try {
      props.modalProps.onHide();

      if (type === "walletConnect") {
        // Display loading toast only for WalletConnect
        loadingToastId = toast("Connecting Wallet...", { autoClose: 3000 });
      }

      const wallet = await Connect(type);
      console.log(wallet,"wallet")

      if (type === "walletConnect") {
        document.addEventListener("ACCOUNT_CONNECTED", (e) => {
          if (e.detail) {
            toast.dismiss(loadingToastId);
            // dispatch(setEVMWallet(e.detail));
            console.log(e,"1111111111")
            window.location.reload();
          }
        });
        document.addEventListener("SELECT_WALLET", (e) => {
          if (e.detail) {
            // dispatch(setEVMWallet(e.detail));
            console.log(e,"22222222222")

          }
        });
        document.addEventListener("MODAL_CLOSE", (e) => {
          if (e.detail) {
            // dispatch(setEVMWallet(e.detail));
            console.log(e,"3333333333333")

            window.location.reload();
          }
        });
        document.addEventListener("CONNECT_SUCCESS", (e) => {
          if (e.detail) {
            // dispatch(setEVMWallet(e.detail));
            console.log(e,"4444444444444")

            window.location.reload();
          }
        });
      } else {
        // dispatch(setEVMWallet(wallet));
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
      className="new-user-modal wallet-connect"
      centered
      size="md"
      {...props.modalProps}
      backdrop="static"z
    >
      {/* <Modal.Header closeButton>
        <Modal.Title className="common-btn">Connect Wallet</Modal.Title>
      </Modal.Header> */}
      <Modal.Header closeButton></Modal.Header>

      <Modal.Body>
        <>
          {" "}
          <div className="connect-tech-div">
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
            {/* <div className="banner-btn"> */}
            {/* {forMobileView === false ? ( */}
            <a className="browse-btn" onClick={() => connect("metamask")}>
              {/* Metamask <img src="assets/Compress-img/metamask.svg" /> */}
              <img src="assets/img/Icon.png" alt="" /> Browser Wallet
            </a>
            {/* ) : (
              ""
            )} */}

            <a
              className="wallet-connect"
              onClick={() => connect("walletConnect")}
            >
              {/* WalletConnect{" "}
              <img src="assets/Compress-img/walletconnect.svg" /> */}
              <img src="assets/img/connect.png" alt="" /> Wallet Connect
            </a>
            </div>
          {/* </div> */}
          {/* <p className="links">
            New to Ethereum?{" "}
            <a href="https://ethereum.org/en/wallets/" target={"_blank"}>
              Learn more about wallets →
            </a>
          </p> */}
        </>
      </Modal.Body>
    </Modal>
  );
}
