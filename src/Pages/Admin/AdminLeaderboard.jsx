import React, { useEffect, useState } from "react";
import { AdmindashHeader } from "../../Components/Ui/AdmindashHeader";
import { Col, Container, Row, Tab, Tabs } from "react-bootstrap";
import useAuth from "../../hooks/useAuth";
import axiosMain from "../../http/axios/axios_main";

export const AdminLeaderboard = () => {
    const { user } = useAuth();
    console.log(user);
    const [monthlyTopUser, setMonthlyTopUser] = useState([]);
    const [quarterlyTopUser, setQuarterlyTopUser] = useState([]);
    const [topDeposits, setTopDeposits] = useState([]);
    const [topReferrals , setTopReferrals] = useState([]);

    const getDashboardData = async () => {
      try {
        const getData = await axiosMain.get("/auth/get-leaderboard-deatils", {
          headers: {
            "Content-Type": "application/json",
            authorization: `bearer ${user.token}`,
          },
        });
        if (getData?.data?.status) {
            setMonthlyTopUser(getData?.data?.monthlyTopUser);
            setQuarterlyTopUser(getData?.data?.quarterlyTopUser);
            setTopDeposits(getData?.data?.topDeposits);
            setTopReferrals(getData?.data?.topReferrals);
        }
      } catch (err) {}
    };
  
    useEffect(() => {
      getDashboardData();
    }, []);
  return (
    <>
      <div className="dashboard-layout">
        <AdmindashHeader />
        <section className="outer-dash-section">
          <Container>
            <Row>
              <Col lg={12}>
                <div className="dashboard-white-box">
                  <div className="w-100">
                    <h2 className="inner-page-heading">Leaderboard</h2>
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              {/* =============================Top deposits ====================================== */}
              <Col lg={6}>
                <div className="top-deposit-box for-min-height">
                  <h4 className="sub-heading text-start">Top Deposits</h4>
                  <Row>
                    <Col lg={6} md={6} sm={6} xs={6}>
                      <div class="inner-user-box">
                        <div class="user-img">
                          <img
                            src="https://q3.donative.in:3006/images/profilePic/avatar.png"
                            alt=""
                          />
                        </div>
                        <h4>0xC1A...d2b5B</h4>
                        <p>-</p>
                        <h3>
                          <b>$259.9951</b> Deposited
                        </h3>
                      </div>
                    </Col>
                    <Col lg={6} md={6} sm={6} xs={6}>
                      <div class="inner-user-box">
                        <div class="user-img">
                          <img
                            src="https://q3.donative.in:3006/images/profilePic/avatar.png"
                            alt=""
                          />
                        </div>
                        <h4>0xC1A...d2b5B</h4>
                        <p>-</p>
                        <h3>
                          <b>$259.9951</b> Deposited
                        </h3>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Col>
              {/* ===============================================End of code ======================================= */}

              {/* ================================================Top Referrals ==================================== */}
              <Col lg={6}>
                <div className="top-deposit-box for-min-height">
                  <h4 className="sub-heading text-start">Top Referrals</h4>
                  <Row>
                    <Col lg={6} md={6} sm={6} xs={6}>
                      <div class="inner-user-box top-referrals">
                        <div class="user-img">
                          <img
                            src="https://q3.donative.in:3006/images/profilePic/avatar.png"
                            alt=""
                          />
                        </div>
                        <h4>0x2DC...E25B3</h4>
                        <p>-</p>
                        <div class="referral-point">
                          <h3>
                            <img src="assets/img/referal.png" alt="" />
                            <b>14</b>
                            <span>Referrals</span>
                          </h3>
                          <h3>
                            <img src="assets/img/trophy.png" alt="" />
                            <div>
                              <b>2920.26</b>
                              <span>Points</span>
                            </div>
                          </h3>
                        </div>
                      </div>
                    </Col>
                    <Col lg={6} md={6} sm={6} xs={6}>
                      <div class="inner-user-box top-referrals">
                        <div class="user-img">
                          <img
                            src="https://q3.donative.in:3006/images/profilePic/avatar.png"
                            alt=""
                          />
                        </div>
                        <h4>0x2DC...E25B3</h4>
                        <p>-</p>
                        <div class="referral-point">
                          <h3>
                            <img src="assets/img/referal.png" alt="" />
                            <b>14</b>
                            <span>Referrals</span>
                          </h3>
                          <h3>
                            <img src="assets/img/trophy.png" alt="" />
                            <div>
                              <b>2920.26</b>
                              <span>Points</span>
                            </div>
                          </h3>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Col>
              {/* ========================================End of code ================================================ */}
            </Row>

            <Row>
              <Col lg={12} className="m-auto">
                <div className="top-deposit-table">
                <Tabs defaultActiveKey="top-depsit1" className="mb-3 ">
                    {/*================================================Monthly============================================== */}
                    <Tab eventKey="top-depsit1" title="Monthly">
                      <ul className="deposit-list-outer">
                        <li>
                          <div className="deposit-list-main">
                            <div className="left-user">
                              <div className="count-deposit">
                                <span>1</span>
                                <img
                                  className="crown-img"
                                  src="assets/img/king.png"
                                  alt=""
                                />
                              </div>
                              <img
                                className="user-img"
                                src="https://q3.donative.in:3006/images/profilePic/avatar.png"
                                alt=""
                              />
                              <div>
                                <h4>rryryr</h4>
                                <p>hgfhfhfhf</p>
                              </div>
                            </div>
                            <div className="right-trophy">
                              <img
                                className="trophy-img"
                                src="assets/img/trophy.png"
                                alt=""
                              />
                              <div>
                                <h4>00</h4>
                                <p>Points</p>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="deposit-list-main">
                            <div className="left-user">
                              <div className="count-deposit">
                                <span>2</span>
                                <img
                                  className="crown-img"
                                  src="assets/img/crown.png"
                                  alt=""
                                />
                              </div>
                              <img
                                className="user-img"
                                src="https://q3.donative.in:3006/images/profilePic/avatar.png"
                                alt=""
                              />
                              <div>
                                <h4>rryryr</h4>
                                <p>hgfhfhfhf</p>
                              </div>
                            </div>
                            <div className="right-trophy">
                              <img
                                className="trophy-img"
                                src="assets/img/trophy.png"
                                alt=""
                              />
                              <div>
                                <h4>00</h4>
                                <p>Points</p>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="deposit-list-main">
                            <div className="left-user">
                              <div className="count-deposit">
                                <span>3</span>
                                <img
                                  className="crown-img"
                                  src="assets/img/king.png"
                                  alt=""
                                />
                              </div>
                              <img
                                className="user-img"
                                src="https://q3.donative.in:3006/images/profilePic/avatar.png"
                                alt=""
                              />
                              <div>
                                <h4>rryryr</h4>
                                <p>hgfhfhfhf</p>
                              </div>
                            </div>
                            <div className="right-trophy">
                              <img
                                className="trophy-img"
                                src="assets/img/trophy.png"
                                alt=""
                              />
                              <div>
                                <h4>00</h4>
                                <p>Points</p>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="deposit-list-main">
                            <div className="left-user">
                              <div className="count-deposit">
                                <span>4</span>
                                <img
                                  className="crown-img"
                                  src="assets/img/crown.png"
                                  alt=""
                                />
                              </div>
                              <img
                                className="user-img"
                                src="https://q3.donative.in:3006/images/profilePic/avatar.png"
                                alt=""
                              />
                              <div>
                                <h4>rryryr</h4>
                                <p>hgfhfhfhf</p>
                              </div>
                            </div>
                            <div className="right-trophy">
                              <img
                                className="trophy-img"
                                src="assets/img/trophy.png"
                                alt=""
                              />
                              <div>
                                <h4>00</h4>
                                <p>Points</p>
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </Tab>
                    <Tab eventKey="top-depsit2" title="Quarterly">
                    <ul className="deposit-list-outer">
                        <li>
                          <div className="deposit-list-main">
                            <div className="left-user">
                              <div className="count-deposit">
                                <span>1</span>
                                <img
                                  className="crown-img"
                                  src="assets/img/king.png"
                                  alt=""
                                />
                              </div>
                              <img
                                className="user-img"
                                src="https://q3.donative.in:3006/images/profilePic/avatar.png"
                                alt=""
                              />
                              <div>
                                <h4>rryryr</h4>
                                <p>hgfhfhfhf</p>
                              </div>
                            </div>
                            <div className="right-trophy">
                              <img
                                className="trophy-img"
                                src="assets/img/trophy.png"
                                alt=""
                              />
                              <div>
                                <h4>00</h4>
                                <p>Points</p>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="deposit-list-main">
                            <div className="left-user">
                              <div className="count-deposit">
                                <span>2</span>
                                <img
                                  className="crown-img"
                                  src="assets/img/crown.png"
                                  alt=""
                                />
                              </div>
                              <img
                                className="user-img"
                                src="https://q3.donative.in:3006/images/profilePic/avatar.png"
                                alt=""
                              />
                              <div>
                                <h4>rryryr</h4>
                                <p>hgfhfhfhf</p>
                              </div>
                            </div>
                            <div className="right-trophy">
                              <img
                                className="trophy-img"
                                src="assets/img/trophy.png"
                                alt=""
                              />
                              <div>
                                <h4>00</h4>
                                <p>Points</p>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="deposit-list-main">
                            <div className="left-user">
                              <div className="count-deposit">
                                <span>3</span>
                                <img
                                  className="crown-img"
                                  src="assets/img/king.png"
                                  alt=""
                                />
                              </div>
                              <img
                                className="user-img"
                                src="https://q3.donative.in:3006/images/profilePic/avatar.png"
                                alt=""
                              />
                              <div>
                                <h4>rryryr</h4>
                                <p>hgfhfhfhf</p>
                              </div>
                            </div>
                            <div className="right-trophy">
                              <img
                                className="trophy-img"
                                src="assets/img/trophy.png"
                                alt=""
                              />
                              <div>
                                <h4>00</h4>
                                <p>Points</p>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="deposit-list-main">
                            <div className="left-user">
                              <div className="count-deposit">
                                <span>4</span>
                                <img
                                  className="crown-img"
                                  src="assets/img/crown.png"
                                  alt=""
                                />
                              </div>
                              <img
                                className="user-img"
                                src="https://q3.donative.in:3006/images/profilePic/avatar.png"
                                alt=""
                              />
                              <div>
                                <h4>rryryr</h4>
                                <p>hgfhfhfhf</p>
                              </div>
                            </div>
                            <div className="right-trophy">
                              <img
                                className="trophy-img"
                                src="assets/img/trophy.png"
                                alt=""
                              />
                              <div>
                                <h4>00</h4>
                                <p>Points</p>
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                   </Tab>
                </Tabs>
               
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        {/* ============================================Leaderboard section ======================================================== */}
      </div>
    </>
  );
};
