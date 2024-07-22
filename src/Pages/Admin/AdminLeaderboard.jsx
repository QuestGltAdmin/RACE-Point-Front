import React from 'react'
import { AdmindashHeader } from '../../Components/Ui/AdmindashHeader'
import { Col, Container, Row } from 'react-bootstrap'

export const AdminLeaderboard = () => {
  return (
    <>
    <div className="dashboard-layout">
       <AdmindashHeader/>
       <section className="outer-dash-section">
         <Container>
           <Row>
             <Col lg={12}>
               <div className="dashboard-white-box">
                 <div className="w-100">
                   <h2 className="inner-page-heading">Leaderboard</h2>

                   
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
