import React, { useEffect, useState } from "react";
import { AdmindashHeader } from "../../Components/Ui/AdmindashHeader";
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

export const AdminGenealogy = () => {
  const { user } = useAuth();
  const [nodes, setNodes] = useState([]);
  //   const orgChart = {
  //     name: "abc",
  //     email: "xyz",
  //     userName: "aas",
  //     attributes: {
  //       RefferalCode: "aaa",
  //     },
  //     children: nodes,
  //   };

  //   const renderTooltip = (props) => (
  //     <Tooltip id="button-tooltip" style={{ width: "400px" }} {...props}>
  //       Name : - {props.name} <br />
  //       Email : - {props.email}
  //     </Tooltip>
  //   );

  //   const renderRectSvgNode = ({ nodeDatum, toggleNode }) => {
  //     console.log(nodeDatum , toggleNode);
  //     return (
  //       <>
  //         {/* Root Node */}
  //         {nodeDatum.__rd3t.depth === 0 && (
  //           <OverlayTrigger
  //             placement="right"
  //             delay={{ show: 250, hide: 400 }}
  //             overlay={renderTooltip(nodeDatum)}
  //           >
  //             <g>
  //               <circle
  //                 className="node__root"
  //                 // width="40"
  //                 // height="40"
  //                 r="20"
  //                 x="-20"
  //                 strokeLinecap="round"
  //                 onClick={toggleNode}
  //               />
  //               <text fill="white" stroke="white" strokeWidth="0.5" x="30" y="20">
  //                 {nodeDatum.wallet_address}
  //               </text>
  //               {nodeDatum.attributes?.RefferalCode && (
  //                 <text fill="black" x="20" dy="20" strokeWidth="1">
  //                   Department: {nodeDatum.attributes?.RefferalCode}
  //                 </text>
  //               )}
  //             </g>
  //           </OverlayTrigger>
  //         )}

  //         {/* Branch Nodes */}
  //         {nodeDatum.__rd3t.depth !== 0 && nodeDatum.children && (
  //           <>
  //             <OverlayTrigger
  //               placement="right"
  //               delay={{ show: 250, hide: 400 }}
  //               overlay={renderTooltip(nodeDatum)}
  //             >
  //               <g>
  //                 <circle
  //                   className="node__branch"
  //                   // width="30"
  //                   // height="30"
  //                   r="15"
  //                   x="-15"
  //                 //   fill={nodeDatum?.attributes?.isPaidUser ? "green" : "red"}
  //                   // stroke={nodeDatum?.attributes?.isPaidUser?"green":"red"}
  //                   onClick={toggleNode}
  //                 />
  //                 <text
  //                   fill={"white"}
  //                   stroke={"white"}
  //                   strokeWidth="1"
  //                   x="25"
  //                   y="20"
  //                 >
  //                   {nodeDatum?.children?.wallet_address}
  //                 </text>
  //                 {nodeDatum.attributes?.RefferalCode && (
  //                   <text fill="black" x="20" dy="20" strokeWidth="1">
  //                     Department: {nodeDatum.attributes?.RefferalCode}
  //                   </text>
  //                 )}
  //               </g>
  //             </OverlayTrigger>
  //           </>
  //         )}
  //       </>
  //     );
  //   };

  
  const createHierarchy = (data) => {
      const levels = {};
      
      data.forEach((item) => {
          if (!levels[item.level_no]) {
              levels[item.level_no] = [];
            }
            levels[item.level_no].push(item);
        });
        
        const addChildNodes = (node, currentLevel) => {
            if (levels[currentLevel]) {
                node.children = levels[currentLevel].filter(
                    (child) => child.level_no === currentLevel
                );
                node.children.forEach((child) =>
                    addChildNodes(child, currentLevel + 1)
            );
        }
    };
    
    const root = { name: "Root", children: levels[1] || [] };
    root.children.forEach((child) => addChildNodes(child, 2));
    
    return root;
    
};
// if(nodes?.length > 0){

    const  hierarchicalData = createHierarchy(nodes);
// }
// useEffect(() => {
//     if (nodes?.length > 0) {
//         let hierarchicalData;
//       console.log(hierarchicalData);
//     }
//   }, [nodes]);
// console.log(hierarchicalData);
  const renderRectSvgNode = ({ nodeDatum }) => (
    <g>
      <circle r="15" />
      <text fill="white" strokeWidth="1" x="20">
        {nodeDatum.wallet_address?.replace(nodeDatum.wallet_address?.substring(5 , 37) , "...")}
      </text>
    </g>
  );
  //   const hierarchicalData = createHierarchy(data);
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const get_data = await axiosMain.get("/admin/get-team-genealogy", {
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${user.token}`,
        },
      });
      if (get_data?.data?.status) {
        console.log(get_data);
        setNodes(get_data?.data?.levelDetail);
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
                    <h2 className="inner-page-heading">User Genealogy</h2>
                    <div className=" shadow-box-main min-height-genealogy">
                      {nodes?.length > 0 && (
                        <Tree
                          // separation={{ siblings: 1, nonSiblings: 1 }}
                          // orientation={"vertical"}
                          // translate={{ x: 100, y: 350 }}
                          // data={orgChart}
                          // nodeSize={{ x: 200, y: 100 }}
                          // renderCustomNodeElement={renderRectSvgNode}
                          // pathClassFunc={() => "custom-links"}
                          // pathFunc={"step"}
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
