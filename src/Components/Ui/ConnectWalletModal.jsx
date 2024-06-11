import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { Connect, ReConnect } from "../../helpers/Connect";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import { setEVMWallet } from "../../store/reducers/authReducer";

export default function ConnectWalletModal({
  forMobileView,
  chainData,
  ...props
}) {
  //===================================Global Variable===================================//
  const dispatch = useDispatch();
  const { WalletEVM } = useAuth();
  //===================================End Of Code===================================//

  //===================================Local Variable===================================//
  const [walletAddress, setWalletAddress] = useState("");
  //===================================End Of Code===================================//
  console.log(walletAddress, "walletAddress");
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

  //=================Account change code===============//
  const getWalletAddress = async () => {
    const walletAcc = await ReConnect(WalletEVM.type);
    if (WalletEVM.type === "walletConnect") {
      document.addEventListener("ACCOUNT_CONNECTED", (e) => {
        if (e.detail) {
          dispatch(setEVMWallet(e.detail));
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
        }
      });
      document.addEventListener("CONNECT_SUCCESS", (e) => {
        if (e.detail) {
          dispatch(setEVMWallet(e.detail));
        }
      });
    } else {
      dispatch(setEVMWallet(walletAcc));
    }
  };

  useEffect(() => {
    if (WalletEVM) {
      let objData = localStorage.getItem("WalletEVM");
      if (objData !== "undefined") {
        objData = JSON.parse(objData);
        setWalletAddress(objData?.selectedAccount);
      }
    }
  }, [WalletEVM]);

  useEffect(() => {
    if (walletAddress) {
      getWalletAddress();
    }
  }, [walletAddress]);

  return (
    <Modal
      className="new-user-modal wallet-connect"
      centered
      size="md"
      {...props.modalProps}
      backdrop="static"
      z
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
