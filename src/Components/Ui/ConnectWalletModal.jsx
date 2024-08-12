import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { ethers } from "ethers"; // Import ethers.js
import { Connect } from "../../helpers/Connect"; // Assuming Connect function returns the wallet object directly
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import { setEVMWallet } from "../../store/reducers/authReducer";
import Web3 from "web3";

const ConnectWalletModal = ({ forMobileView, chainData, checkForAdmin ,  ...props }) => {
  // console.log(props);

  const dispatch = useDispatch();
  const { WalletEVM } = useAuth();

  const [walletAddress, setWalletAddress] = useState("");
  const [ENSName, setENSName] = useState(""); // State to hold the ENS name
  const [errorMessage, setError] = useState("");

  const connect = async (type) => {
    let loadingToastId;
    try {
      props.modalProps.onHide();

      if (type === "walletConnect") {
        // Display loading toast only for WalletConnect
        loadingToastId = toast("Connecting Wallet...", { autoClose: 3000 });
      }

      const wallet = await Connect(type);
      // if (wallet) {
      //   dispatch(setEVMWallet(wallet));
      //   setWalletAddress(wallet.selectedAccount);

      //   if (type === "walletConnect") {
      //     document.addEventListener("ACCOUNT_CONNECTED", async (e) => {
      //       if (e.detail) {
      //         toast.dismiss(loadingToastId);
      //         dispatch(setEVMWallet(e.detail));
      //         await resolveENSName(e.detail.selectedAccount); // Fetch ENS name
      //         window.location.reload();
      //       }
      //     });
      //   } else if (type === "metamask") {
      //     // Reload the page after successful MetaMask connection
      //     window.location.reload();
      //   }
      // } else {
      //   setError("Failed to connect wallet.");
      // }
      if (type === "walletConnect") {
        document.addEventListener("ACCOUNT_CONNECTED", async (e) => {
          if (e.detail) {
            dispatch(setEVMWallet(e.detail));
            await resolveENSName(e.detail.selectedAccount); // Fetch ENS name
            toast.dismiss(loadingToastId);
            // window.location.reload();
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
            // window.location.reload();
          }
        });
        document.addEventListener("CONNECT_SUCCESS", (e) => {
          if (e.detail) {
            dispatch(setEVMWallet(e.detail));
            // window.location.reload();
          }
        });
      } else {
        dispatch(setEVMWallet(wallet));
        // window.location.reload();
      }
    } catch (err) {
      console.error("Connect Wallet Error:", err);
      //setError("Please install Metamask");
    } finally {
      if (loadingToastId) {
        // toast.dismiss(loadingToastId);
      }
    }
  };

  const resolveENSName = async (address) => {
    try {
      const provider = new ethers.providers.Web3Provider(
        new Web3.providers.HttpProvider(
          "https://mainnet.infura.io/v3/41e0714609d84b088e97155fe8849958"
        )
      );
      const ensName = await provider.lookupAddress(address);
      setENSName(ensName || "ENS name not found");
      // console.log(ensName);
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

  useEffect(() => {
    // Detect MetaMask installation
    if (typeof window.ethereum === "undefined") {
      setError(
        "MetaMask is not installed. Please install it to connect your wallet."
      );
      //localStorage.clear(); //If Metamask is uninstalled then localstorage is clear so that user cannot access the dashboard
    }
  }, [dispatch]);

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
            <a href="https://ethereum.org/en/wallets/" target="_blank" className="links">
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
      {checkForAdmin ? "" :   <a className="browse-btn" onClick={() => connect("metamask")}>
            <img src="assets/img/Icon.png" alt="" /> Browser Wallet
          </a>}
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
