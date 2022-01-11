import React, { useEffect, useState } from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import "./Header.scss";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Button, IconButton, Badge } from "@mui/material";
import { Link } from "react-router-dom";

import { useAuth0 } from "@auth0/auth0-react";
import Avatar from "@mui/material/Avatar";
const Header = () => {
  const [activeLink, setActiveLink] = useState("Home");
  const { isLoading, isAuthenticated, error, user, loginWithRedirect, logout } =
    useAuth0();

  // useEffect(() => {
  //   alert("isLoading", isLoading);
  // }, [isLoading]);

  // useEffect(() => {
  //   alert("isAuthenticated", isAuthenticated);
  // }, [isAuthenticated]);

  // useEffect(() => {
  //   alert("error", error);
  // }, [error]);

  return (
    <Navbar bg="light" expand="lg" fixed="top" id="header">
      <Container>
        <Navbar.Brand id="heading" href="/">
          <span>SR</span> Shoppify
        </Navbar.Brand>
        <div id="Name">
          {/* <Nav className="me-0 ms-auto ms-s-3 float-right"> */}
          <Nav.Item>
            {isAuthenticated ? (
              <Avatar
                style={{
                  width: 35,
                  height: 35,
                  fontSize: "2em!important",
                  fontWeight: "500!important",
                }}
                alt={user && user.name}
                src={user && user.picture}
              />
            ) : (
              <Button onClick={() => loginWithRedirect()}>Login</Button>
            )}
          </Nav.Item>
          <Nav.Item>
            <IconButton>
              <Badge badgeContent={2} color="secondary">
                <ShoppingCartOutlinedIcon />
              </Badge>
            </IconButton>
          </Nav.Item>
        </div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" id="hamburger">
          <span>
            <MenuOutlinedIcon />
          </span>
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav" className="ms-auto">
          <Nav className="ms-auto ms-s-5 text-align-center">
            <Nav.Link
              onClick={() => setActiveLink("Home")}
              className={activeLink === "Home" && "active-link"}
              href="/"
            >
              Home
            </Nav.Link>
            <Nav.Link
              onClick={() => setActiveLink("Product")}
              className={activeLink === "Product" && "active-link"}
              href="/product"
            >
              Products
            </Nav.Link>
            <Nav.Link
              onClick={() => setActiveLink("About")}
              className={activeLink === "About" && "active-link"}
              href="/about"
            >
              About
            </Nav.Link>

            <Nav.Item>
              {isAuthenticated ? (
                <Avatar
                  style={{
                    width: 35,
                    height: 35,
                    fontSize: "2em!important",
                    fontWeight: "500!important",
                  }}
                  alt={user && user.name}
                  src={user && user.picture}
                />
              ) : (
                <Button onClick={() => loginWithRedirect()}>Login</Button>
              )}
            </Nav.Item>
          </Nav>
          <Nav.Item>
            <IconButton>
              <Badge badgeContent={2} color="secondary">
                <ShoppingCartOutlinedIcon />
              </Badge>
            </IconButton>
          </Nav.Item>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
