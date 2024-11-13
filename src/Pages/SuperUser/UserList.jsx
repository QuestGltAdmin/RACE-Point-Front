import React, { useCallback, useEffect, useState } from "react";
import SuperUserHeader from "../../Components/Ui/SuperUserHeader";
import { Col, Container, Form, InputGroup, Modal, Row } from "react-bootstrap";
import useAuth from "../../hooks/useAuth";
import axiosMain from "../../http/axios/axios_main";
import { toast } from "react-toastify";
import moment from "moment/moment";
import ExportEXCEL from "../../Components/ExportToExcel";
import { debounce } from "lodash";
import { encryptData } from "../../Encrypt-Decrypt/encryption-decryption";
import { IphoneSpinner } from "../../Components/IphoneSpinner";

const UserList = () => {
  //==================================Global Variable================================//
  const { user, WalletEVM } = useAuth();
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
  const [checkForData, setCheckForData] = useState(0);

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
    const wallet = await encryptData(WalletEVM?.selectedAccount);
    // const wallet = await encryptData("0xcA33Caa4d99D4fE37fe72d86b3Fb2325bbd91e7D");
    const payload = {
      walletAddress: wallet,
    };
    try {
      const getResAll = await axiosMain.post(`/super-user/user-list`, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (getResAll?.data?.status) {
        const mapData = await getResAll?.data?.data?.list.map(
          (items, index) => {
            return {
              SNo: index + 1,
              ensName: items?.populated_data?.ENS_name
                ? items?.populated_data?.ENS_name
                : "No ENS Name",
              data: moment(items?.populated_data?.createdAt).format("lll"),
              fromReferralCode: items?.populated_data?.from_referral_code,
              myReferralCode1: items?.populated_data?.referral_codes[0]?.code,
              myReferralCode2: items?.populated_data?.referral_codes[1]?.code,
              myReferralCode3: items?.populated_data?.referral_codes[2]?.code,
              myReferralCode4: items?.populated_data?.referral_codes[3]?.code,
              myReferralCode5: items?.populated_data?.referral_codes[4]?.code,
              walletAddress: items?.populated_data?.wallet_address,
              status: items?.populated_data?.status,
              Deposit: items?.populated_data?.deposit,
              EarnPoints: items?.populated_data?.earn_points,
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
    const wallet = await encryptData(WalletEVM?.selectedAccount);
    // const wallet = await encryptData("0xcA33Caa4d99D4fE37fe72d86b3Fb2325bbd91e7D");
    const payload = {
      walletAddress: wallet,
    };
    try {
      setCheckForData(0);

      const getResAll = await axiosMain.post(
        `/super-user/user-list?search=${searchTrxAll}&page=${pageNumberTrxAll}&limit=10`,
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
        "/super-user/user-wise-income",
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
        `/super-user/user-wise-referral-user?user_id=${id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (getDataReferral?.data?.status) {
        setShowDataReferral(getDataReferral?.data?.data);
      }
    } catch (err) {}
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
                            {/* <p>Enable/Disable</p> */}
                          </div>
                        </div>
                        <div className="tbody">
                          {checkForData === 0 ? (
                            <p className="text-center">
                              <IphoneSpinner />
                            </p>
                          ) : checkForData === 1 ? (
                            <p className="text-center">No Data Found</p>
                          ) : (
                            showDataTrxAll?.length > 0 &&
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
                                        {items?.populated_data?.ENS_name
                                          ? items?.populated_data?.ENS_name
                                          : "No ENS Name"}
                                      </b>
                                    </big>{" "}
                                    <br />{" "}
                                    {items?.populated_data?.wallet_address?.replace(
                                      items?.populated_data?.wallet_address?.substring(
                                        5,
                                        37
                                      ),
                                      "..."
                                    )}
                                  </p>
                                  <p>
                                    <span class="mobile-only">
                                      Referrer Code -{" "}
                                    </span>{" "}
                                    {items?.populated_data?.from_referral_code}
                                  </p>
                                  <p>
                                    <span class="mobile-only">Deposit - </span>
                                    {/* {(
                                      items?.populated_data?.deposit * 1
                                    ).toFixed(4)} */}
                                    {new Intl.NumberFormat("en-US").format(
                                      (
                                        items?.populated_data?.deposit * 1
                                      ).toFixed(4)
                                    )}
                                  </p>
                                  <p>
                                    <span class="mobile-only">
                                      Earn Points -{" "}
                                    </span>
                                    {/* {(
                                      items?.populated_data?.earn_points * 1
                                    ).toFixed(4)} */}
                                    {new Intl.NumberFormat("en-US").format(
                                      (
                                        items?.populated_data?.earn_points * 1
                                      ).toFixed(4)
                                    )}
                                  </p>
                                  <p>
                                    <span class="mobile-only">
                                      Joining Date -{" "}
                                    </span>

                                    {moment
                                      .utc(items?.populated_data?.createdAt)
                                      .format("lll")}
                                  </p>
                                  <p>
                                    <span class="mobile-only">Status - </span>
                                    {items?.populated_data?.status}
                                  </p>
                                  <p>
                                    <div>
                                      <a
                                        onClick={() => {
                                          setRefferalCode(
                                            items?.populated_data
                                              ?.referral_codes
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
                                  {/* <p>
                                    <Form.Check
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
                                  </p> */}
                                </div>
                              );
                            })
                          )}
                        </div>
                      </div>
                      {/* {showDataTrxAll?.length <= 0 && (
                        <div>
                          <p className="text-center">No Data Found</p>
                        </div>
                      )} */}
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
              <div className="more-scroll">
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
                            {moment.utc(items?.createdAt).format("lll")}
                          </p>
                          <p>
                            <span class="mobile-only">Base Earn Points - </span>{" "}
                            {new Intl.NumberFormat("en-US").format(
                              (items?.base_earn_points * 1).toFixed(4)
                            )}
                            {/* {(items?.base_earn_points * 1).toFixed(4)} */}
                          </p>
                          <p>
                            <span class="mobile-only">
                              Layer Earn Points -{" "}
                            </span>
                            {new Intl.NumberFormat("en-US").format(
                              (items?.layer_earn_points * 1).toFixed(4)
                            )}
                            {/* {(items?.layer_earn_points * 1).toFixed(4)} */}
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
                      );
                    })}
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
                            {/* {(items?.user_id?.deposit * 1).toFixed(4)} */}
                            {new Intl.NumberFormat("en-US").format(
                              (items?.user_id?.deposit * 1).toFixed(4)
                            )}
                          </p>
                          <p>
                            <span class="mobile-only">Earn Points - </span>
                            {/* {(items?.user_id?.earn_points * 1).toFixed(4)} */}
                            {new Intl.NumberFormat("en-US").format(
                              (items?.user_id?.earn_points * 1).toFixed(4)
                            )}
                          </p>
                          <p>
                            <span class="mobile-only">Joining Date - </span>
                            {moment.utc(items?.createdAt).format("lll")}
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
                            {/* {(items?.user_id?.deposit * 1).toFixed(4)} */}
                            {new Intl.NumberFormat("en-US").format(
                              (items?.user_id?.deposit * 1).toFixed(4)
                            )}
                          </p>
                          <p>
                            <span class="mobile-only">Earn Points - </span>
                            {/* {(items?.user_id?.earn_points * 1).toFixed(4)} */}
                            {new Intl.NumberFormat("en-US").format(
                              (items?.user_id?.earn_points).toFixed(4)
                            )}
                          </p>
                          <p>
                            <span class="mobile-only">Joining Date - </span>
                            {moment.utc(items?.createdAt).format("lll")}
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
                            {/* {(items?.user_id?.deposit * 1).toFixed(4)} */}
                            {new Intl.NumberFormat("en-US").format(
                              (items?.user_id?.deposit * 1).toFixed(4)
                            )}
                          </p>
                          <p>
                            <span class="mobile-only">Earn Points - </span>
                            {/* {(items?.user_id?.earn_points * 1).toFixed(4)} */}
                            {new Intl.NumberFormat("en-US").format(
                              (items?.user_id?.earn_points * 1).toFixed(4)
                            )}
                          </p>
                          <p>
                            <span class="mobile-only">Joining Date - </span>
                            {moment.utc(items?.createdAt).format("lll")}
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
                            {/* {(items?.user_id?.deposit * 1).toFixed(4)} */}
                            {new Intl.NumberFormat("en-US").format(
                              (items?.user_id?.deposit * 1).toFixed(4)
                            )}
                          </p>
                          <p>
                            <span class="mobile-only">Earn Points - </span>
                            {/* {(items?.user_id?.earn_points * 1).toFixed(4)} */}
                            {new Intl.NumberFormat("en-US").format(
                              (items?.user_id?.earn_points * 1).toFixed(4)
                            )}
                          </p>
                          <p>
                            <span class="mobile-only">Joining Date - </span>
                            {moment.utc(items?.createdAt).format("lll")}
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

export default UserList;
