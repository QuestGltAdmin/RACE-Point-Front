import React, { useEffect, useState } from "react";
import SuperUserHeader from "../../Components/Ui/SuperUserHeader";
import { Col, Container, Row, Tab, Tabs } from "react-bootstrap";
import useAuth from "../../hooks/useAuth";
import axiosMain from "../../http/axios/axios_main";
import { IphoneSpinner } from "../../Components/IphoneSpinner";

const UserLeaderboard = () => {
  const [monthlyTopUser, setMonthlyTopUser] = useState([]);
  const [quarterlyTopUser, setQuarterlyTopUser] = useState([]);
  const [topDeposits, setTopDeposits] = useState([]);
  const [topReferrals, setTopReferrals] = useState([]);
  const [allTopUser, setAllTopUser] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getDashboardData();
  }, []);

  const getDashboardData = async () => {
    try {
      setLoading(true);
      const getData = await axiosMain.get("/auth/get-leaderboard-deatils", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (getData?.data?.status) {
        setLoading(false);
        setAllTopUser(getData.data.allTopUser);
        setMonthlyTopUser(getData?.data?.monthlyTopUser);
        setQuarterlyTopUser(getData?.data?.weeklyTopUser);
        setTopDeposits(getData?.data?.topDeposits);
        setTopReferrals(getData?.data?.topReferrals);
      }
    } catch (err) {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="dashboard-layout">
        <SuperUserHeader />
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
                    {loading ? (
                      <>
                        <p className="text-center">
                          <IphoneSpinner />
                        </p>
                      </>
                    ) : (
                      <>
                        {topDeposits?.length > 0 ? (
                          topDeposits?.map((items, index) => {
                            return (
                              <Col lg={6} md={6} sm={6} xs={6}>
                                <div class="inner-user-box">
                                  <div class="user-img">
                                    <img
                                      src="assets/images/avatar.png"
                                      alt=""
                                    />
                                  </div>
                                  <h4>
                                    {items?.wallet_address?.replace(
                                      items?.wallet_address?.substring(5, 37),
                                      "..."
                                    )}
                                  </h4>
                                  <p>-</p>
                                  <h3>
                                    {/* <b>${(items?.deposit * 1).toFixed(4)}</b>{" "} */}
                                    <b>
                                      {new Intl.NumberFormat("en-US").format(
                                        (items?.deposit * 1).toFixed(2)
                                      )}
                                    </b>{" "}
                                    &nbsp; Deposited
                                  </h3>
                                </div>
                              </Col>
                            );
                          })
                        ) : (
                          <p className="text-center">No Data Found</p>
                        )}
                      </>
                    )}
                  </Row>
                </div>
              </Col>
              {/* ===============================================End of code ======================================= */}

              {/* ================================================Top Referrals ==================================== */}
              <Col lg={6}>
                <div className="top-deposit-box for-min-height">
                  <h4 className="sub-heading text-start">Top Referrals</h4>
                  <Row>
                    {loading ? (
                      <>
                        <p className="text-center">
                          <IphoneSpinner />
                        </p>
                      </>
                    ) : (
                      <>
                        {topReferrals?.length > 0 ? (
                          topReferrals?.slice(0, 2)?.map((items, index) => {
                            return (
                              <Col lg={6} md={6} sm={6} xs={6}>
                                <div class="inner-user-box top-referrals">
                                  <div class="user-img">
                                    <img
                                      src="assets/images/avatar.png"
                                      alt=""
                                    />
                                  </div>
                                  <h4>
                                    {" "}
                                    {items?.wallet_address?.replace(
                                      items?.wallet_address?.substring(5, 37),
                                      "..."
                                    )}
                                  </h4>
                                  <p>-</p>
                                  <div class="referral-point">
                                    <h3>
                                      <img
                                        src="assets/img/referal.png"
                                        alt=""
                                      />
                                      <b>{items?.referral_count}</b>
                                      <span>Referrals</span>
                                    </h3>
                                    <h3>
                                      <img src="assets/img/trophy.png" alt="" />
                                      <div>
                                        <b>
                                          {/* {(items?.earn_points * 1).toFixed(4)} */}
                                          {new Intl.NumberFormat(
                                            "en-US"
                                          ).format(
                                            (items?.earn_points * 1).toFixed(4)
                                          )}
                                        </b>
                                        <span>Points</span>
                                      </div>
                                    </h3>
                                  </div>
                                </div>
                              </Col>
                            );
                          })
                        ) : (
                          <p className="text-center">No Data Found</p>
                        )}
                      </>
                    )}
                  </Row>
                </div>
              </Col>
              {/* ========================================End of code ================================================ */}
            </Row>

            <Row>
              <Col lg={12} className="m-auto">
                <div className="top-deposit-table">
                  <Tabs defaultActiveKey="top-depsit-all" className="mb-3 ">
                    {/*================================================All============================================== */}
                    <Tab eventKey="top-depsit-all" title="All">
                      <ul className="deposit-list-outer">
                        {allTopUser?.length > 0 ? (
                          allTopUser?.slice(0, 50).map((monthly, index) => (
                            <li key={index}>
                              <div className="deposit-list-main">
                                <div className="left-user">
                                  <div className="count-deposit">
                                    <span>{index + 1}</span>
                                    <img
                                      className="crown-img"
                                      src={
                                        index + 1 === 1
                                          ? "assets/img/king.png"
                                          : "assets/img/crown.png"
                                      }
                                      alt=""
                                    />
                                  </div>
                                  <img
                                    className="user-img"
                                    src="assets/images/avatar.png"
                                    alt=""
                                  />
                                  <div>
                                    <h4>
                                      {monthly.wallet_address?.replace(
                                        monthly.wallet_address?.substring(
                                          5,
                                          37
                                        ),
                                        "..."
                                      )}
                                    </h4>
                                    <p>
                                      {monthly.ENS_name
                                        ? monthly.ENS_name
                                        : "-"}
                                    </p>
                                  </div>
                                </div>

                                <div className="right-trophy">
                                  <img
                                    className="trophy-img"
                                    src="assets/img/trophy.png"
                                    alt=""
                                  />
                                  <div>
                                    {/* <h4>{monthly.earn_points.toFixed(2)}</h4> */}
                                    <h4>
                                      {" "}
                                      {new Intl.NumberFormat("en-US").format(
                                        monthly.earn_points.toFixed(2)
                                      )}
                                    </h4>
                                    <p>Points</p>
                                  </div>
                                </div>
                              </div>
                            </li>
                          ))
                        ) : (
                          <li>
                            <div className="deposit-list-main">
                              <p className="text-center">No Data Found</p>
                            </div>
                          </li>
                        )}
                      </ul>
                    </Tab>

                    {/*================================================End Of Code============================================== */}

                    {/*================================================Monthly============================================== */}
                    <Tab eventKey="top-depsit1" title="Monthly">
                      <ul className="deposit-list-outer">
                        {monthlyTopUser?.length ? (
                          monthlyTopUser?.map((items, index) => {
                            return (
                              <li>
                                <div className="deposit-list-main">
                                  <div className="left-user">
                                    <div className="count-deposit">
                                      <span>{index + 1}</span>
                                      <img
                                        className="crown-img"
                                        src="assets/img/king.png"
                                        alt=""
                                      />
                                    </div>
                                    <img
                                      className="user-img"
                                      src="assets/images/avatar.png"
                                      alt=""
                                    />
                                    <div>
                                      <h4>
                                        {" "}
                                        {items?.wallet_address?.replace(
                                          items?.wallet_address?.substring(
                                            5,
                                            37
                                          ),
                                          "..."
                                        )}
                                      </h4>
                                      <p>
                                        {items.ENS_name ? items.ENS_name : "-"}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="right-trophy">
                                    <img
                                      className="trophy-img"
                                      src="assets/img/trophy.png"
                                      alt=""
                                    />
                                    <div>
                                      <h4>
                                        {/* {(items?.earn_points * 1).toFixed(4)} */}
                                        {new Intl.NumberFormat("en-US").format(
                                          (items?.earn_points * 1).toFixed(4)
                                        )}
                                      </h4>
                                      <p>Points</p>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            );
                          })
                        ) : (
                          <li>
                            <div className="deposit-list-main">
                              <p className="text-center">No Data Found</p>
                            </div>
                          </li>
                        )}
                      </ul>
                    </Tab>
                    <Tab eventKey="top-depsit2" title="Weekly">
                      <ul className="deposit-list-outer">
                        {quarterlyTopUser?.length ? (
                          quarterlyTopUser?.map((items, index) => {
                            return (
                              <li>
                                <div className="deposit-list-main">
                                  <div className="left-user">
                                    <div className="count-deposit">
                                      <span>{index + 1}</span>
                                      <img
                                        className="crown-img"
                                        src="assets/img/king.png"
                                        alt=""
                                      />
                                    </div>
                                    <img
                                      className="user-img"
                                      src="assets/images/avatar.png"
                                      alt=""
                                    />
                                    <div>
                                      <h4>
                                        {" "}
                                        {items?.wallet_address?.replace(
                                          items?.wallet_address?.substring(
                                            5,
                                            37
                                          ),
                                          "..."
                                        )}
                                      </h4>
                                      <p>
                                        {items.ENS_name ? items.ENS_name : "-"}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="right-trophy">
                                    <img
                                      className="trophy-img"
                                      src="assets/img/trophy.png"
                                      alt=""
                                    />
                                    <div>
                                      {/* <h4>
                                        {(
                                          items?.weekly_earn_points * 1
                                        ).toFixed(4)}
                                      </h4> */}
                                      <h4>
                                        {new Intl.NumberFormat("en-US").format(
                                          (
                                            items?.weekly_earn_points * 1
                                          ).toFixed(4)
                                        )}
                                      </h4>
                                      <p>Points</p>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            );
                          })
                        ) : (
                          <li>
                            <div className="deposit-list-main">
                              <p className="text-center">No Data Found</p>
                            </div>
                          </li>
                        )}
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

export default UserLeaderboard;
