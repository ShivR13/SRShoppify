import { Button, Grid } from "@mui/material";
import React from "react";
import "./Landing.scss";
import Header1 from "../../../Images/header1.jpeg";
import Header2 from "../../../Images/header2.jpeg";
import { Container } from "react-bootstrap";

const Landing = () => {
  return (
    <Container className="ctr">
      <Grid container xs={12}>
        <Grid container item md={12} lg={7.5} sm={12} id="text-container">
          <div>
            <h1>
              Design Your<br></br> Comfort Zone
            </h1>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto,
              at sed omnis corporis doloremque possimus velit! Repudiandae nisi
              odit, aperiam odio ducimus, obcaecati libero et quia tempora
              excepturi quis alias?
            </p>
            <Button variant="contained" size="small">
              Shop Now
            </Button>
          </div>
        </Grid>
        <Grid container item md={12} lg={4.5} sm={12} id="img-ctr">
          <img className="main-img" src={Header1} />
          <div className="div"></div>
          <img className="img" src={Header2} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Landing;
