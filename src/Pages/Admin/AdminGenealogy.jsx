import React from "react";
import { AdmindashHeader } from "../../Components/Ui/AdmindashHeader";
import { Col, Container, Form, InputGroup, Modal, Row } from "react-bootstrap";

export const AdminGenealogy = () => {
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
                                        <div className=" shadow-box-main">

                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>
            </div>

        </>
    )
}
