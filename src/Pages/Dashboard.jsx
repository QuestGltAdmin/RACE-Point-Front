import React, { useState } from "react";
import { Header } from "../Components/Header";
import {
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
  const data = {
    labels: ["Optimism", "Polygon", "Arbitrum", "Base"],
    datasets: [
      {
        label: "# of Votes",
        data: [40, 30, 20, 10],
        backgroundColor: ["#053863", "#1771BD", "#06487E", "#7BB9ED"],
        borderColor: ["#053863", "#1771BD", "#06487E", "#7BB9ED"],
        borderWidth: 1,
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  const data1 = {
    labels: ["USDC", "USDT", "ETH"],
    datasets: [
      {
        label: "# of Votes",
        data: [60, 25, 15],
        backgroundColor: ["#7BB9ED", "#053863", "#1771BD", "#06487E"],
        borderColor: ["#7BB9ED", "#053863", "#1771BD", "#06487E"],
        borderWidth: 1,
      },
    ],
  };
  const options1 = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  return (
    <>
      <Header />
      <section className="dashboard-main-sec">
        <Container>
          <Row>
            <Col lg={10} className="m-auto">
              <Row>
                <Col lg={6}>
                  <div className="dash-count-box">
                    <img src="assets/img/dash-icon-1.png" alt="" />
                    <h3>Amount in vaults</h3>
                    <div className="counter-otp">
                      <p>0</p>
                      <p>0</p>
                      <p>0</p>
                      <p>0</p>
                      <p>0</p>
                      <p>0</p>
                    </div>
                  </div>
                  <div className="dash-count-box">
                    <img src="assets/img/dash-icon-1.png" alt="" />
                    <h3>Amount in vaults</h3>
                    <div className="counter-otp">
                      <p>0</p>
                      <p>0</p>
                      <p>0</p>
                      <p>0</p>
                      <p>0</p>
                      <p>0</p>
                    </div>
                  </div>
                  <div>
                    <button className="common-btn bg-left w-100">
                      <img src="assets/img/star.png" alt="" /> More Activities
                    </button>
                  </div>
                </Col>
                <Col lg={6}>
                  <div className="dash-count-box">
                    <h3 className="text-center">Location</h3>
                    <div className="pie-chart-outer">
                      <Pie data={data} options={options} />
                    </div>
                  </div>
                  <div className="dash-count-box">
                    <h3 className="text-center">$</h3>
                    <div className="pie-chart-outer">
                      <Pie data={data1} options={options1} />
                    </div>
                  </div>
                  <div>
                    <button className="common-btn bg-left w-100">
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
    </>
  );
};
