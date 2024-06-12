import React, { useEffect } from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'

export const Header = () => {

  const controlNavbar = () => {
    if (window.scrollY) {
      document.getElementById("headerId").classList.add("darker-header");
      //   HandleClass12();
    }
    if (window.scrollY == 0) {
      document.getElementById("headerId").classList.remove("darker-header");
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, []);

  return (
    <>
      <header className="header-landing" id="headerId">
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
