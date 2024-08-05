import React, { useEffect, useState } from "react";
import { AdmindashHeader } from "../../Components/Ui/AdmindashHeader";
import { Col, Container, Dropdown, Form, Row } from "react-bootstrap";
import axiosMain from "../../http/axios/axios_main";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";

export const AdminUpdateMulti = () => {
  const { user } = useAuth();
  const [showValue, setShowValue] = useState([]);
  const [prvId, setPrvId] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [disable, setDisable] = useState(false);
  const getMultiplier = async () => {
    try {
      const getData = await axiosMain.get("/admin/get-all-multiplier", {
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

  const updateData = async () => {
    if (prvId == "") {
      toast.warn("Please select first");
    } else if (!inputValue || inputValue <= 0) {
      toast.warn("Please enter valid value");
    } else {
      setDisable(true);
      try {
        const update_data = await axiosMain.get(
          `admin/update-global-setup?global_setup_id=${prvId?._id}&key_value=${inputValue}`,
          {
            headers: {
              "Content-Type": "application/json",
              authorization: `bearer ${user.token}`,
            },
          }
        );
        if (update_data?.data?.status) {
          setPrvId("")
          setInputValue("");
          setDisable(false);
          toast.success("Value updated successfully");
          getMultiplier();
        }
      } catch (err) {
        setDisable(false);
        toast.error(err?.response?.data?.message);
      }
    }
  };
  console.log(prvId);

  return (
    <>
      <div className="dashboard-layout">
        <AdmindashHeader />
        <Container>
          <Row>
            <Col xl={6} lg={8} className="m-auto">
              <div className="form-box-multiplier">
                <Form.Group className="mb-3">
                  <Form.Label>Multiplier Update Percentage</Form.Label>
                  <div className="layer-outer-display">
                    {showValue?.length > 0
                      ? showValue?.map((items, index) => {
                          return (
                            <p>
                              {items?.key_title?.slice(0, -10)} X :{" "}
                              <span>{(items?.key_value * 1).toFixed(2)}X</span>
                            </p>
                          );
                        })
                      : ""}
                    {/* <p>Layer 1 X  : <span>100X</span></p>
                      <p>Layer 2 X : <span>1X</span></p>
                      <p>Layer 3 X : <span>1X</span></p>
                      <p>Layer 4 X : <span>1X</span></p> */}
                  </div>
                </Form.Group>
                <Row>
                  <Col lg={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Select Layer</Form.Label>
                      <Dropdown
                        className="select-layer"
                        onSelect={(e) => {
                          setPrvId(JSON.parse(e));
                        }}
                      >
                        <Dropdown.Toggle>{prvId == "" ? "Select Layer" : prvId?.key_title.slice(0 , -10)}</Dropdown.Toggle>

                        <Dropdown.Menu>
                          {showValue?.length > 0
                            ? showValue?.map((items, index) => {
                                return (
                                  <Dropdown.Item
                                    eventKey={JSON.stringify(items)}
                                  >
                                    {items?.key_title?.slice(0, -10)} X
                                  </Dropdown.Item>
                                );
                              })
                            : ""}
                          {/* <Dropdown.Item href="">Layer 2</Dropdown.Item>
                          <Dropdown.Item href="">Layer 3</Dropdown.Item>
                          <Dropdown.Item href="">Layer 4</Dropdown.Item> */}
                        </Dropdown.Menu>
                      </Dropdown>
                      {/* <Form.Control type="text" placeholder="" value={showValue} /> */}
                    </Form.Group>
                  </Col>
                  <Col lg={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>New Multiplier</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder={
                          prvId == ""
                            ? "Please select"
                            : prvId?.key_name == "base_percentage"
                            ? "update Base X value"
                            : prvId?.key_name == "layer_1_percentage"
                            ? "update Layer 1 X value"
                            : prvId?.key_name == "layer_2_percentage"
                            ? "update Layer 2 X value"
                            : prvId?.key_name == "layer_3_percentage"
                            ? "update Layer 3 X value"
                            : "update Layer 4 X value"
                        }
                        name="inputValue"
                        onChange={(e) => {
                          setInputValue(e.target.value);
                        }}
                        value={inputValue}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <button
                  className="common-btn bg-left w-100"
                  onClick={() => {
                    updateData();
                  }}
                  disabled={disable}
                >
                  {disable ? "Processing" : "Update Multiplier"}
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};
