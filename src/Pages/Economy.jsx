import React from "react";
import { Headerhome } from "../Components/Headerhome";
import { Footer } from "../Components/Footer";
import { Col, Container, InputGroup, Row, Form } from "react-bootstrap";

const Economy = () => {
  return (
    <>
      <Headerhome />
      <section className="race-banner-sec economy-banner">
        <Container>
          <Row className="align-items-center">
            <Col xl={4} lg={6} md={6}>
              <div className="banner-content">
                <h2 className="common-heading">Meet the RACE Smart Wallet</h2>
                <p>
                  Your Gateway to blockchain-powered Investments. Coming soon.
                </p>
                <div className="button-store">
                  <button>
                    <img
                      src="/assets/images/app-store.png"
                      className="img-fluid"
                      alt="app-store"
                    />
                  </button>
                  <button>
                    <img
                      src="/assets/images/google-play.png"
                      className="img-fluid"
                      alt="play-store"
                    />
                  </button>
                </div>
                {/* <button className="gradient-border-btn"><span><img src="assets/img/linear_scale.png" alt="" /> Bridge to RACE</span></button> */}
              </div>
            </Col>
          </Row>
        </Container>
        <div className="banner-img text-end">
          <img src="assets/images/economy-mobile.png" alt="mobile" />
        </div>
        <Container>
          <div className="detailed-content">
            <Row>
              <Col lg="4" md="4">
                <div className="economy-box">
                  <div className="icon-white">
                    <img
                      src="assets/images/home.png"
                      className="img-fluid"
                      alt="house"
                    />
                  </div>
                  <div>
                    <h4>Unlock the world of Real Assets Globally</h4>
                    <p>
                      Dive into a seamless experience of owning a part of the
                      world's premium assets. Start investing with just a few
                      taps.
                    </p>
                  </div>
                </div>
              </Col>
              <Col lg="4" md="4">
                <div className="economy-box">
                  <div className="icon-white">
                    <img
                      src="assets/images/abstraction.png"
                      className="img-fluid"
                      alt="house"
                    />
                  </div>
                  <div>
                    <h4>Account Abstraction</h4>
                    <p>
                      Say goodbye to barriers. Our Smart Wallet makes Asset
                      Investments as easy as online shopping- Accessible, Quick
                      and Secure.
                    </p>
                  </div>
                </div>
              </Col>
              <Col lg="4" md="4">
                <div className="economy-box">
                  <div className="icon-white">
                    <img
                      src="assets/images/swap-exchange.png"
                      className="img-fluid"
                      alt="house"
                    />
                  </div>
                  <div>
                    <h4>Your Portfolio, Multi-chain & Global</h4>
                    <p>
                      Embrace the new reality, Compliant & Global. Find the best
                      Deals across the world.
                    </p>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </section>

      <section className="next-generation-sec" id="community">
        <Container>
          <Row className="justify-content-center">
            <div className="text-center">
              <h3 className="economy-common-heading">
                Designed for the next generation of asset management
              </h3>
              <Row className="justify-content-center">
                <Col lg="8">
                  <p className="economy-common-para">
                    At RACE Smart Wallet, we prioritize accessibility and
                    security, ensuring your journey through the blockchain world
                    is effortless and worry-free. Here's what sets us apart:
                  </p>
                </Col>
              </Row>
            </div>
          </Row>
          <Row className="justify-content-center">
            <Col lg="4" md="6" className="margin-set responsive-none"></Col>
            <Col lg="4" md="6" className="bordered margin-set">
              <div className="next-gen-box ">
                <img
                  src="/assets/images/fingerprint.png"
                  className="img-fluid"
                  alt="fingerprint"
                />
                <div>
                  <h4 className="economy-common-heading">
                    Familiar, Secure Login
                  </h4>
                  <p className="economy-common-para">
                    Easily sign up or log in using your existing web2
                    credentials. No complex procedures, just seamless access to
                    your digital assets.
                  </p>
                </div>
              </div>
            </Col>
            <Col lg="4" md="6" className="margin-set responsive-none"></Col>
            <Col lg="4" md="6" className="margin-set">
              <div className="next-gen-box ">
                <img
                  src="/assets/images/seedless.png"
                  className="img-fluid"
                  alt="fingerprint"
                />
                <div>
                  <h4 className="economy-common-heading">
                    Seedless Experience
                  </h4>
                  <p className="economy-common-para">
                    Enjoy top-notch cryptography that offers a seedless
                    experience. No more worries about remembering complex seed
                    phrases—recover access with multi-factor authentication
                    effortlessly.
                  </p>
                </div>
              </div>
            </Col>
            <Col lg="4" md="6" className="bordered margin-set">
              <div className="next-gen-box ">
                <img
                  src="/assets/images/gas-abstract.png"
                  className="img-fluid"
                  alt="fingerprint"
                />
                <div>
                  <h4 className="economy-common-heading">Gas Abstraction</h4>
                  <p className="economy-common-para">
                    Pay gas fees in any currency, Our Account kit eliminates the
                    barrier to entry, making transactions smoother and more
                    cost-effective.
                  </p>
                </div>
              </div>
            </Col>
            <Col lg="4" md="6" className="margin-set">
              <div className="next-gen-box ">
                <img
                  src="/assets/images/batch.png"
                  className="img-fluid"
                  alt="fingerprint"
                />
                <div>
                  <h4 className="economy-common-heading">Batch Transactions</h4>
                  <p className="economy-common-para">
                    Complex operations made simple. For Instance, on DEXes,
                    combine approval and swap transactions seamlessly in one
                    click
                  </p>
                </div>
              </div>
            </Col>
            <Col lg="4" md="6" className="margin-set">
              <div className="next-gen-box ">
                <img
                  src="/assets/images/marketplace.png"
                  className="img-fluid"
                  alt="fingerprint"
                />
                <div>
                  <h4 className="economy-common-heading">
                    Explore the Marketplace
                  </h4>
                  <p className="economy-common-para">
                    Discover a comprehensive range of top-tier real-world assets
                    across various blockchains, all conveniently accessible
                    within our app.
                  </p>
                </div>
              </div>
            </Col>

            <Col lg="4" md="6" className="bordered margin-set">
              <div className="next-gen-box ">
                <img
                  src="/assets/images/on-ramp.png"
                  className="img-fluid"
                  alt="fingerprint"
                />
                <div>
                  <h4 className="economy-common-heading">On-Ramp & Off-Ramp</h4>
                  <p className="economy-common-para">
                    Effortlessly move stablecoins between chains at the cheapest
                    and fastest rates, ensuring smooth transitions.
                  </p>
                </div>
              </div>
            </Col>
            <Col lg="4" md="6" className="margin-set">
              <div className="next-gen-box ">
                <img
                  src="/assets/images/decentralised.png"
                  className="img-fluid"
                  alt="fingerprint"
                />
                <div>
                  <h4 className="economy-common-heading">
                    Decentralized Private Advisors
                  </h4>
                  <p className="economy-common-para">
                    Need help navigating the blockchain space? Access to our
                    network of Decentralized Private Licensed Advisors Globally.
                    Assisting you through your whole journey.
                  </p>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <div className="join-link">
              <a className="">
                Be the first to experience the RACE app. Join the waitlist{" "}
                <span>
                  <img
                    src="/assets/images/chevron-right.png"
                    className="img-fluid"
                    alt="arrow"
                  />
                </span>
              </a>
            </div>
          </Row>
        </Container>
      </section>

      <section className="blockchain-section" id="wallet">
        <Container>
          <Row>
            <Col md="6">
              <div className="content-block">
                <div className="cellphone-image">
                  <img
                    src="/assets/images/ios.png"
                    className="img-fluid"
                    alt="ios"
                  />
                  <img
                    src="/assets/images/android.png"
                    className="img-fluid"
                    alt="ios"
                  />
                </div>
                <div>
                  <h3 className="economy-common-heading">
                    Your blockchain journey starts <span> here</span>.
                  </h3>
                  <p className="economy-common-para">
                    Embark on a hassle-free adventure into the world of digital
                    assets with RACE Smart Wallet.
                  </p>
                </div>
                <ul>
                  <li>
                    <img
                      src="/assets/images/IconShapes.svg"
                      className="img-fluid"
                      alt="list"
                    />
                    <p className="economy-common-para">
                      No tech jargon or complex procedures. Sign up or log in
                      using your familiar credentials. Our priority? Your ease
                      of use.
                    </p>
                  </li>
                  <li>
                    <img
                      src="/assets/images/IconShapes.svg"
                      className="img-fluid"
                      alt="list"
                    />
                    <p className="economy-common-para">
                      No More Confusing Transaction. Swap, approve—all in a
                      breeze, without worrying about technicalities.
                    </p>
                  </li>
                  <li>
                    <img
                      src="/assets/images/IconShapes.svg"
                      className="img-fluid"
                      alt="list"
                    />
                    <p className="economy-common-para">
                      Decentralized Private Advisors at your service. We guide
                      you through every step
                    </p>
                  </li>
                </ul>
                <div className="button-store">
                  <button>
                    <img
                      src="/assets/images/app-store.png"
                      className="img-fluid"
                      alt="app-store"
                    />
                  </button>
                  <button>
                    <img
                      src="/assets/images/google-play.png"
                      className="img-fluid"
                      alt="play-store"
                    />
                  </button>
                </div>
              </div>
            </Col>
            <Col md="6">
              <div className="">
                <img
                  src="/assets/images/blockchain-phone.png"
                  className="img-fluid"
                  alt=" mobile"
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <Footer />
    </>
  );
};

export default Economy;
