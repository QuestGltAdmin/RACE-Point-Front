import React, { useCallback, useEffect, useState } from "react";
import { AdmindashHeader } from "../../Components/Ui/AdmindashHeader";
import { Col, Container, Form, InputGroup, Modal, Row } from "react-bootstrap";
import useAuth from "../../hooks/useAuth";
import axiosMain from "../../http/axios/axios_main";
import { debounce } from "lodash";
import moment from "moment/moment";
import { toast } from "react-toastify";
import CheckWallet from "../../helpers/checkWalletHelper";
import { encryptData } from "../../Encrypt-Decrypt/encryption-decryption";
import { IphoneSpinner } from "../../Components/IphoneSpinner";

const AdminAddManager = () => {
  //==================================Global Variable================================//
  const { user } = useAuth();
  //==================================End of code================================//

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [pageNumberTrxAll, setPageNumberTrxAll] = useState(1);
  const [searchTrxAll, setSearchTrxAll] = useState("");
  const [totalOrderCountTrxAll, setTotalOrderCountTrxAll] = useState(1);
  const [showValue, setShowValue] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [disable, setDisable] = useState(false);
  const [dependency, setDependency] = useState(1);
  const [checkForData, setCheckForData] = useState(0);

  const getMultiplier = async (pageNumberTrxAll, searchTrxAll) => {
    try {
      setCheckForData(0);

      const getData = await axiosMain.get(
        `/admin/super-user-list?page=${pageNumberTrxAll}&limit=10&search=${searchTrxAll}`,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `bearer ${user.token}`,
          },
        }
      );

      if (getData?.data?.status) {
        if (getData?.data?.data?.list?.length > 0) {
          setCheckForData(2);

          setShowValue(getData?.data?.data?.list);
          setTotalOrderCountTrxAll(getData?.data?.data?.totalRecords[0]?.count);
        } else {
          setCheckForData(1);
        }
      }
    } catch (err) {
      setCheckForData(1);
    }
  };

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

  const filterDataTrxAll = useCallback(debounce(getMultiplier, 1000), []);
  useEffect(() => {
    filterDataTrxAll(pageNumberTrxAll, searchTrxAll, dependency);
  }, [pageNumberTrxAll, searchTrxAll, dependency]);

  const updateWallet = async () => {
    const checkWallet = await CheckWallet(inputValue);
    if (!checkWallet) {
      toast.warn("Please enter valid wallet address");
    } else {
      setDisable(true);
      const RowWallet = await encryptData(inputValue);
      const payload = {
        wallet_address: RowWallet,
      };
      try {
        const updateData = await axiosMain.post(
          "/admin/add-super-user",
          payload,
          {
            headers: {
              "Content-Type": "application/json",
              authorization: `bearer ${user.token}`,
            },
          }
        );
        if (updateData?.data?.status) {
          setDependency(dependency + 1);
          handleClose();
          toast.success("Manager Wallet address added successfully");
          setInputValue("");
          setDisable(false);
        }
      } catch (err) {
        setDisable(false);
      }
    }
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
                    <h2 className="inner-page-heading">Add Protocol Manager</h2>

                    <div className="table-box-new shadow-box-main">
                      <div className="d-flex align-items-center justify-content-between mb-3">
                        <InputGroup className=" search-input">
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
                        <button
                          onClick={handleShow}
                          className="common-btn bg-left"
                        >
                          + Add Manager Wallet
                        </button>
                      </div>
                      <div className="table-view-transaction">
                        <div className="thead">
                          <div>
                            <p>S. no</p>
                            <p>Wallet Address</p>
                            <p>ENS Name</p>
                            <p>Referrer Code</p>
                            <p>Deposit</p>
                            <p>Earn Points</p>
                            <p>Joining Date</p>
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
                            showValue?.length > 0 &&
                            showValue?.map((items, index) => {
                              const adjustedIndex =
                                index + 1 + (pageNumberTrxAll - 1) * 10;
                              return (
                                <div>
                                  <p>{adjustedIndex}</p>
                                  <p>
                                    <span class="mobile-only">
                                      Wallet Address -
                                    </span>
                                    {items?.wallet_address?.replace(
                                      items?.wallet_address?.substring(5, 37),
                                      "..."
                                    )}
                                  </p>
                                  <p>
                                    <span class="mobile-only">ENS Name -</span>
                                    {items?.ENS_name ? items?.ENS_name : "-"}
                                  </p>
                                  <p>
                                    <span class="mobile-only">
                                      Referrer Code -
                                    </span>
                                    {items?.from_referral_code
                                      ? items?.from_referral_code
                                      : "-"}
                                  </p>
                                  <p>
                                    <span class="mobile-only">Deposite -</span>
                                    {/* {(items?.deposit * 1).toFixed(4)} */}
                                    {new Intl.NumberFormat("en-US").format(
                                      (items?.deposit * 1).toFixed(4)
                                    )}
                                  </p>
                                  <p>
                                    <span class="mobile-only">
                                      Earn Points -
                                    </span>
                                    {new Intl.NumberFormat("en-US").format(
                                      (items?.earn_points * 1).toFixed(4)
                                    )}
                                    {/* {(items?.earn_points * 1).toFixed(4)} */}
                                  </p>
                                  <p>
                                    <span class="mobile-only">
                                      Joining Date -
                                    </span>
                                    {moment.utc(items?.createdAt).format("lll")}
                                  </p>
                                </div>
                              );
                            })
                          )}
                        </div>
                      </div>
                      <div className="d-flex justify-content-end">
                        {showValue?.length > 0 ? (
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
          size="md"
          className="network-popup  add-wallet-popup"
          centered
          show={show}
          onHide={handleClose}
        >
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <div className="">
              <h4 className="sub-heading mb-3">Add Wallet Address</h4>
              <Form.Group className="mb-3 text-start">
                <Form.Label>Add Wallet Address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter wallet address"
                  name="inputValue"
                  onChange={(e) => {
                    setInputValue(e.target.value);
                  }}
                  value={inputValue}
                />
              </Form.Group>
              <button
                className="common-btn bg-left"
                onClick={() => {
                  updateWallet();
                }}
                disabled={disable}
              >
                {disable ? "Processing" : "Submit"}
              </button>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default AdminAddManager;
