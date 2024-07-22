import React, { useCallback, useEffect, useState } from "react";
import { AdmindashHeader } from "../../Components/Ui/AdmindashHeader";
import { Col, Container, Row } from "react-bootstrap";
import { debounce } from "lodash";
import axiosMain from "../../http/axios/axios_main";
import useAuth from "../../hooks/useAuth";

export const Adminearnpoint = () => {
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
    const payload = {
      date_from: "2024-07-22",
      date_to: "2024-07-22",
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
                    <h2 className="inner-page-heading">Earn Point Statment</h2>

                    <div className="table-box-new shadow-box-main">
                      <div className="table-view-transaction">
                        <div className="thead">
                          <div>
                            <p>S. no</p>
                            <p>Name</p>
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
                                  <p>1</p>
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
