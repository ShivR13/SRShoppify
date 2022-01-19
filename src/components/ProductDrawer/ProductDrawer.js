import React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { useHistory } from "react-router-dom";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { Grid, IconButton } from "@mui/material";
import "./ProductDrawer.scss";
const ProductDrawer = (props) => {
  return (
    <SwipeableDrawer
      anchor="right"
      open={props.state}
      style={{ width: "500px!important" }}
    >
      <Box
        role="presentation"
        width={"100vw"}
        onClick={() => props.setState(false)}
        onKeyDown={() => props.setState(false)}
      >
        <IconButton onClick={() => props.setState(false)}>
          <CloseOutlinedIcon />
        </IconButton>
        <List>
          <Grid container>
            <Grid></Grid>
            <Grid>
              <h6>Name</h6>
              <p>brand</p>
              <div>
                <div>+1-</div>
                <label>$price</label>
              </div>
            </Grid>
          </Grid>
        </List>
      </Box>
    </SwipeableDrawer>
  );
};

export default ProductDrawer;
