import React, { useCallback, useEffect, useState } from "react";
import { AdmindashHeader } from "../../Components/Ui/AdmindashHeader";
import { Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { debounce } from "lodash";
import axiosMain from "../../http/axios/axios_main";
import useAuth from "../../hooks/useAuth";
import moment from "moment/moment";

export const Adminearnpoint = () => {
  //==================================Global Variable================================//
  const { user } = useAuth();
  //==================================End of code================================//
  const [pageNumberTrxAll, setPageNumberTrxAll] = useState(1);
  const [searchTrxAll, setSearchTrxAll] = useState("");
  const [filterTrxAll, setFilterTrxAll] = useState("");
  const [totalOrderCountTrxAll, setTotalOrderCountTrxAll] = useState(1);
  const [showDataTrxAll, setShowDataTrxAll] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  //==============================Get Data All Trx==============================//
  const getDataTrxAll = async (
    pageNumberTrxAll,
    searchTrxAll,
    startDate,
    endDate
  ) => {
    const payload = {
      date_from: startDate,
      date_to: endDate,
    };
    try {
      const getResAll = await axiosMain.post(
        `/admin/all-user-income?page=${pageNumberTrxAll}&limit=10&search=${searchTrxAll}`,
        payload,
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
    filterDataTrxAll(pageNumberTrxAll, searchTrxAll, startDate, endDate);
  }, [pageNumberTrxAll, searchTrxAll, startDate, endDate]);

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
                    <h2 className="inner-page-heading">Earn Point Statment</h2>

                    <div className="table-box-new shadow-box-main">
                      <div className="d-flex gap-2">
                        <InputGroup className="mb-3 search-input">
                          <Form.Control
                            placeholder="Search...."
                            name="searchTrxAll"
                            type="text"
                            onChange={(e) => {
                              setSearchTrxAll(e.target.value);
                            }}
                            value={searchTrxAll}
                          />
                          <InputGroup.Text id="basic-addon2">
                            <a href="">
                              <i class="fa fa-search"></i>
                            </a>
                          </InputGroup.Text>
                        </InputGroup>
                        <InputGroup className="mb-3 search-input">
                          <Form.Control
                            placeholder="Search...."
                            name="startDate"
                            type="date"
                            onChange={(e) => {
                              console.log(e.target.value);
                              setStartDate(e.target.value);
                            }}
                            value={startDate}
                          />
                        </InputGroup>
                        <InputGroup className="mb-3 search-input">
                          <Form.Control
                            placeholder="Search...."
                            name="endDate"
                            type="date"
                            onChange={(e) => {
                              setEndDate(e.target.value);
                            }}
                            value={endDate}
                          />
                        </InputGroup>
                      </div>
                      <div className="table-view-transaction">
                        <div className="thead">
                          <div>
                            <p>S. no</p>
                            <p>Wallet & ENS</p>
                            <p>Base Earn Points</p>
                            <p>Layer Earn Points</p>
                            <p>Total Earn Points</p>
                            <p>Date</p>
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
                                        {items?.user_id?.ENS_name
                                          ? items?.user_id?.ENS_name
                                          : "No ENS Name"}
                                      </b>
                                    </big>{" "}
                                    <br />{" "}
                                    {items?.user_id?.wallet_address?.replace(
                                      items?.user_id?.wallet_address?.substring(
                                        5,
                                        37
                                      ),
                                      "..."
                                    )}
                                  </p>
                                  <p>
                                    <span class="mobile-only">
                                      Base Earn Points -{" "}
                                    </span>{" "}
                                    {(items?.base_earn_points * 1).toFixed(4)}
                                  </p>
                                  <p>
                                    <span class="mobile-only">
                                      Layer Earn Points -{" "}
                                    </span>
                                    {(items?.layer_earn_points * 1).toFixed(4)}
                                  </p>
                                  <p>
                                    <span class="mobile-only">
                                      Total Earn Points -{" "}
                                    </span>
                                    {(items?.total_earn_points * 1).toFixed(4)}
                                  </p>
                                  <p>
                                    <span class="mobile-only">Date - </span>
                                    {moment(items?.createdAt).format("lll")}
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
                              <span class="mobile-only">
                                Base Earn Points -{" "}
                              </span>{" "}
                              23
                            </p>
                            <p>
                              <span class="mobile-only">
                                Layer Earn Points -{" "}
                              </span>
                              46
                            </p>
                            <p>
                              <span class="mobile-only">
                                Total Earn Points -{" "}
                              </span>
                              24
                            </p>
                            <p>
                              <span class="mobile-only">Date - </span>
                              22/07/2024
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
                              <span class="mobile-only">
                                Base Earn Points -{" "}
                              </span>{" "}
                              23
                            </p>
                            <p>
                              <span class="mobile-only">
                                Layer Earn Points -{" "}
                              </span>
                              46
                            </p>
                            <p>
                              <span class="mobile-only">
                                Total Earn Points -{" "}
                              </span>
                              24
                            </p>
                            <p>
                              <span class="mobile-only">Date - </span>
                              22/07/2024
                            </p>
                          </div> */}
                        </div>
                      </div>

                      {showDataTrxAll?.length <= 0 && (
                        <div>
                          <p className="text-center">No Data Found</p>
                        </div>
                      )}
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
