import React, { useEffect, useState } from "react";
import { Header } from "../Components/Header";
import {
  Button,
  Col,
  Container,
  Dropdown,
  Form,
  InputGroup,
  Modal,
  ProgressBar,
  Row,
} from "react-bootstrap";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
} from "chart.js";
import { Doughnut, Pie, Line } from "react-chartjs-2";
import axiosMain from "../http/axios/axios_main";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { encryptData } from "../Encrypt-Decrypt/encryption-decryption";
ChartJS.register(
  ArcElement,
  Tooltip,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Legend
);

export const Dashboard = () => {
  //========================= Global variable =========================//
  const { WalletEVM } = useAuth();
  const navigate = useNavigate();
  //========================= end of code =========================//

  //========================= local variable =========================//
  const [dashboarddata, setDashboardData] = useState({});
  const [amountInVault, setAmountInVault] = useState(0);
  const [points, setPoints] = useState(0);
  //========================= end of code =========================//

  const data = {
    labels: ["Arbitrum", "Base", "Optimism", "Polygon"],
    datasets: [
      {
        label: "Deposit",
        data: [
          (dashboarddata?.location?.arbitrium * 1),
          (dashboarddata?.location?.base * 1),
          (dashboarddata?.location?.optimism * 1),
          (dashboarddata?.location?.polygon * 1),
        ],
        // data: [30, 40, 10, 20],
        backgroundColor: ["#053863", "#1771BD", "#06487E", "#7BB9ED"],
        borderColor: ["#053863", "#1771BD", "#06487E", "#7BB9ED"],
        borderWidth: 1,
      },
    ],
  };
  // const options = {
  //   responsive: true,
  //   plugins: {
  //     legend: {
  //       position: "bottom",
  //     },
  //   },
  // };

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const data = tooltipItem.dataset.data;
            const currentValue = data[tooltipItem.dataIndex];
            const total = data.reduce((a, b) => a + b, 0);
            const percentage = ((currentValue / total) * 100).toFixed(2);
            return `${percentage}%`;
          }
        }
      },
      legend: {
        position: "bottom",
      },
    }
  };

  //===============get dahboard data api====================//
  useEffect(() => {
    getdata();
  }, []);
  const getdata = async () => {
    const wallet = await encryptData(WalletEVM?.selectedAccount);
    const payload = {
      walletAddress: wallet,
    };
    try {
      const getdata = await axiosMain.post(
        "/auth/get-dashboard-deatils",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            // authorization: `bearer ${usertoken}`,
          },
        }
      );
      if (getdata?.data?.status) {
        setDashboardData(getdata?.data);
        setAmountInVault(getdata?.data?.amountInVaults);
        setPoints(getdata?.data?.points)
      }
    } catch (err) { }
  };
  //===============End of code====================//

  // const number1 =
  //   dashboarddata?.amountInVaults > 0
  //     ? dashboarddata?.amountInVaults.toFixed(2)
  //     : dashboarddata?.amountInVaults || 0;
  // const digits1 = number1.toString().split("");

  // const number2 =
  //   dashboarddata?.points > 0
  //     ? dashboarddata?.points.toFixed(2)
  //     : dashboarddata?.points || 0;
  // const digits2 = number2.toString().split("");
  //===============End of code====================//


  return (
    <>
      <Header />
      <section className="dashboard-main-sec">
        <Container>
          <Row>
            <Col lg={10} className="m-auto">
              <Row>
                <Col lg={6}>
                  {/* ======================================== Amount In Vaults ======================================== */}
                  <div className="dash-count-box">
                    <img src="assets/img/dash-icon-1.png" alt="" />
                    <h3>Amount in vaults</h3>
                    <div
                      className="digits-container"
                      style={{ display: "flex" }}
                    >
                      {/* Displaying each digit in its own box */}
                      {/* {digits1.map((digit, index) => (
                        <div key={index} className="counter-otp">
                          <p>{digit}</p>
                        </div>
                      ))} */}
                      <div className="counter-otp">
                        <p>$</p>
                        <p className="full-num">{amountInVault.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>

                  {/* ======================================== Amount In Vaults ======================================== */}
                  <div className="dash-count-box">
                    <img src="assets/img/dash-icon-1.png" alt="" />
                    <h3>Points</h3>
                    <div
                      className="digits-container"
                      style={{ display: "flex" }}
                    >
                      {/* Displaying each digit in its own box */}
                      {/* {digits2.map((digit, index) => (
                        <div key={index} className="counter-otp">
                          <p>{digit}</p>
                        </div>
                      ))} */}
                      <div className="counter-otp">
                        <p className="full-num">{points.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <Button
                      className="common-btn bg-left w-100"
                      onClick={() => navigate("/activities")}
                    >
                      <img src="assets/img/star.png" alt="" /> More Activities
                    </Button>
                  </div>
                </Col>
                <Col lg={6}>
                  <div className="dash-count-box">
                    <h3 className="text-center">Location</h3>

                    <div className="outer-box-no-deposite">
                      <div>
                        {amountInVault > 0 ? (
                          <div className="pie-chart-outer">
                            <Pie data={data} options={options} />
                          </div>
                        ) : (
                          <h3>You currently have no deposits</h3>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* <div className="dash-count-box">
                    <h3 className="text-center">$</h3>
                    <div className="pie-chart-outer">
                      <Pie data={data1} options={options1} />
                    </div>
                  </div> */}
                  <div>
                    <button
                      className="common-btn bg-left w-100"
                      onClick={() => navigate("/deposit-step-1")}
                    >
                      <img src="assets/img/graph.png" alt="" /> Boost Your
                      Account
                    </button>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </section>

      {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}

    </>
  );
};
