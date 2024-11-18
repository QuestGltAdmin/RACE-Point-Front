import React, { useCallback, useEffect, useState } from "react";
import { AdmindashHeader } from "../../Components/Ui/AdmindashHeader";
import { Col, Container, Form, InputGroup, Modal, Row } from "react-bootstrap";
import { debounce } from "lodash";
import axiosMain from "../../http/axios/axios_main";
import useAuth from "../../hooks/useAuth";
import moment from "moment/moment";
import { useNavigate } from "react-router-dom";
import { IphoneSpinner } from "../../Components/IphoneSpinner";

const AdminActivity = () => {
  //==================================Global Variable================================//
  const { user } = useAuth();
  const navigate = useNavigate();

  //==================================End of code================================//

  //==================================Local Variables================================//
  const [pagenumber, setPagenumber] = useState(1);
  const [searchall, setSearchall] = useState("");
  const [totaldatacount, setTotalDataCount] = useState(1);
  const [showdata, setShowData] = useState([]);
  const [checkForData, setCheckForData] = useState(0);

  //==================================End of code================================//

  //==============================Get Data All Trx==============================//
  const getdata = async (pagenumber, searchall) => {
    try {
      setCheckForData(0);

      const getResAll = await axiosMain.get(
        `/admin/get-all-activity?page=${pagenumber}&limit=10&search=${searchall}`,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `bearer ${user.token}`,
          },
        }
      );
      if (getResAll?.data?.status) {
        if (getResAll?.data?.data?.content?.length > 0) {
          setCheckForData(2);
          setShowData(getResAll?.data?.data?.content);
          setTotalDataCount(getResAll?.data?.data?.total);
        } else {
          setCheckForData(1);
        }
      }
    } catch (err) {
      setCheckForData(1);
    }
  };
  //==================================End of code================================//

  const incressFunction = () => {
    if (pagenumber < Math.ceil(totaldatacount / 10)) {
      setPagenumber(pagenumber + 1);
    }
  };
  const decressFunction = () => {
    if (pagenumber > 1) {
      setPagenumber(pagenumber - 1);
    }
  };

  const filterData = useCallback(debounce(getdata, 1000), []);
  useEffect(() => {
    filterData(pagenumber, searchall);
  }, [pagenumber, searchall]);

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
                    <h2 className="inner-page-heading">Activity List</h2>
                    <button
                      className="common-btn"
                      onClick={() => {
                        navigate("/main-activity-add");
                      }}
                    >
                      Create Activity
                    </button>
                    <div className="table-box-new shadow-box-main">
                      <div className="d-flex gap-2">
                        <InputGroup className="mb-3 search-input">
                          <Form.Control
                            placeholder="Search...."
                            name="searchall"
                            type="text"
                            onChange={(e) => {
                              setSearchall(e.target.value);
                            }}
                            value={searchall}
                          />
                          <InputGroup.Text id="basic-addon2">
                            <a href="">
                              <i class="fa fa-search"></i>
                            </a>
                          </InputGroup.Text>
                        </InputGroup>
                      </div>{" "}
                      {checkForData === 0 ? (
                        <p className="text-center">
                          <IphoneSpinner />
                        </p>
                      ) : checkForData === 1 ? (
                        <p className="text-center">No Data Found</p>
                      ) : (
                        <>
                          <div className="table-view-transaction">
                            <div className="thead">
                              <div>
                                <p>S. no</p>
                                <p>Title</p>
                                <p>Activity Id</p>
                                <p>Multiplier</p>
                                <p>Type</p>
                                <p>Min. Deposite</p>
                                <p>Link</p>
                                <p>Chain</p>
                                <p>Start Date</p>
                                <p>End Date</p>
                              </div>
                            </div>
                            <div className="tbody">
                              {showdata?.length > 0 &&
                                showdata?.map((items, index) => {
                                  const adjustedIndex =
                                    index + 1 + (pagenumber - 1) * 10;
                                  return (
                                    <div key={adjustedIndex}>
                                      <p>{adjustedIndex}</p>{" "}
                                      <p>
                                        <span class="mobile-only">
                                          Title -{" "}
                                        </span>{" "}
                                        {items?.title ? items?.title : "-"}
                                      </p>
                                      <p>
                                        <span class="mobile-only">
                                          Activity ID -{" "}
                                        </span>{" "}
                                        {items?.activity_id
                                          ? items?.activity_id
                                          : "-"}
                                      </p>
                                      <p>
                                        <span class="mobile-only">
                                          Multiplier
                                        </span>
                                        {items?.multiplier}
                                      </p>
                                      <p>
                                        <span class="mobile-only">Type</span>
                                        {items?.type}
                                      </p>
                                      <p>
                                        <span class="mobile-only">
                                          Min. Deposite
                                        </span>

                                        {items?.min_deposit
                                          ? new Intl.NumberFormat(
                                              "en-US"
                                            ).format(items?.min_deposit)
                                          : "-"}
                                      </p>
                                      <p>
                                        <span class="mobile-only">Link</span>
                                        {items?.link ? items?.link : "-"}
                                      </p>
                                      <p>
                                        <span className="mobile-only">
                                          Link
                                        </span>
                                        {items?.deposit_chain
                                          ? items.deposit_chain.map(
                                              (item, index) => (
                                                <div key={index}>
                                                  {item.chain}
                                                </div>
                                              )
                                            )
                                          : "-"}
                                      </p>
                                      <p>
                                        <span class="mobile-only">
                                          Start Date
                                        </span>
                                        {moment
                                          .utc(items?.start_date)
                                          .format("lll")}
                                      </p>
                                      <p>
                                        <span class="mobile-only">
                                          End Date
                                        </span>
                                        {items?.end_date
                                          ? moment
                                              .utc(items?.end_date)
                                              .format("lll")
                                          : "-"}
                                      </p>
                                    </div>
                                  );
                                })}
                            </div>
                          </div>

                          <div className="d-flex justify-content-end">
                            {showdata?.length > 0 ? (
                              <div className="d-flex justify-content-center paginate-register">
                                <div className="d-flex align-items-center">
                                  <button
                                    className="common-btn"
                                    onClick={() => {
                                      decressFunction();
                                    }}
                                  >
                                    <i className="fa fa-angle-left"></i>
                                  </button>
                                  <button className="common-btn m-2">
                                    Page {pagenumber} of{" "}
                                    {Math.ceil(totaldatacount / 10)}
                                  </button>
                                  <button
                                    className="common-btn"
                                    onClick={() => {
                                      incressFunction();
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
                        </>
                      )}
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

export default AdminActivity;
