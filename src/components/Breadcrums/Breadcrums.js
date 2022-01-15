import { makeStyles } from "@material-ui/styles";
import { Breadcrumbs, Container, Grid, Link, Typography } from "@mui/material";
import { fontSize, fontWeight } from "@mui/material/node_modules/@mui/system";
import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import "./Breadcrums.scss";
const Breadcrums = withRouter(({ history, ...props }) => {
  const { pathname } = history.location;
  const pathnames = pathname.split("/").filter((x) => x);
  console.log(pathnames, "ppp");
  useEffect(() => {
    console.log(props, history, "props");
    console.log(pathname, "path");
  });

  const x = makeStyles(() => ({
    sep: {
      "& .MuiBreadcrumbs-separator": {
        fontSize: "5rem!important",
        fontWeight: "700",
      },
    },
  }));
  const classes = x();
  return (
    <Grid container item lg={12} md={12} sm={12} className="bread-ctr">
      <Breadcrumbs>
        {JSON.stringify(props)}

        <Link underline="hover" color="inherit" href="/">
          <h4> Home</h4>
        </Link>
        {pathnames.map((x, i) => {
          return pathnames.length - 1 === i ? (
            <Typography color="text.primary">
              <h4>{x}</h4>
            </Typography>
          ) : (
            <Link underline="hover" color="inherit" href={`/${x}`}>
              <h4>{x}</h4>
            </Link>
          );
        })}
        {/* {pathnames.map((x, i) => (
          <label>
            {x}
            {i}
            {pathnames.length - 1 === i ? "shiv" : "BD"}
          </label>
        ))} */}
      </Breadcrumbs>
    </Grid>
  );
});

export default Breadcrums;
