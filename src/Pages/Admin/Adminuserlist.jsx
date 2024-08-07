import React, { useCallback, useEffect, useState } from "react";
import { AdmindashHeader } from "../../Components/Ui/AdmindashHeader";
import { Col, Container, Form, InputGroup, Modal, Row } from "react-bootstrap";
import useAuth from "../../hooks/useAuth";
import axiosMain from "../../http/axios/axios_main";
import { debounce } from "lodash";
import moment from "moment/moment";
import { toast } from "react-toastify";
import ExportEXCEL from "../../Components/ExportToExcel";

export const Adminuserlist = () => {
  //==================================Global Variable================================//
  const { user } = useAuth();
  //==================================End of code================================//
  const [pageNumberTrxAll, setPageNumberTrxAll] = useState(1);
  const [searchTrxAll, setSearchTrxAll] = useState("");
  const [totalOrderCountTrxAll, setTotalOrderCountTrxAll] = useState(1);
  const [showDataTrxAll, setShowDataTrxAll] = useState([]);
  const [showDataEarn, setShowDataEarn] = useState([]);
  const [showDataReferral, setShowDataReferral] = useState([]);
  const [refferalCode, setRefferalCode] = useState([]);
  const [showEarnData, setShowEarnData] = useState(false);
  const [showReferralUser, setShowReferralUser] = useState(false);
  const [show, setShow] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [idCheck, setIdCheck] = useState("");
  const [exportData, setExportData] = useState([]);
  const [disableData, setDisableData] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseEarnData = async () => {
    setIdCheck("");
    setStartDate("");
    setEndDate("");
    setShowEarnData(false);
  };
  const handleCloseReferralUser = async () => {
    setShowReferralUser(false);
  };

  useEffect(() => {
    getDataForCsv();
  }, []);

  const getDataForCsv = async () => {
    try {
      const getResAll = await axiosMain.get(
        `/admin/user-list`,
        // payload,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `bearer ${user.token}`,
          },
        }
      );
      if (getResAll?.data?.status) {
        const mapData = await getResAll?.data?.data?.list.map(
          (items, index) => {
            return {
              SNo : index + 1,
              ensName: items?.ENS_name ? items?.ENS_name : "No ENS Name",
              data: moment(items?.createdAt).format("lll"),
              fromReferralCode: items?.from_referral_code,
              myReferralCode1: items?.referral_codes[0]?.code,
              myReferralCode2: items?.referral_codes[1]?.code,
              myReferralCode3: items?.referral_codes[2]?.code,
              myReferralCode4: items?.referral_codes[3]?.code,
              myReferralCode5: items?.referral_codes[4]?.code,
              walletAddress: items?.wallet_address,
              status: items?.status,
              Deposit: items?.deposit,
              EarnPoints: items?.earn_points,
            };
          }
        );
        setDisableData(true);
        setExportData(mapData);
      }
    } catch (err) {
      setDisableData(false);
    }
  };
  //==============================Get Data All Trx==============================//
  const getDataTrxAll = async (pageNumberTrxAll, searchTrxAll) => {
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
      // console.log(getResAll);
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
    filterDataTrxAll(pageNumberTrxAll, searchTrxAll);
  }, [pageNumberTrxAll, searchTrxAll]);

  //==============================Get Data All Trx==============================//

  useEffect(() => {
    if (idCheck != "") {
      getEarnData(idCheck);
    }
  }, [startDate, endDate]);

  const getEarnData = async (id) => {
    setIdCheck(id);
    try {
      const payload = {
        userId: id,
        date_from: startDate,
        date_to: endDate,
      };
      const getDataEarn = await axiosMain.post(
        "/admin/user-wise-income",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `bearer ${user.token}`,
          },
        }
      );
      if (getDataEarn?.data?.status) {
        setShowDataEarn(getDataEarn?.data?.data);
      }
    } catch (err) {}
  };

  const getReferralData = async (id) => {
    try {
      const getDataReferral = await axiosMain.get(
        `/admin/user-wise-referral-user?user_id=${id}`,

        {
          headers: {
            "Content-Type": "application/json",
            authorization: `bearer ${user.token}`,
          },
        }
      );
      // console.log(getDataReferral);
      if (getDataReferral?.data?.status) {
        setShowDataReferral(getDataReferral?.data?.data);
      }
    } catch (err) {}
  };

  const updateStatus = async (id, flag) => {
    // console.log(id, flag);

    try {
      const updateData = await axiosMain.get(
        `/admin/update-user?user_id=${id}&emergency_stop=${flag}`,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `bearer ${user.token}`,
          },
        }
      );
      if (updateData?.data?.status) {
        toast.success(
          `User ${flag == "true" ? "Disable" : "Enable"} successfully`
        );
        getDataTrxAll(pageNumberTrxAll, searchTrxAll);
      }
    } catch (err) {}
  };

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
                    {disableData && (
                      <ExportEXCEL csvData={exportData} fileName="User list" />
                    )}
                    <div className="table-box-new shadow-box-main">
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
                      <div className="table-view-transaction">
                        <div className="thead">
                          <div>
                            <p>S. no</p>
                            <p>Wallet & ENS</p>
                            <p>Referrer Code</p>
                            <p>Deposit</p>
                            <p>Earn Points</p>
                            <p>Joining Date</p>
                            <p>Status</p>
                            <p>Action</p>
                            <p>Enable/Disable</p>
                          </div>
                        </div>
                        <div className="tbody">
                          {showDataTrxAll?.length > 0 &&
                            showDataTrxAll?.map((items, index) => {
                              return (
                                <div>
                                  <p>{index + 1}</p>
                                  <p>
                                    <span class="mobile-only">
                                      Wallet & ENS -{" "}
                                    </span>{" "}
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
                                      Referrer Code -{" "}
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
                                        onClick={() => {
                                          setRefferalCode(
                                            items?.referral_codes
                                          );
                                          handleShow();
                                        }}
                                        className="common-btn admin-table-btn"
                                        href="#"
                                      >
                                        Referral Code
                                      </a>
                                      <a
                                        onClick={() => {
                                          getReferralData(items?._id);
                                          setShowReferralUser(true);
                                        }}
                                        className="common-btn admin-table-btn"
                                        href="#"
                                      >
                                        Referral User
                                      </a>
                                      <a
                                        className="common-btn admin-table-btn"
                                        href="#"
                                        onClick={() => {
                                          getEarnData(items?._id);
                                          setShowEarnData(true);
                                        }}
                                      >
                                        Earn Point
                                      </a>
                                    </div>
                                  </p>
                                  <p>
                                    <Form.Check // prettier-ignore
                                      className="switch-admin-btn"
                                      type="switch"
                                      id="custom-switch"
                                      checked={
                                        items?.emergency_stop === false
                                          ? true
                                          : false
                                      }
                                      onChange={(e) => {
                                        if (items?.emergency_stop === false) {
                                          updateStatus(items?._id, "true");
                                        } else {
                                          updateStatus(items?._id, "false");
                                        }
                                      }}
                                    />
                                  </p>
                                </div>
                              );
                            })}
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
              <p>Here are your referral codes</p>
              {refferalCode?.length &&
                refferalCode?.map((items, index) => {
                  return (
                    <div class="referal-copy-row">
                      <div>
                        <span>{index + 1}</span>
                        {items?.code}
                      </div>
                      {items?.is_used && (
                        <a href="#">
                          <img
                            src="assets/img/Green-Tick-Vector-PNG-Images.png"
                            alt="Copy"
                          />
                        </a>
                      )}
                    </div>
                  );
                })}
            </div>
          </Modal.Body>
        </Modal>

        <Modal
          size="lg"
          className="network-popup  "
          centered
          show={showEarnData}
          onHide={handleCloseEarnData}
        >
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <div>
              <h4 className="sub-heading mb-3">Earn Points</h4>
              <div className="d-flex gap-2">
                <InputGroup className="mb-3 search-input">
                  <Form.Control
                    placeholder="Search...."
                    name="startDate"
                    type="date"
                    onChange={(e) => {
                      // console.log(e.target.value);
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
                    <p>Date</p>
                    <p>Base Earn Points</p>
                    <p>Layer Earn Points</p>
                    <p>Total Earn Points</p>
                  </div>
                </div>
                <div className="tbody">
                  {showDataEarn?.length > 0 &&
                    showDataEarn?.map((items, index) => {
                      return (
                        <div>
                          <p>{index + 1}</p>
                          <p>
                            <span class="mobile-only">Date</span>{" "}
                            {moment(items?.createdAt).format("lll")}
                          </p>
                          <p>
                            <span class="mobile-only">Base Earn Points - </span>{" "}
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
                      <span class="mobile-only">Base Earn Points - </span> 23
                    </p>
                    <p>
                      <span class="mobile-only">Layer Earn Points - </span>
                      46
                    </p>
                    <p>
                      <span class="mobile-only">Total Earn Points - </span>
                      24
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
                      <span class="mobile-only">Base Earn Points - </span> 23
                    </p>
                    <p>
                      <span class="mobile-only">Layer Earn Points - </span>
                      46
                    </p>
                    <p>
                      <span class="mobile-only">Total Earn Points - </span>
                      24
                    </p>
                  </div> */}
                </div>
              </div>
              {showDataEarn?.length <= 0 && (
                <div>
                  <p className="text-center">No Data Found</p>
                </div>
              )}
            </div>
          </Modal.Body>
        </Modal>

        <Modal
          size="lg"
          className="network-popup  "
          centered
          show={showReferralUser}
          onHide={handleCloseReferralUser}
        >
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <div>
              <h4 className="sub-heading mb-3">Referral User</h4>
              <div className="table-view-transaction refferal-user-table">
                <div className="thead">
                  <div>
                    <p>S. no</p>
                    <p>Wallet & ENS</p>
                    <p>Referrer Code</p>
                    <p>Deposit</p>
                    <p>Earn Points</p>
                    <p>Joining Date</p>
                  </div>
                </div>
                <div className="tbody">
                  <p>Level 1</p>
                  {showDataReferral?.level_1?.length > 0 &&
                    showDataReferral?.level_1?.map((items, index) => {
                      return (
                        <div>
                          <p>{index + 1}</p>
                          <p>
                            <span class="mobile-only">Wallet & ENS - </span>{" "}
                            <big>
                              <b>
                                {items?.user_id?.ENS_name
                                  ? items?.user_id?.ENS_name
                                  : "No ENS Name"}
                              </b>
                            </big>{" "}
                            <br />{" "}
                            {items?.user_id?.wallet_address?.replace(
                              items?.user_id?.wallet_address?.substring(5, 37),
                              "..."
                            )}
                          </p>
                          <p>
                            <span class="mobile-only">Referrer Code - </span>{" "}
                            {items?.user_id?.from_referral_code}
                          </p>
                          <p>
                            <span class="mobile-only">Deposit - </span>
                            {(items?.user_id?.deposit * 1).toFixed(4)}
                          </p>
                          <p>
                            <span class="mobile-only">Earn Points - </span>
                            {(items?.user_id?.earn_points * 1).toFixed(4)}
                          </p>
                          <p>
                            <span class="mobile-only">Joining Date - </span>
                            {moment(items?.createdAt).format("lll")}
                          </p>
                        </div>
                      );
                    })}
                  <p>Level 2</p>
                  {showDataReferral?.level_2?.length > 0 &&
                    showDataReferral?.level_2?.map((items, index) => {
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
                              items?.user_id?.wallet_address?.substring(5, 37),
                              "..."
                            )}
                          </p>
                          <p>
                            <span class="mobile-only">Referral Code - </span>{" "}
                            {items?.user_id?.from_referral_code}
                          </p>
                          <p>
                            <span class="mobile-only">Deposit - </span>
                            {(items?.user_id?.deposit * 1).toFixed(4)}
                          </p>
                          <p>
                            <span class="mobile-only">Earn Points - </span>
                            {(items?.user_id?.earn_points * 1).toFixed(4)}
                          </p>
                          <p>
                            <span class="mobile-only">Joining Date - </span>
                            {moment(items?.createdAt).format("lll")}
                          </p>
                        </div>
                      );
                    })}
                  <p>Level 3</p>
                  {showDataReferral?.level_3?.length > 0 &&
                    showDataReferral?.level_3?.map((items, index) => {
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
                              items?.user_id?.wallet_address?.substring(5, 37),
                              "..."
                            )}
                          </p>
                          <p>
                            <span class="mobile-only">Referral Code - </span>{" "}
                            {items?.user_id?.from_referral_code}
                          </p>
                          <p>
                            <span class="mobile-only">Deposit - </span>
                            {(items?.user_id?.deposit * 1).toFixed(4)}
                          </p>
                          <p>
                            <span class="mobile-only">Earn Points - </span>
                            {(items?.user_id?.earn_points * 1).toFixed(4)}
                          </p>
                          <p>
                            <span class="mobile-only">Joining Date - </span>
                            {moment(items?.createdAt).format("lll")}
                          </p>
                        </div>
                      );
                    })}
                  <p>Level 4</p>
                  {showDataReferral?.level_4?.length > 0 &&
                    showDataReferral?.level_4?.map((items, index) => {
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
                              items?.user_id?.wallet_address?.substring(5, 37),
                              "..."
                            )}
                          </p>
                          <p>
                            <span class="mobile-only">Referral Code - </span>{" "}
                            {items?.user_id?.from_referral_code}
                          </p>
                          <p>
                            <span class="mobile-only">Deposit - </span>
                            {(items?.user_id?.deposit * 1).toFixed(4)}
                          </p>
                          <p>
                            <span class="mobile-only">Earn Points - </span>
                            {(items?.user_id?.earn_points * 1).toFixed(4)}
                          </p>
                          <p>
                            <span class="mobile-only">Joining Date - </span>
                            {moment(items?.createdAt).format("lll")}
                          </p>
                        </div>
                      );
                    })}
                </div>
              </div>
              {showDataReferral?.length <= 0 && (
                <div>
                  <p className="text-center">No Data Found</p>
                </div>
              )}
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};
