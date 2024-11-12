import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

const TopNavbar = () => {
  return (
    <Navbar
      bg="light"
      data-bs-theme="light"
      sticky="top"
      style={{ boxShadow: "rgba(0, 0, 0, 0.4) 0px 30px 90px" }}
    >
      <Container>
        <Navbar.Brand as={Link} to={"/"} className="fw-bold fs-5">
          <img
            src="/public/image/logo.png"
            alt="Logo"
            style={{ width: "90px", marginRight: "10px" }}
          />
          BOOKHUB
        </Navbar.Brand>
        <Nav className="ms-auto">
          <Nav.Link as={Link} to={"/"} className="fw-bold fs-5">
            Home
          </Nav.Link>
          <Nav.Link as={Link} to={"/about"} className="fw-bold fs-5">
            About
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default TopNavbar;
