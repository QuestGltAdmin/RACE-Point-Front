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
                <NavDropdown title="Governance" >
                  <div className='common-dropdown'>
                    <NavDropdown.Item href="">
                      <div className='inner-dropdown'>
                        <img src="/assets/images/vHouse.png" className='img-fluid' alt="vhouse" />
                        <p>vHouse</p>
                      </div>
                    </NavDropdown.Item>
                    <NavDropdown.Item href="">
                      <div className='inner-dropdown'>
                        <img src="/assets/images/aHouse.png" className='img-fluid' alt="vhouse" />
                        <p>aHouse</p>
                      </div>
                    </NavDropdown.Item>
                    <NavDropdown.Item href="">
                      <div className='inner-dropdown'>
                        <img src="/assets/images/Committee.png" className='img-fluid' alt="vhouse" />
                        <p>Executive Council</p>
                      </div>
                    </NavDropdown.Item>
                  </div>
                </NavDropdown>
                <NavDropdown title="Economy"  >
                  <div className='common-dropdown'>
                    <NavDropdown.Item href="">
                      <div className='inner-dropdown'>
                        <img src="/assets/images/Community.png" className='img-fluid' alt="vhouse" />
                        <p>Community</p>
                      </div>
                    </NavDropdown.Item>
                    <NavDropdown.Item href="">
                      <div className='inner-dropdown'>
                        <img src="/assets/images/wallet.png" className='img-fluid' alt="vhouse" />
                        <p>RACE Wallet<br></br>
                          {/* (Coming Soon) */}
                        </p>
                      </div>
                    </NavDropdown.Item>
                  </div>
                </NavDropdown>
                <Nav.Link href="">Bridge</Nav.Link>
                <NavDropdown title="Developers"  >
                  <div className='common-dropdown'>
                    <NavDropdown.Item href="">
                      <div className='inner-dropdown'>
                        <img src="/assets/images/Document.png" className='img-fluid' alt="vhouse" />
                        <p>Documentation</p>
                      </div>
                    </NavDropdown.Item>
                    <NavDropdown.Item href="">
                      <div className='inner-dropdown'>
                        <img src="/assets/images/Cube.png" className='img-fluid' alt="vhouse" />
                        <p>Block Explorer
                          {/* (Coming Soon) */}
                        </p>
                      </div>
                    </NavDropdown.Item>
                    <NavDropdown.Item href="">
                      <div className='inner-dropdown'>
                        <img src="/assets/images/Status.png" className='img-fluid' alt="vhouse" />
                        <p>Status</p>
                      </div>
                    </NavDropdown.Item>
                    <NavDropdown.Item href="">
                      <div className='inner-dropdown'>
                        <img src="/assets/images/Bug.png" className='img-fluid' alt="vhouse" />
                        <p>Bug Bounty</p>
                      </div>
                    </NavDropdown.Item>
                    <NavDropdown.Item href="">
                      <div className='inner-dropdown'>
                        <img src="/assets/images/Github.png" className='img-fluid' alt="vhouse" />
                        <p>Github</p>
                      </div>
                    </NavDropdown.Item>
                  </div>
                </NavDropdown>
                <NavDropdown title="More"  >
                  <div className='common-dropdown'>
                    <NavDropdown.Item href="">
                      <div className='inner-dropdown'>
                        <img src="/assets/images/Globe.png" className='img-fluid' alt="vhouse" />
                        <p>Industry Adoption</p>
                      </div>
                    </NavDropdown.Item>
                    <NavDropdown.Item href="">
                      <div className='inner-dropdown'>
                        <img src="/assets/images/social-media.png" className='img-fluid' alt="vhouse" />
                        <p>Social Media
                          {/* (Coming Soon) */}
                        </p>
                      </div>
                    </NavDropdown.Item>
                    <NavDropdown.Item href="">
                      <div className='inner-dropdown'>
                        <img src="/assets/images/Team.png" className='img-fluid' alt="vhouse" />
                        <p>Team </p>
                      </div>
                    </NavDropdown.Item>
                    <NavDropdown.Item href="">
                      <div className='inner-dropdown'>
                        <img src="/assets/images/Security.png" className='img-fluid' alt="vhouse" />
                        <p>Security</p>
                      </div>
                    </NavDropdown.Item>
                    <NavDropdown.Item href="">
                      <div className='inner-dropdown'>
                        <img src="/assets/images/Chat.png" className='img-fluid' alt="vhouse" />
                        <p>Contact</p>
                      </div>
                    </NavDropdown.Item>
                  </div>
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
