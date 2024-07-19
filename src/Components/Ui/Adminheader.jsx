import React from 'react'
import { Container, Navbar } from 'react-bootstrap';

export const Adminheader = () => {
  return (
    <>
      <header className="header-landing" id="headerId">
        <Navbar expand="lg" className="">
          <Container>
            <Navbar.Brand
              onClick={() => {
                navigate("/");
              }}
            >
              <h1>
                <img src="assets/img/Logo.png" alt="" /> Points
              </h1>
            </Navbar.Brand>
           
          </Container>
        </Navbar>
      </header>
    </>
  )
}
