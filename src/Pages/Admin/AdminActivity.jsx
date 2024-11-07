import React, { useCallback, useEffect, useState } from "react";
import { AdmindashHeader } from "../../Components/Ui/AdmindashHeader";
import { Col, Container, Form, InputGroup, Modal, Row } from "react-bootstrap";
import { debounce } from "lodash";
import axiosMain from "../../http/axios/axios_main";
import useAuth from "../../hooks/useAuth";
import moment from "moment/moment";
import { useNavigate } from "react-router-dom";

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
  //==================================End of code================================//

  //==============================Get Data All Trx==============================//
  const getdata = async (pagenumber, searchall) => {
    try {
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
        setShowData(getResAll?.data?.data?.list);
        setTotalDataCount(getResAll?.data?.data?.totalRecords[0]?.count);
      }
    } catch (err) {
      console.log(err, "err");
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
  console.log(showdata, "showdata");

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
                       navigate("/main-activity-add")
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
                              setSearchTrxAll(e.target.value);
                            }}
                            value={searchall}
                          />
                          <InputGroup.Text id="basic-addon2">
                            <a href="">
                              <i class="fa fa-search"></i>
                            </a>
                          </InputGroup.Text>
                        </InputGroup>
                      </div>
                      <div className="table-view-transaction">
                        <div className="thead">
                          <div>
                            <p>S. no</p>
                            <p>Title</p>
                            <p>Type</p>
                            <p>Multiplier</p>
                            <p>Start Date</p>
                          </div>
                        </div>
                        <div className="tbody">
                          {showdata?.length > 0 &&
                            showdata?.map((items, index) => {
                              const adjustedIndex =
                                index + 1 + (pagenumber - 1) * 10;
                              return (
                                <div key={adjustedIndex}>
                                  <p>{adjustedIndex}</p>
                                  <p>
                                    <span class="mobile-only">Title - </span>{" "}
                                    {items?.title ? items?.title : "No Title"}
                                  </p>
                                  <p>
                                    <span class="mobile-only">Type</span>
                                    {items?.type}
                                  </p>
                                  <p>
                                    <span class="mobile-only">Multiplier</span>
                                    {items?.multiplier}
                                  </p>
                                  <p>
                                    <span class="mobile-only">Start Date</span>
                                    {moment
                                      .utc(items?.start_date)
                                      .format("YYYY-MM-DD")}
                                  </p>
                                </div>
                              );
                            })}
                        </div>
                      </div>

                      {showdata?.length <= 0 && (
                        <div>
                          <p className="text-center">No Data Found</p>
                        </div>
                      )}
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
