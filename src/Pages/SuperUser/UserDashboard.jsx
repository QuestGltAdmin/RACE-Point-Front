import React, { useEffect, useState } from "react";
import SuperUserHeader from "../../Components/Ui/SuperUserHeader";
import { Col, Container, Form, Row } from "react-bootstrap";
import axiosMain from "../../http/axios/axios_main";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import { encryptData } from "../../Encrypt-Decrypt/encryption-decryption";

const UserDashboard = () => {
  const { WalletEVM ,user} = useAuth();

  const [totalUsers, setTotalUsers] = useState(0);
  const [totalDeposit, setTotalDeposit] = useState(0);

  useEffect(() => {
    getDashboardData();
  }, []);

  const getDashboardData = async () => {
    const wallet = await encryptData(WalletEVM?.selectedAccount);
    const payload = {
      walletAddress: wallet,
    };
    try {
      const getData = await axiosMain.post(
        "/super-user/super-user-dashboard",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (getData?.data?.status) {
        setTotalUsers(getData?.data?.userCount);
        setTotalDeposit(getData?.data?.totalDeposit);
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
                    <h2 className="inner-page-heading d-flex justify-content-between">
                      Dashboard
                    </h2>
                    <Row>
                      <Col lg={4} md={6} sm={6} xs={12}>
                        <div className="shadow-box-dash">
                          <img
                            className="img-coin"
                            src="assets/images/user11.png"
                            alt=""
                          />
                          <h4>{totalUsers}</h4>
                          {/* <h4>4</h4> */}
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
                            $
                            {!isNaN(totalDeposit)
                              ? (totalDeposit * 1).toFixed(2)
                              : 0}
                          </h4>
                          <p>Total Deposit</p>
                        </div>
                      </Col>
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

export default UserDashboard;
