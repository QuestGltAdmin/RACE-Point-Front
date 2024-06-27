import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { ethers } from "ethers"; // Import ethers.js
import { Connect } from "../../helpers/Connect"; // Assuming Connect function returns the wallet object directly
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import { setEVMWallet } from "../../store/reducers/authReducer";

const ConnectWalletModal = ({ forMobileView, chainData, ...props }) => {
  const dispatch = useDispatch();
  const { WalletEVM } = useAuth();

  const [walletAddress, setWalletAddress] = useState("");
  const [ENSName, setENSName] = useState(""); // State to hold the ENS name
  const [errorMessage, setError] = useState("");

  const connect = async (type) => {
    let loadingToastId;
    try {
      props.modalProps.onHide();
      console.log(type);

      if (type === "walletConnect") {
        // Display loading toast only for WalletConnect
        loadingToastId = toast("Connecting Wallet...", { autoClose: 3000 });
      }
      // console.log(wallet,"1111")

      const wallet = await Connect(type);
        console.log(wallet,"222")
      if (wallet) {
        dispatch(setEVMWallet(wallet));
        setWalletAddress(wallet.selectedAccount);

        if (type === "walletConnect") {
          document.addEventListener("ACCOUNT_CONNECTED", async (e) => {
            if (e.detail) {
              toast.dismiss(loadingToastId);
              dispatch(setEVMWallet(e.detail));
              await resolveENSName(e.detail.selectedAccount); // Fetch ENS name
              window.location.reload();
            }
          });
        }
      } else {
        setError("Failed to connect wallet.");
      }
    } catch (err) {
      console.error("Connect Wallet Error:", err);
      setError("Please install Metamask");
    } finally {
      if (loadingToastId) {
        toast.dismiss(loadingToastId);
      }
    }
  };

  const resolveENSName = async (address) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const ensName = await provider.lookupAddress(address);
      setENSName(ensName || "ENS name not found");
    } catch (error) {
      console.error("Error resolving ENS name:", error);
      setENSName("ENS name not found");
    }
  };

  useEffect(() => {
    if (WalletEVM) {
      let objData = localStorage.getItem("WalletEVM");
      if (objData && objData !== "undefined") {
        objData = JSON.parse(objData);
        setWalletAddress(objData.selectedAccount);
        resolveENSName(objData.selectedAccount); // Fetch ENS name on initial load if available
      }
    }
  }, [WalletEVM]);

  return (
    <Modal
      className="new-user-modal wallet-connect"
      centered
      size="md"
      {...props.modalProps}
      backdrop="static"
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <div className="connect-tech-div">
          <img src="assets/img/Logo.png" alt="" className="img-fluid logo" />
          <p>
            You’ll need an Ethereum wallet to sign in.
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
          <a className="browse-btn" onClick={() => connect("metamask")}>
            <img src="assets/img/Icon.png" alt="" /> Browser Wallet
          </a>
          <a
            className="wallet-connect"
            onClick={() => connect("walletConnect")}
          >
            <img src="assets/img/connect.png" alt="" /> Wallet Connect
          </a>{" "}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ConnectWalletModal;
