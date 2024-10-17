import React, { useEffect, useState } from "react";
import {
  Col,
  Container,
  Form,
  InputGroup,
  Modal,
  Row,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import Tree from "react-d3-tree";
import axiosMain from "../../http/axios/axios_main";
import useAuth from "../../hooks/useAuth";
import SuperUserHeader from "../../Components/Ui/SuperUserHeader";
import { encryptData } from "../../Encrypt-Decrypt/encryption-decryption";

const UserGenealogy = () => {
  const { user ,WalletEVM} = useAuth();
  const [nodes, setNodes] = useState([]);

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Name : - {props?.ENS_name ? props?.ENS_name : "-"} <br />
      Points : - {(props.earn_points * 1).toFixed(2)} <br />
      Deposit : - ${(props.deposit * 1).toFixed(2)} <br />
    </Tooltip>
  );

  const createHierarchy = (data) => {
    const map = {};
    let root;

    data.forEach((node) => {
      map[node._id] = { ...node, children: [] };
    });

    data.forEach((node) => {
      if (node.parent_id === 0) {
        root = map[node._id];
      } else {
        map[node.parent_id].children.push(map[node._id]);
      }
    });

    return root;
  };

  const hierarchicalData = createHierarchy(nodes);

  const renderRectSvgNode = ({ nodeDatum }) => (
 
    
    <OverlayTrigger
      placement="right"
      delay={{ show: 250, hide: 400 }}
      overlay={renderTooltip(nodeDatum)}
    >
      <g>
        <circle r="15" />
        <text
          fill="white"
          strokeWidth="1"
          x="20"
          onClick={() => {
            getData(nodeDatum.wallet_address);
          }}
        >
          {nodeDatum.wallet_address?.replace(
            nodeDatum.wallet_address?.substring(5, 37),
            "..."
          )}
        </text>
      </g>
    </OverlayTrigger>
  );

  useEffect(() => {
    let data = "";
    getData(data);
  }, []);

  const getData = async (wallets) => {
    
    const wallet = await encryptData(WalletEVM?.selectedAccount);
    const payload = {
      walletAddress: wallet,
    };
    try {
      const get_data = await axiosMain.post(
        `/super-user/get-team-genealogy`,payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      
      if (get_data?.data?.status) {
        setNodes(get_data?.data?.levelDetail);
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
                    <h2 className="inner-page-heading">User Genealogy</h2>
                    <div className=" shadow-box-main min-height-genealogy">
                      {nodes?.length > 0 && (
                        <Tree
                          data={hierarchicalData}
                          orientation="vertical"
                          separation={{ siblings: 1, nonSiblings: 1 }}
                          translate={{ x: 600, y: 50 }}
                          nodeSize={{ x: 200, y: 120 }}
                          pathFunc="step"
                          pathClassFunc={() => "custom-links"}
                          renderCustomNodeElement={renderRectSvgNode}
                          transitionDuration={500}
                          zoomable={true}
                          zoom="0.5"
                          collapsible={true}
                          centeringTransitionDuration={100}
                          rootNodeClassName="node__root"
                          branchNodeClassName="node__branch"
                          leafNodeClassName="node__leaf"
                        />
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

export default UserGenealogy;
