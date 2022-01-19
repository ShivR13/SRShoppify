import React, { useEffect, useState } from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import "./Header.scss";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import {
  Button,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Divider,
  Typography,
  Grid,
} from "@mui/material";
import { Link } from "react-router-dom";

import { useAuth0 } from "@auth0/auth0-react";
import Avatar from "@mui/material/Avatar";
const Header = () => {
  const [activeLink, setActiveLink] = useState("Home");
  const { isLoading, isAuthenticated, error, user, loginWithRedirect, logout } =
    useAuth0();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
    <Navbar
      style={{ padding: "0" }}
      bg="light"
      expand="lg"
      fixed="top"
      id="header"
      style={{ backgroundColor: "green" }}
    >
      {/* <Container style={{ padding: "0" }}> */}
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
              onClick={handleClick}
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

          <Nav.Item className="close-on-collapse">
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
                onClick={handleClick}
              />
            ) : (
              <Button onClick={() => loginWithRedirect()}>Login</Button>
            )}
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  padding: "0 1rem",
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem style={{ padding: "0 0.5rem", pointer: "none" }}>
                <Avatar sizes="small" />
                <Grid p={2}>
                  <Typography variant="inherit" noWrap fontSize="1rem">
                    {user && user.name}
                  </Typography>
                  <Typography variant="inherit" noWrap fontSize="0.87rem">
                    {user && user.email}
                  </Typography>
                </Grid>
              </MenuItem>
              <Divider />
              {/* <MenuItem style={{ display: "block", padding: "0 0.5rem" }}>
                  My Orders
                </MenuItem>
                <MenuItem style={{ display: "block", padding: "0 0.5rem" }}>
                  Wish List
                </MenuItem> */}
              <MenuItem style={{ display: "block", padding: "0 0.5rem" }}>
                Logout
              </MenuItem>
            </Menu>
          </Nav.Item>
        </Nav>
        <Nav.Item className="close-on-collapse">
          <IconButton>
            <Badge badgeContent={2} color="secondary">
              <ShoppingCartOutlinedIcon />
            </Badge>
          </IconButton>
        </Nav.Item>
      </Navbar.Collapse>
      {/* </Container> */}
    </Navbar>
  );
};

export default Header;
