import { Breadcrumbs, Grid } from "@mui/material";
import React, { useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import "./Breadcrums.scss";
const Breadcrums = (props) => {
  // const [path, name] = props;
  useEffect(() => {
    console.log(props, "props");
  }, []);
  return (
    <Grid container item lg={12} md={12} sm={12} p={2} className="bread-ctr">
      <Breadcrumbs>
        {JSON.stringify(props)}
        <Link href="/">Home</Link>
      </Breadcrumbs>
    </Grid>
  );
};

export default withRouter(Breadcrums);
