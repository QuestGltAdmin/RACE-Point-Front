import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Provider } from "../helpers/Web3Helper";
import { Connect } from "../helpers/Connect";
import { setEVMWallet } from "../store/reducers/authReducer";
import { useDispatch } from "react-redux";
import { ethers } from "ethers";
import useAuth from "../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";

export const Header = () => {
  //========================= Global variable =========================//
  const { WalletEVM, walletbalance } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  let path = location.pathname;
  path = path.split("/")[1];
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
    // if (wallet) {
    const handleChain = async () => {
      let provider = await Provider(WalletEVM?.type);
      //=================Account change code===============//
      provider.on("accountsChanged", async (accounts) => {
        const walletAcc = await Connect(WalletEVM?.type);

        dispatch(setEVMWallet(walletAcc));
        window.location.reload();
        // }
      });

      //=================Chain change code===============//
      provider.on("chainChanged", async (chainId) => {
        const walletChain = await Connect(WalletEVM?.type);

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
            <Navbar.Brand
              onClick={() => {
                navigate("/");
              }}
            >
              <h1>
                <img src="assets/img/Logo.png" alt="" /> Points
              </h1>
            </Navbar.Brand>
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
          </Container>
        </Navbar>
      </header>
    </>
  );
};
