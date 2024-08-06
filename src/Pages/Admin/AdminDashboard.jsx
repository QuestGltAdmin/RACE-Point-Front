import React, { useEffect, useState } from "react";
import { AdmindashHeader } from "../../Components/Ui/AdmindashHeader";
import { Col, Container, Form, Row } from "react-bootstrap";
import axiosMain from "../../http/axios/axios_main";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";

export const AdminDashboard = () => {
  const { user } = useAuth();
  console.log(user);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalDeposit, setTotalDeposit] = useState(0);
  const [systemStop , setSystemStop] = useState(false)
  const getDashboardData = async () => {
    try {
      const getData = await axiosMain.get("/admin/dashboard", {
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${user.token}`,
        },
      });
      if (getData?.data?.status) {
        console.log(getData);
        
        setTotalUsers(getData?.data?.userCount);
        setTotalDeposit(getData?.data?.totalDeposit);
        setSystemStop(getData?.data?.system_stop)
      }
      console.log(getData);
    } catch (err) {}
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  const updateStatus = async (flag) => {

    try {
      const updateData = await axiosMain.get(
        `/admin/system-stop?system_stop=${flag}`,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `bearer ${user.token}`,
          },
        }
      );
      if (updateData?.data?.status) {
        toast.success(
          `All system ${flag == "true" ? "Disable" : "Enable"} successfully`
        );
        getDashboardData()
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
                    <h2 className="inner-page-heading">Dashboard</h2>
                    <Form.Check // prettier-ignore
                                      className="switch-admin-btn"
                                      type="switch"
                                      id="custom-switch"
                                      label="system stop"
                                      checked={
                                        systemStop === false
                                          ? false
                                          : true
                                      }
                                      onChange={(e) => {
                                        if (systemStop == false) {
                                          updateStatus("true");
                                        } else {
                                          updateStatus("false");
                                        }
                                      }}
                                    />
                    <Row>
                      <Col lg={4} md={6} sm={6} xs={12}>
                        <div className="shadow-box-dash">
                          <img
                            className="img-coin"
                            src="assets/images/user11.png"
                            alt=""
                          />
                          <h4>{totalUsers}</h4>
                          <p>Total User Count</p>
                        </div>
                      </Col>
                      <Col lg={4} md={6} sm={6} xs={12}>
                        <div className="shadow-box-dash">
                          <img
                            className="img-coin"
                            src="assets/images/money.png"
                            alt=""
                          />
                          <h4>
                            ${!isNaN(totalDeposit)
                              ? (totalDeposit * 1).toFixed(2)
                              : 0}
                          </h4>
                          <p>Total Deposit</p>
                        </div>
                      </Col>
                      {/*<Col lg={4} md={6} sm={6} xs={12}>
                        <div className="shadow-box-dash">
                          <img
                            className="img-coin"
                            src="assets/images/user11.png"
                            alt=""
                          />
                          <h4>00</h4>
                          <p>Total transaction Count</p>
                        </div>
                      </Col>*/}
                    </Row>
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
