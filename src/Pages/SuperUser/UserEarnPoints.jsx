import React, { useCallback, useEffect, useState } from "react";
import { Col, Container, Form, InputGroup, Modal, Row } from "react-bootstrap";
import { debounce } from "lodash";
import axiosMain from "../../http/axios/axios_main";
import useAuth from "../../hooks/useAuth";
import moment from "moment/moment";
import ExportEXCEL from "../../Components/ExportToExcel";
import SuperUserHeader from "../../Components/Ui/SuperUserHeader";
import { encryptData } from "../../Encrypt-Decrypt/encryption-decryption";
import { IphoneSpinner } from "../../Components/IphoneSpinner";

const UserEarnPoints = () => {
  //==================================Global Variable================================//
  const { user, WalletEVM } = useAuth();
  //==================================End of code================================//
  const [pageNumberTrxAll, setPageNumberTrxAll] = useState(1);
  const [searchTrxAll, setSearchTrxAll] = useState("");
  const [filterTrxAll, setFilterTrxAll] = useState("");
  const [totalOrderCountTrxAll, setTotalOrderCountTrxAll] = useState(1);
  const [showDataTrxAll, setShowDataTrxAll] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startDateExport, setStartDateExport] = useState("");
  const [endDateExport, setEndDateExport] = useState("");
  const [show, setShow] = useState(false);
  const [showExportData, setShowExportData] = useState([]);
  const [checkForData, setCheckForData] = useState(0);
  const [disableData, setDisableData] = useState(false);
  const handleClose = () => {
    setDisableData(false);
    setStartDateExport("");
    setEndDateExport("");
    setShowExportData([]);
    setShow(false);
  };
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (startDateExport !== "" && endDateExport !== "") {
      getDataExport();
    }
  }, [startDateExport, endDateExport]);

  const getDataExport = async () => {
    const wallet = await encryptData(WalletEVM?.selectedAccount);
    // const wallet = await encryptData(
    //   "0xcA33Caa4d99D4fE37fe72d86b3Fb2325bbd91e7D"
    // );

    try {
      const payload = {
        date_from: startDateExport,
        date_to: endDateExport,
        walletAddress: wallet,
      };
      const getResAll = await axiosMain.post(
        `/super-user/all-user-income`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (getResAll?.data?.status) {
        const mapData = await getResAll?.data?.data?.list?.map(
          (items, index) => {
            return {
              SNo: index + 1,
              date: moment(items?.createdAt).format("lll"),
              baseEarnPoints: items?.base_earn_points,
              layerEarnPoints: items?.layer_earn_points,
              totalEarnPoints: items?.total_earn_points,
            };
          }
        );
        setDisableData(true);
        setShowExportData(mapData);
      }
    } catch (err) {
      setDisableData(false);
    }
  };
  //==============================Get Data All Trx==============================//
  const getDataTrxAll = async (
    pageNumberTrxAll,
    searchTrxAll,
    startDate,
    endDate
  ) => {
    const wallet = await encryptData(WalletEVM?.selectedAccount);
    // const wallet = await encryptData(
    //   "0xcA33Caa4d99D4fE37fe72d86b3Fb2325bbd91e7D"
    // );

    const payload = {
      date_from: startDate,
      date_to: endDate,
      walletAddress: wallet,
    };
    try {
      setCheckForData(0);

      const getResAll = await axiosMain.post(
        `/super-user/all-user-income?page=${pageNumberTrxAll}&limit=10&search=${searchTrxAll}`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (getResAll?.data?.status) {
        if (getResAll?.data?.data?.list?.length > 0) {
          setCheckForData(2);
          setShowDataTrxAll(getResAll?.data?.data?.list);
          setTotalOrderCountTrxAll(
            getResAll?.data?.data?.totalRecords[0]?.count
          );
        } else {
          setCheckForData(1);
        }
      }
    } catch (err) {
      setCheckForData(1);
    }
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
                    <h2 className="inner-page-heading">Earn Point Statment</h2>
                    <button
                      className="common-btn"
                      onClick={() => {
                        setShow(true);
                      }}
                    >
                      Export Data
                    </button>
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
                      </div> {checkForData === 0 ? (
                            <p className="text-center">
                              <IphoneSpinner />
                            </p>
                          ) : checkForData === 1 ? (
                            <p className="text-center">No Data Found</p>
                          ) : (<>   <div className="table-view-transaction">
                            <div className="thead">
                              <div>
                                <p>S. no</p>
                                <p>Date</p>
                                <p>Base Earn Points</p>
                                <p>Layer Earn Points</p>
                                <p>Total Earn Points</p>
                              </div>
                            </div>
                            <div className="tbody">
                             {showDataTrxAll?.length > 0 &&
                                showDataTrxAll?.map((items, index) => {
                                  return (
                                    <div>
                                      <p>{index + 1}</p>
                                      <p>
                                        <span class="mobile-only">Date - </span>
                                        {/* {moment(items?.createdAt).format("lll")} */}
                                        {moment.utc(items?.createdAt).format("lll")}
                                      </p>
                                      <p>
                                        <span class="mobile-only">
                                          Base Earn Points -{" "}
                                        </span>{" "}
                                        {/* {(items?.base_earn_points * 1).toFixed(4)} */}
                                        {new Intl.NumberFormat("en-US").format(
                                          (items?.base_earn_points * 1).toFixed(4)
                                        )}
                                      </p>
                                      <p>
                                        <span class="mobile-only">
                                          Layer Earn Points -{" "}
                                        </span>
                                        {/* {(items?.layer_earn_points * 1).toFixed(4)} */}
                                        {new Intl.NumberFormat("en-US").format(
                                          (items?.layer_earn_points * 1).toFixed(4)
                                        )}
                                      </p>
                                      <p>
                                        <span class="mobile-only">
                                          Total Earn Points -{" "}
                                        </span>
                                        {/* {(items?.total_earn_points * 1).toFixed(4)} */}
                                        {new Intl.NumberFormat("en-US").format(
                                          (items?.total_earn_points * 1).toFixed(4)
                                        )}
                                      </p>
                                    </div>
                                  
                                )})}
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
                          </div></>
  )}
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        <Modal
          className="new-user-modal"
          centered
          show={show}
          onHide={handleClose}
        >
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <div>
              <img
                src="assets/img/Logo.png"
                alt=""
                className="img-fluid logo"
              />
              <p>Select Date range to get data</p>
              <div className="d-flex gap-2">
                <InputGroup className="mb-3 search-input">
                  <Form.Control
                    placeholder="Search...."
                    name="startDateExport"
                    type="date"
                    onChange={(e) => {
                      setStartDateExport(e.target.value);
                    }}
                    value={startDateExport}
                  />
                </InputGroup>
                <InputGroup className="mb-3 search-input">
                  <Form.Control
                    placeholder="Search...."
                    name="endDateExport"
                    type="date"
                    onChange={(e) => {
                      setEndDateExport(e.target.value);
                    }}
                    value={endDateExport}
                  />
                </InputGroup>
              </div>

              {disableData && <p>{showExportData?.length} Data</p>}
              {disableData && (
                <ExportEXCEL
                  csvData={showExportData}
                  fileName="Earn Point List"
                />
              )}
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default UserEarnPoints;
