import React, { useCallback, useEffect, useState } from "react";
import { AdmindashHeader } from "../../Components/Ui/AdmindashHeader";
import { Col, Container, Row } from "react-bootstrap";
import useAuth from "../../hooks/useAuth";
import axiosMain from "../../http/axios/axios_main";
import { debounce } from "lodash";
import moment from "moment/moment";

export const Adminuserlist = () => {
  //==================================Global Variable================================//
  const { user } = useAuth();
  //==================================End of code================================//
  const [pageNumberTrxAll, setPageNumberTrxAll] = useState(1);
  const [searchTrxAll, setSearchTrxAll] = useState("");
  const [filterTrxAll, setFilterTrxAll] = useState("");
  const [totalOrderCountTrxAll, setTotalOrderCountTrxAll] = useState(1);
  const [showDataTrxAll, setShowDataTrxAll] = useState([]);
  //==============================Get Data All Trx==============================//
  const getDataTrxAll = async (
    pageNumberTrxAll,
    searchTrxAll,
    filterTrxAll
  ) => {
    const payload = {};
    try {
      const getResAll = await axiosMain.get(
        `/admin/user-list?page=${pageNumberTrxAll}&limit=10&search=${searchTrxAll}`,
        // payload,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `bearer ${user.token}`,
          },
        }
      );
      console.log(getResAll);
      if (getResAll?.data?.status) {
        setShowDataTrxAll(getResAll?.data?.data?.list);
        setTotalOrderCountTrxAll(getResAll?.data?.data?.totalRecords[0]?.count);
      }
    } catch (err) {}
  };
  //==================================End of code================================//

  const incressFunctionTrxAll = () => {
    if (pageNumberTrxAll < Math.ceil(totalOrderCountTrxAll / 10)) {
      setPageNumberTrxAll(pageNumberTrxAll + 1);
    }
  };
  const decressFunctionTrxAll = () => {
    if (pageNumberTrxAll > 1) {
      setPageNumberTrxAll(pageNumberTrxAll - 1);
    }
  };

  const filterDataTrxAll = useCallback(debounce(getDataTrxAll, 1000), []);
  useEffect(() => {
    filterDataTrxAll(pageNumberTrxAll, searchTrxAll, filterTrxAll);
  }, [pageNumberTrxAll, searchTrxAll, filterTrxAll]);

  //==============================Get Data All Trx==============================//
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
                    <h2 className="inner-page-heading">User List</h2>

                    <div className="table-box-new shadow-box-main">
                      <div className="table-view-transaction">
                        <div className="thead">
                          <div>
                            <p>S. no</p>
                            <p>Name</p>
                            <p>Referral Code</p>
                            <p>Deposit</p>
                            <p>Earn Points</p>
                            <p>Joining Date</p>
                            <p>Status</p>
                            <p>Action</p>
                          </div>
                        </div>
                        <div className="tbody">
                          {showDataTrxAll?.length > 0 &&
                            showDataTrxAll?.map((items, index) => {
                              return (
                                <div>
                                  <p>{index + 1}</p>
                                  <p>
                                    <span class="mobile-only">Name - </span>{" "}
                                    <big>
                                      <b>
                                        {items?.ENS_name
                                          ? items?.ENS_name
                                          : "No ENS Name"}
                                      </b>
                                    </big>{" "}
                                    <br />{" "}
                                    {items?.wallet_address?.replace(
                                      items?.wallet_address?.substring(5, 37),
                                      "..."
                                    )}
                                  </p>
                                  <p>
                                    <span class="mobile-only">
                                      Referral Code -{" "}
                                    </span>{" "}
                                    {items?.from_referral_code}
                                  </p>
                                  <p>
                                    <span class="mobile-only">Deposit - </span>
                                    {(items?.deposit * 1).toFixed(4)}
                                  </p>
                                  <p>
                                    <span class="mobile-only">
                                      Earn Points -{" "}
                                    </span>
                                    {(items?.earn_points * 1).toFixed(4)}
                                  </p>
                                  <p>
                                    <span class="mobile-only">
                                      Joining Date -{" "}
                                    </span>
                                    {moment(items?.createdAt).format("lll")}
                                  </p>
                                  <p>
                                    <span class="mobile-only">Status - </span>
                                    {items?.status}
                                  </p>
                                  <p>
                                    <div>
                                      <a
                                        className="common-btn admin-table-btn"
                                        href=""
                                      >
                                        Referral Code
                                      </a>
                                      <a
                                        className="common-btn admin-table-btn"
                                        href=""
                                      >
                                        Earn Point
                                      </a>
                                    </div>
                                  </p>
                                </div>
                              );
                            })}
                          {/* <div>
                            <p>2</p>
                            <p>
                              <span class="mobile-only">Name - </span>{" "}
                              <big>
                                <b>Name</b>
                              </big>{" "}
                              <br /> RTY3455g....g4hkgk
                            </p>
                            <p>
                              <span class="mobile-only">Referral Code - </span>{" "}
                              rwrwrw
                            </p>
                            <p>
                              <span class="mobile-only">Deposit - </span>
                              4654644
                            </p>
                            <p>
                              <span class="mobile-only">Earn Points - </span>
                              6464
                            </p>
                            <p>
                              <span class="mobile-only">Joining Date - </span>
                              6464
                            </p>
                            <p>
                              <span class="mobile-only">Status - </span>
                              6464
                            </p>
                            <p>
                              <div>
                                <a
                                  className="common-btn admin-table-btn"
                                  href=""
                                >
                                  Referral Code
                                </a>
                                <a
                                  className="common-btn admin-table-btn"
                                  href=""
                                >
                                  Earn Point
                                </a>
                              </div>
                            </p>
                          </div>
                          <div>
                            <p>3</p>
                            <p>
                              <span class="mobile-only">Name - </span>{" "}
                              <big>
                                <b>Name</b>
                              </big>{" "}
                              <br /> RTY3455g....g4hkgk
                            </p>
                            <p>
                              <span class="mobile-only">Referral Code - </span>{" "}
                              rwrwrw
                            </p>
                            <p>
                              <span class="mobile-only">Deposit - </span>
                              4654644
                            </p>
                            <p>
                              <span class="mobile-only">Earn Points - </span>
                              6464
                            </p>
                            <p>
                              <span class="mobile-only">Joining Date - </span>
                              6464
                            </p>
                            <p>
                              <span class="mobile-only">Status - </span>
                              6464
                            </p>
                            <p>
                              <div>
                                <a
                                  className="common-btn admin-table-btn"
                                  href=""
                                >
                                  Referral Code
                                </a>
                                <a
                                  className="common-btn admin-table-btn"
                                  href=""
                                >
                                  Earn Point
                                </a>
                              </div>
                            </p>
                          </div> */}
                        </div>
                      </div>
                      <div className="d-flex justify-content-end">
                        {showDataTrxAll?.length > 0 ? (
                          <div className="d-flex justify-content-center paginate-register">
                            <div className="d-flex align-items-center">
                              <button
                                className="common-btn"
                                onClick={() => {
                                  decressFunctionTrxAll();
                                }}
                              >
                                <i className="fa fa-angle-left"></i>
                              </button>
                              <button className="common-btn m-2">
                                Page {pageNumberTrxAll} of{" "}
                                {Math.ceil(totalOrderCountTrxAll / 10)}
                              </button>
                              <button
                                className="common-btn"
                                onClick={() => {
                                  incressFunctionTrxAll();
                                }}
                              >
                                <i className="fa fa-angle-right"></i>
                              </button>
                            </div>
                          </div>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </div>
    </>
  );
};
