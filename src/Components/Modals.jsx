import React, { useEffect, useMemo, useState } from "react";
import {
  Button,
  Container,
  Dropdown,
  Modal,
  Nav,
  Navbar,
} from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
const Modals = () => {
  const { WalletEVM, walletbalance, user } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showEarn1, setShowEarn1] = useState(false);
  const [showEarn2, setShowEarn2] = useState(false);
  const [showEarn3, setShowEarn3] = useState(false);
  const [showEarn4, setShowEarn4] = useState(false);

  const [showReferrals1, setShowReferrals1] = useState(false);
  const [showReferrals2, setShowReferrals2] = useState(false);
  const [showReferrals3, setShowReferrals3] = useState(false);

  const [showMultipliers1, setShowMultipliers1] = useState(false);
  const [showMultipliers2, setShowMultipliers2] = useState(false);
  const [showMultipliers3, setShowMultipliers3] = useState(false);
  const [showMultipliers4, setShowMultipliers4] = useState(false);
  return (
    <>
      <Dropdown className="wallet-address-dropdown menu-btn-dropdown me-0 ms-3">
        <Dropdown.Toggle id="dropdown-basic">
          <img src="assets/img/new-menu1.png" alt="" />
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item
            eventKey="1"
            onClick={() => {
              setShowEarn1(true);
            }}
          >
            {" "}
            How To Earn Points <img src="assets/img/new-menu2.png" alt="" />
          </Dropdown.Item>
          <Dropdown.Item
            eventKey="2"
            onClick={() => {
              setShowMultipliers1(true);
            }}
          >
            {" "}
            Multipliers
            <img src="assets/img/new-menu3.png" alt="" />
          </Dropdown.Item>
          <Dropdown.Item
            eventKey="3"
            onClick={() => {
              setShowReferrals1(true);
            }}
          >
            {" "}
            Referrals
            <img src="assets/img/new-menu4.png" alt="" />
          </Dropdown.Item>
          {user?.role == "super user" ? (
            <Dropdown.Item
              eventKey="4"
              onClick={() => {
                navigate("/manager-dashboard");
              }}
            >
              Dashboard
            </Dropdown.Item>
          ) : (
            ""
          )}
        </Dropdown.Menu>
      </Dropdown>

      {/* new modal */}
      {/* how to earn modals */}
      <Modal
        className="new-user-modal"
        centered
        show={showEarn1}
        onHide={() => {
          setShowEarn1(false);
        }}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div>
            <h4>How To Earn Points</h4>

            <p>Here's how the point system works:</p>
            <ul>
              <li>
                <b>Earn points by depositing money :</b>
                <br />
                The more you deposit, the more points you'll accumulate.
              </li>
            </ul>
            <p></p>
            <ul>
              <li>
                <b>Earn points by referring friends :</b> Invite friends to join
                and earn points when they sign up.
              </li>
            </ul>

            <p className="mt-5">
              <small>
                (For more details, go to the “Referrals” section to learn how to
                refer friends and earn points.)
              </small>
            </p>
            <Button
              variant="primary"
              className="common-btn bg-left"
              onClick={() => {
                setShowEarn1(false);
                setShowEarn2(true);
              }}
            >
              Next
              <img src="assets/img/arrow_forward.png" alt="" />
            </Button>
          </div>
        </Modal.Body>
      </Modal>
      <Modal
        className="new-user-modal"
        centered
        show={showEarn2}
        onHide={() => {
          setShowEarn2(false);
        }}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div>
            <h4>How To Earn Points</h4>

            <p className="mt-4">
              <b>Depositing: Points-per-Dollar-per-Day (P/D/D).</b>
            </p>
            <p>
              This means that every day, you'll receive points based on the
              amount of money you have in your vault. Each dollar is worth one
              point.
            </p>
            <div className="d-flex gap-4">
              <Button
                variant="primary"
                className="common-btn bg-left"
                onClick={() => {
                  setShowEarn2(false);
                  setShowEarn1(true);
                }}
              >
                <img src="assets/img/arrow_backward.png" alt="" />
                Back
              </Button>
              <Button
                variant="primary"
                className="common-btn bg-left"
                onClick={() => {
                  setShowEarn2(false);
                  setShowEarn3(true);
                }}
              >
                Next
                <img src="assets/img/arrow_forward.png" alt="" />
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <Modal
        className="new-user-modal"
        centered
        show={showEarn3}
        onHide={() => {
          setShowEarn3(false);
        }}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div>
            <h4>How To Earn Points</h4>

            <p className="mt-4">
              For instance, If you have $100 in your vault, you'll earn 100
              points daily.
            </p>
            <div className="d-flex gap-4">
              <Button
                variant="primary"
                className="common-btn bg-left"
                onClick={() => {
                  setShowEarn3(false);
                  setShowEarn2(true);
                }}
              >
                <img src="assets/img/arrow_backward.png" alt="" />
                Back
              </Button>
              <Button
                variant="primary"
                className="common-btn bg-left"
                onClick={() => {
                  setShowEarn3(false);
                  setShowEarn4(true);
                }}
              >
                Next
                <img src="assets/img/arrow_forward.png" alt="" />
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <Modal
        className="new-user-modal"
        centered
        show={showEarn4}
        onHide={() => {
          setShowEarn4(false);
        }}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div>
            <h4>How To Earn Points</h4>

            <p className="mt-4">
              There’s more! Points can be multiplied by the “multipliers” earned
              by completing activities!
            </p>
            <p>
              {" "}
              <small>
                (Check the “multipliers” & “activities” tabs for further
                information)
              </small>
            </p>
            <div className="d-flex gap-4">
              <Button
                variant="primary"
                className="common-btn bg-left"
                onClick={() => {
                  setShowEarn4(false);
                  setShowEarn3(true);
                }}
              >
                <img src="assets/img/arrow_backward.png" alt="" />
                Back
              </Button>
              <Button
                variant="primary"
                className="common-btn bg-left"
                onClick={() => {
                  setShowEarn4(false);
                }}
              >
                Done
                {/* <img src="assets/img/arrow_forward.png" alt="" /> */}
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      {/*end of how to earn modals */}

      {/*referrals modals */}
      <Modal
        className="new-user-modal"
        centered
        show={showReferrals1}
        onHide={() => {
          setShowReferrals1(false);
        }}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div>
            <h4>Referrals</h4>

            <p>Here’s how the referral system works:</p>
            <p>
              When you refer other users to the platform, you earn points based
              on their activity. Referrals are organized into layers:
            </p>

            <ul>
              <li>Layer 0: This is you, the main user. </li>
              <li>Layer 1: These are the users you directly referred.</li>
              <li>
                Layer 2: These are the users referred by your Layer 1 referrals.
              </li>
              <li>
                Layer 3: These are the users referred by your Layer 2 referrals.
              </li>
              <li>
                Layer 4: These are the users referred by your Layer 3 referrals.
              </li>
            </ul>

            <Button
              variant="primary"
              className="common-btn bg-left"
              onClick={() => {
                setShowReferrals1(false);
                setShowReferrals2(true);
              }}
            >
              Next
              <img src="assets/img/arrow_forward.png" alt="" />
            </Button>
          </div>
        </Modal.Body>
      </Modal>
      <Modal
        className="new-user-modal"
        centered
        show={showReferrals2}
        onHide={() => {
          setShowReferrals2(false);
        }}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div>
            <h4>Referrals</h4>
            <p className="mt-4">
              Each user can have a total of 5 referrals, distributed across
              these layers. You earn points as follows:
            </p>
            <ul>
              <li>100% of the points earned by your Layer 1 referrals.</li>
              <li>50% of the points earned by your Layer 2 referrals.</li>{" "}
              <li>25% of the points earned by your Layer 3 referrals.</li>{" "}
              <li>12.5% of the points earned by your Layer 4 referrals.</li>
            </ul>{" "}
            <div className="d-flex gap-4">
              <Button
                variant="primary"
                className="common-btn bg-left"
                onClick={() => {
                  setShowReferrals2(false);
                  setShowReferrals1(true);
                }}
              >
                <img src="assets/img/arrow_backward.png" alt="" />
                Back
              </Button>
              <Button
                variant="primary"
                className="common-btn bg-left"
                onClick={() => {
                  setShowReferrals2(false);
                  setShowReferrals3(true);
                }}
              >
                Next
                <img src="assets/img/arrow_forward.png" alt="" />
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <Modal
        className="new-user-modal"
        centered
        show={showReferrals3}
        onHide={() => {
          setShowReferrals3(false);
        }}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div>
            <h4>Referrals</h4>

            <p className="mt-4">
              This tiered system allows you to accumulate points from the
              activity of users across multiple layers, maximizing your rewards
              as your network grows.<br></br>
              <br></br>
              Referrals are currently located inside the 'Activities' tab.
              Please navigate to the 'Activities' section to view your
              referrals.
            </p>
            <div className="d-flex gap-4">
              <Button
                variant="primary"
                className="common-btn bg-left"
                onClick={() => {
                  setShowReferrals3(false);
                  setShowReferrals2(true);
                }}
              >
                <img src="assets/img/arrow_backward.png" alt="" />
                Back
              </Button>
              <Button
                variant="primary"
                className="common-btn bg-left"
                onClick={() => {
                  setShowReferrals3(false);
                }}
              >
                Done
                {/* <img src="assets/img/arrow_forward.png" alt="" /> */}
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      {/*end of referrals modals */}

      {/*multipilers modals */}

      <Modal
        className="new-user-modal"
        centered
        show={showMultipliers1}
        onHide={() => {
          setShowMultipliers1(false);
        }}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div>
            <h4>Multipliers</h4>
            <p className="mt-4">Here’s how the multiplier system works:</p>
            <p>
              The multiplier boosts the number of points you earn daily from the
              Points-per-Dollar-per-Day (P/D/D) system.
              <br />
            </p>
            <p>
              <small>
                (Go to “How to earn points” to better understand how the P/D/D
                system works.)
              </small>
            </p>

            <Button
              variant="primary"
              className="common-btn bg-left"
              onClick={() => {
                setShowMultipliers1(false);
                setShowMultipliers2(true);
              }}
            >
              Next
              <img src="assets/img/arrow_forward.png" alt="" />
            </Button>
          </div>
        </Modal.Body>
      </Modal>
      <Modal
        className="new-user-modal"
        centered
        show={showMultipliers2}
        onHide={() => {
          setShowMultipliers2(false);
        }}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div>
            <h4>Multipliers</h4>
            <p className="mt-4">
              Instead of multiplying the points you’ve already accumulated, the
              multiplier enhances the points you earn each day. Each activity on
              the platform offers a specific multiplier value.
            </p>
            <div className="d-flex gap-4">
              <Button
                variant="primary"
                className="common-btn bg-left"
                onClick={() => {
                  setShowMultipliers2(false);
                  setShowMultipliers1(true);
                }}
              >
                <img src="assets/img/arrow_backward.png" alt="" />
                Back
              </Button>
              <Button
                variant="primary"
                className="common-btn bg-left"
                onClick={() => {
                  setShowMultipliers2(false);
                  setShowMultipliers3(true);
                }}
              >
                Next
                <img src="assets/img/arrow_forward.png" alt="" />
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <Modal
        className="new-user-modal"
        centered
        show={showMultipliers3}
        onHide={() => {
          setShowMultipliers3(false);
        }}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div>
            <h4>Multipliers</h4>
            <p className="mt-4">
              Once you complete an activity, the corresponding multiplier is
              activated and will increase your daily points earnings until the
              activity’s deadline. After the deadline, the multiplier will
              deactivate, and your points will return to the standard rate of
              P/D/D.
            </p>
            <div className="d-flex gap-4">
              <Button
                variant="primary"
                className="common-btn bg-left"
                onClick={() => {
                  setShowMultipliers3(false);
                  setShowMultipliers2(true);
                }}
              >
                <img src="assets/img/arrow_backward.png" alt="" />
                Back
              </Button>
              <Button
                variant="primary"
                className="common-btn bg-left"
                onClick={() => {
                  setShowMultipliers3(false);
                  setShowMultipliers4(true);
                }}
              >
                Next
                <img src="assets/img/arrow_forward.png" alt="" />
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <Modal
        className="new-user-modal"
        centered
        show={showMultipliers4}
        onHide={() => {
          setShowMultipliers4(false);
        }}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div>
            <h4>Multipliers</h4>
            <p className="mt-4">
              Engage in activities to maximize your daily points and make the
              most of the multipliers available!
            </p>
            <div className="d-flex gap-4">
              <Button
                variant="primary"
                className="common-btn bg-left"
                onClick={() => {
                  setShowMultipliers4(false);
                  setShowMultipliers3(true);
                }}
              >
                {" "}
                <img src="assets/img/arrow_backward.png" alt="" />
                Back
              </Button>
              <Button
                variant="primary"
                className="common-btn bg-left"
                onClick={() => {
                  setShowMultipliers4(false);
                }}
              >
                Done
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      {/*end ofmultipilers modals */}
    </>
  );
};

export default Modals;
