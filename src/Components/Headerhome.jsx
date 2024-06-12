import React, { useEffect } from 'react'
import { Container, Nav, NavDropdown, Navbar } from 'react-bootstrap'

export const Headerhome = () => {

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
      <header className="header-landing home-header" id="headerId">
        <Navbar expand="lg" className="">
        <Container>
            <Navbar.Brand href="/"><h1><img src="assets/img/Logo.png" alt="" /> Foundation</h1></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="m-auto">
                    <NavDropdown title="Governance">
                        <NavDropdown.Item href="">Action</NavDropdown.Item>
                        <NavDropdown.Item href="">Something</NavDropdown.Item>
                        <NavDropdown.Item href="">Action</NavDropdown.Item>
                        <NavDropdown.Item href="">Something</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Economy">
                        <NavDropdown.Item href="">Action</NavDropdown.Item>
                        <NavDropdown.Item href="">Something</NavDropdown.Item>
                        <NavDropdown.Item href="">Action</NavDropdown.Item>
                        <NavDropdown.Item href="">Something</NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link href="">Bridge</Nav.Link>
                    <NavDropdown title="Developers">
                        <NavDropdown.Item href="">Action</NavDropdown.Item>
                        <NavDropdown.Item href="">Something</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="More">
                        <NavDropdown.Item href="">Action</NavDropdown.Item>
                        <NavDropdown.Item href="">Something</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                <Nav className="ms-auto social-links">
                    <Nav.Link href=""><img src="assets/img/twitter.png" alt="" /></Nav.Link>
                    <Nav.Link href=""><img src="assets/img/discord.png" alt="" /></Nav.Link>
                    <Nav.Link href=""><img src="assets/img/twitch.png" alt="" /></Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
      </header>
    </>
  )
}
