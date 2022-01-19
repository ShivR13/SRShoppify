import React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { useHistory } from "react-router-dom";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { IconButton } from "@mui/material";
const NavDrawer = (props) => {
  const [state, setState] = React.useState(false);
  const history = useHistory();

  return (
    <SwipeableDrawer
      anchor="right"
      open={props.state}
      style={{ width: "5%px!important" }}
    >
      <Box
        role="presentation"
        width={"500px"}
        onClick={() => props.setState(false)}
        onKeyDown={() => props.setState(false)}
      >
        <IconButton onClick={() => props.setState(false)}>
          <CloseOutlinedIcon />
        </IconButton>
        <List>
          <ListItem button onClick={() => history.push("/")}>
            <ListItemText primary={"Home"} />
          </ListItem>
          <ListItem button onClick={() => history.push("/product")}>
            <ListItemText primary={"Product"} />
          </ListItem>
          <ListItem button onClick={() => history.push("/about")}>
            <ListItemText primary={"About"} />
          </ListItem>
        </List>
      </Box>
    </SwipeableDrawer>
  );
};

export default NavDrawer;
