import React, { useEffect, useState } from "react";
import { AdmindashHeader } from "../../Components/Ui/AdmindashHeader";
import { Col, Container, Form, Row } from "react-bootstrap";
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
            <Col lg={6} className="m-auto">
              <div className="form-box-multiplier">
                <Form.Group className="mb-3">
                  <Form.Label>Current Multiplier</Form.Label>
                  <Form.Control type="text" placeholder="" value={showValue} />
                </Form.Group>
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
                <button
                  className="common-btn bg-left"
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
