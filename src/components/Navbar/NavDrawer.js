import React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { useHistory } from "react-router-dom";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { Avatar, Divider, Grid, IconButton } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import "./NavDrawer.scss";

const NavDrawer = (props) => {
  const [state, setState] = React.useState(false);
  const user = useSelector((state) => state.user);
  const history = useHistory();

  return (
    <SwipeableDrawer
      anchor="right"
      open={props.state}
      style={{ width: "5%px!important" }}
    >
      <Box
        className="mobile-nav"
        width={"500px"}
        onClick={() => props.setState(false)}
        onKeyDown={() => props.setState(false)}
      >
        <IconButton onClick={() => props.setState(false)}>
          <CloseOutlinedIcon />
        </IconButton>
        <List>
          {user.email && (
            <div className="profile-ctr">
              <Avatar alt={user && user.name} src={user && user.name} />
              <div>
                <h6>{user.name}</h6>
                <p>
                  {user.email} <span>123456789</span>
                </p>
              </div>
            </div>
          )}
          <Divider />
          <ListItem id="mobile-link" button onClick={() => history.push("/")}>
            <ListItemText primary={"Home"} />
          </ListItem>
          <ListItem
            id="mobile-link"
            button
            onClick={() => history.push("/product")}
          >
            <ListItemText primary={"Product"} />
          </ListItem>
          <ListItem
            id="mobile-link"
            button
            onClick={() => history.push("/about")}
          >
            <ListItemText primary={"About"} />
          </ListItem>
          {user.email && (
            <ListItem
              id="mobile-link"
              button
              onClick={() => history.push("/about")}
            >
              <ListItemText primary={"Checkout"} />
            </ListItem>
          )}
          <Divider />
          <ListItem
            id="mobile-link"
            button
            onClick={() => history.push("/about")}
          >
            <ListItemText primary={user.email ? "Logout" : "Login"} />
          </ListItem>
        </List>
      </Box>
    </SwipeableDrawer>
  );
};

export default NavDrawer;
