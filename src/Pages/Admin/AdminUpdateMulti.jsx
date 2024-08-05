import React, { useEffect, useState } from "react";
import { AdmindashHeader } from "../../Components/Ui/AdmindashHeader";
import { Col, Container, Dropdown, Form, Row } from "react-bootstrap";
import axiosMain from "../../http/axios/axios_main";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";

export const AdminUpdateMulti = () => {
  const { user } = useAuth();
  const [showValue, setShowValue] = useState(0);
  const [prvId, setPrvId] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [disable , setDisable] = useState(false)
  const getMultiplier = async () => {
    try {
      const getData = await axiosMain.get("/admin/get-base-multiplier", {
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${user.token}`,
        },
      });
      if (getData?.data?.status) {
        setShowValue(getData?.data?.data?.key_value);
        setPrvId(getData?.data?.data?._id);
      }
    } catch (err) {}
  };

  useEffect(() => {
    getMultiplier();
  }, []);

  const updateData = async () => {
    if (!inputValue || inputValue <= 0) {
      toast.warn("Please enter valid value");
    } else {
      setDisable(true)
      try {
        const update_data = await axiosMain.get(
          `admin/update-global-setup?global_setup_id=${prvId}&key_value=${inputValue}`,
          {
            headers: {
              "Content-Type": "application/json",
              authorization: `bearer ${user.token}`,
            },
          }
        );
        if (update_data?.data?.status) {
          setInputValue("")
          setDisable(false)
          toast.success("Value updated successfully");
          getMultiplier();
        }
      } catch (err) {
        setDisable(false)
        toast.error(err?.response?.data?.message);
      }
    }
  };
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
                      <p>Base % : <span>100%</span></p>
                      <p>Layer 1 %  : <span>100%</span></p>
                      <p>Layer 2 % : <span>1%</span></p>
                      <p>Layer 3 % : <span>1%</span></p>
                      <p>Layer 4 % : <span>1%</span></p>
                  </div>
                </Form.Group>
                <Row>
                  <Col lg={6}>
                    <Form.Group className="mb-3">
                    <Form.Label>Select Layer</Form.Label>
                    <Dropdown className="select-layer">
                      <Dropdown.Toggle>
                      Select Layer
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item href="">Layer 1</Dropdown.Item>
                        <Dropdown.Item href="">Layer 2</Dropdown.Item>
                        <Dropdown.Item href="">Layer 3</Dropdown.Item>
                        <Dropdown.Item href="">Layer 4</Dropdown.Item>
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
                    placeholder=""
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
