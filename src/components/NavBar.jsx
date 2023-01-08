import React, { useState } from "react";
import { Container, Navbar, Nav, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Cart from "./Cart";
import shoppingcart from "../images/shoppingcart.png";
import "../styles/productCard.css";

const NavBar = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const token = localStorage.getItem("token");

  const handleClose = () => setShow(false);
  const handleShow = () => {
    if (token) {
      setShow(true);
    } else {
      navigate("/login");
    }
  };

  const logout = () => {
    localStorage.setItem("token", "");
    navigate("/login");
  };

  return (
    <>
      <Navbar
        expand="lg"
        style={{
          background: "linear-gradient(to right, #1a2980, #26d0ce)",
          padding: "0",
          height: "5rem",
        }}
      >
        <Container>
          <Navbar.Brand
            style={{
              color: "#fefefe",
              marginTop: "3.5rem",
              fontSize: "1.8rem",
            }}
            href="#/"
          >
            eCommerce
          </Navbar.Brand>
          <Navbar.Toggle
            style={{ color: "#fefefe" }}
            aria-controls="basic-navbar-nav"
          />
          <Navbar.Collapse style={{ color: "#fefefe" }} id="basic-navbar-nav">
            <Nav className="me-auto" style={{ marginTop: "4rem" }}>
              <Nav.Link style={{ color: "#fefefe" }} href="/#/">
                Home
              </Nav.Link>
              <Nav.Link style={{ color: "#fefefe" }} href="/#/purchases">
                Purchases
              </Nav.Link>
              {token ? (
                <Nav.Link
                  style={{
                    marginLeft: ".5rem",
                    marginTop: "-.3rem",
                    height: "3rem",
                    width: "5rem",
                    background: "transparent",
                    border: "0",
                    color: "#fff",
                  }}
                  as={Button}
                  onClick={logout}
                >
                  Log out
                </Nav.Link>
              ) : (
                <Nav.Link href="/#/login">Login </Nav.Link>
              )}
              <Button
                style={{
                  marginLeft: "50rem",
                  marginTop: "-.5rem",
                  background: "transparent",
                  border: "0",
                }}
                onClick={handleShow}
              >
                <i className="fa-solid fa-cart-arrow-down"></i>
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Cart show={show} handleClose={handleClose} />
    </>
  );
};

export default NavBar;
