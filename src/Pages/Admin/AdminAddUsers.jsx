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

export const AdminAddUsers = () => {
  //==================================Global Variable================================//
  const { user } = useAuth();
  //==================================End of code================================//

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showValue, setShowValue] = useState([]);
  const [prvId, setPrvId] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [disable, setDisable] = useState(false);
  const getMultiplier = async () => {
    try {
      const getData = await axiosMain.get("/admin/get-all-approve-address", {
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${user.token}`,
        },
      });
      if (getData?.data?.status) {
        setShowValue(getData?.data?.data);
      }
    } catch (err) {}
  };

  useEffect(() => {
    getMultiplier();
  }, []);

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
          "/admin/add-approve-address",
          payload,
          {
            headers: {
              "Content-Type": "application/json",
              authorization: `bearer ${user.token}`,
            },
          }
        );
        if (updateData?.data?.status) {
          getMultiplier();
          handleClose();
          toast.success("Wallet address added successfully");
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
                    <h2 className="inner-page-heading">Add Users Wallet</h2>

                    <div className="table-box-new shadow-box-main">
                      <div className="d-flex align-items-center justify-content-between mb-3">
                        <InputGroup className=" search-input">
                          <Form.Control
                            placeholder="Search...."
                            name="searchTrxAll"
                            type="text"
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
                          + Add User Wallet
                        </button>
                      </div>
                      <div className="table-view-transaction">
                        <div className="thead">
                          <div>
                            <p>S. no</p>
                            <p>Wallet Address</p>
                            <p>In Use</p>
                          </div>
                        </div>
                        <div className="tbody">
                          {showValue?.length > 0
                            ? showValue?.map((items, index) => {
                                return (
                                  <div>
                                    <p>{index + 1}</p>
                                    <p>{items?.wallet_address}</p>
                                    <p>{items?.is_use ? "Yes" : "No"}</p>
                                  </div>
                                );
                              })
                            : ""}
                          {/* <div>
                            <p>2</p>
                            <p>0x51EFE4987D9D22032aba856A8E6472913cf1Fa04</p>
                            <p>Active</p>
                          </div>
                          <div>
                            <p>3</p>
                            <p>0x51EFE4987D9D22032aba856A8E6472913cf1Fa04</p>
                            <p>Active</p>
                          </div>
                          <div>
                            <p>4</p>
                            <p>0x51EFE4987D9D22032aba856A8E6472913cf1Fa04</p>
                            <p>Active</p>
                          </div> */}
                        </div>
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
