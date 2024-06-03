import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'

export const Header = () => {
  return (
    <>
      <header className="header-landing">
        <Navbar expand="lg" className="">
        <Container>
            <Navbar.Brand href="/"><h1><img src="assets/img/Logo.png" alt="" /> Points</h1></Navbar.Brand>
            <Nav.Link href="/"><img src="assets/img/arrow.png" alt="" /> Return to Foundation</Nav.Link>
        </Container>
        </Navbar>
      </header>
    </>
  )
}
