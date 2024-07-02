import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Provider } from "../helpers/Web3Helper";
import { Connect } from "../helpers/Connect";
import { setEVMWallet } from "../store/reducers/authReducer";
import { useDispatch } from "react-redux";
import { ethers } from "ethers";

export const Header = () => {
  const dispatch = useDispatch();
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
    // if (wallet) {
    const handleChain = async () => {
      let provider = await Provider("metamask");
      //=================Account change code===============//
      provider.on("accountsChanged", async (accounts) => {
        console.log(accounts, "accounts");
        const walletAcc = await Connect("metamask");
        // if (wallet.type === "walletConnect") {
        // } else {
        // localStorage.setItem("wallet", JSON.stringify(walletAcc));
        dispatch(setEVMWallet(walletAcc));
        window.location.reload();
        // }
      });

      //=================Chain change code===============//
      provider.on("chainChanged", async (chainId) => {
        console.log(chainId, "chainId");
        const walletChain = await Connect("metamask");
        // if (wallet.type === "walletConnect") {
        // } else {
        // localStorage.setItem("wallet", JSON.stringify(walletChain));
        dispatch(setEVMWallet(walletChain));

        window.location.reload();
        // }
      });
    };
    handleChain();
    // }
  }, []);

  return (
    <>
      <header className="header-landing" id="headerId">
        <Navbar expand="lg" className="">
          <Container>
            <Navbar.Brand href="/">
              <h1>
                <img src="assets/img/Logo.png" alt="" /> Points
              </h1>
            </Navbar.Brand>
            <Nav.Link href="/">
              <img src="assets/img/arrow.png" alt="" /> Return to Foundation
            </Nav.Link>
          </Container>
        </Navbar>
      </header>
    </>
  );
};
