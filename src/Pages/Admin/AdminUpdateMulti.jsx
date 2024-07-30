import React from "react";
import { AdmindashHeader } from "../../Components/Ui/AdmindashHeader";
import { Col, Container, Form, Row } from "react-bootstrap";

export const AdminUpdateMulti = () => {
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
                    <Form.Control type="text" placeholder="" />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>New Multiplier</Form.Label>
                    <Form.Control type="text" placeholder="" />
                  </Form.Group>
                  <button className="common-btn bg-left">Update Multiplier</button>
                  </div>
               </Col>
            </Row>
         </Container>
      </div>
    </>
  );
};
