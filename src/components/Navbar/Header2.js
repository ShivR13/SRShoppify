import React, { useEffect, useState } from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import "./Header2.scss";
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
  Icon,
} from "@mui/material";
import { Link, useHistory } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Avatar from "@mui/material/Avatar";
import NavDrawer from "./NavDrawer";
import ProductDrawer from "../ProductDrawer/ProductDrawer";
import { userAction } from "../../Store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { loadCart } from "../../Store/cartSlice";

const Header2 = () => {
  const [drawer, setDrawer] = useState(false);
  const [drawerProduct, setDrawerProduct] = useState();
  const cart = useSelector((state) => state.cart.cart);
  const history = useHistory();
  const { isLoading, isAuthenticated, error, user, loginWithRedirect, logout } =
    useAuth0();
  const dispatch = useDispatch();
  const localuser = useSelector((state) => state.user);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const userLogin = () => {
    loginWithRedirect();
    if (isLoading) {
      console.log("isloading");
    } else {
      if (user) {
        console.log("user", user);
      }
      if (error) {
        console.log("error", error);
      }
    }
  };

  useEffect(() => {
    const auth = user && Object.keys(user).length > 0 ? true : false;
    if (auth) {
      dispatch(userAction.logIn(user));
      dispatch(loadCart(user.email));
    } else {
      dispatch(userAction.logOut());
    }
  }, [user]);

  const userLogout = () => {
    logout();
    if (isLoading) {
      console.log("isloading");
    } else {
      if (user) {
        console.log("user", user);
      }
      if (error) {
        console.log("error", error);
      }
    }
  };

  return (
    <nav id="nav-ctr">
      <div id="heading">
        <span>SR</span> Shoppify
      </div>
      <ul className="link-ctr">
        <li className="link-li">
          <a href="/">Home</a>
        </li>
        <li className="link-li">
          <a href="/about">About</a>
        </li>
        <li className="link-li">
          <a href="/product"> Products</a>
        </li>
        <li>
          {isAuthenticated ? (
            <Avatar
              style={{
                width: 30,
                height: 30,
                fontSize: "2em!important",
                fontWeight: "500!important",
              }}
              alt={user && user.name}
              src={user && user.name}
              onClick={handleClick}
            />
          ) : (
            <Button onClick={() => userLogin()}>Login</Button>
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
              <Avatar
                sizes="small"
                alt={localuser && localuser.name}
                src={localuser && localuser.name}
              />
              <Grid p={2}>
                <Typography variant="inherit" noWrap fontSize="1rem">
                  {localuser && localuser.name}
                </Typography>
                <Typography variant="inherit" noWrap fontSize="0.87rem">
                  {localuser && localuser.email}
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
            <MenuItem
              onClick={() => userLogout()}
              style={{ display: "block", padding: "0 0.5rem" }}
            >
              Logout
            </MenuItem>
          </Menu>
        </li>
        <li>
          <IconButton size="small" onClick={() => history.push("/cart")}>
            <Badge badgeContent={cart && cart.length} color="secondary">
              <ShoppingCartOutlinedIcon />
            </Badge>
          </IconButton>
        </li>
        <li id="hamburger">
          <IconButton size="small" onClick={() => setDrawer(true)}>
            <MenuOutlinedIcon />
          </IconButton>
        </li>
      </ul>
      <NavDrawer state={drawer} setState={setDrawer} />
      <ProductDrawer state={drawerProduct} setState={setDrawerProduct} />
    </nav>
  );
};

export default Header2;
