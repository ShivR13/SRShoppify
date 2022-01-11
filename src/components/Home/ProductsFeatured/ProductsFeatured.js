import { Box, Grid, Button, IconButton } from "@mui/material";
import React, { useState } from "react";
import { Container } from "react-bootstrap";
import "./Products.scss";
import header2 from "../../../Images/header2.jpeg";
import header1 from "../../../Images/header1.jpeg";

import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

const ProductsFeatured = () => {
  const [over, setOver] = useState(false);

  return (
    <Grid className="featured-container" p={10}>
      <div className="featured-heading">
        <h1>Featured Products</h1>
        <div></div>
      </div>
      <Grid container spacing={7} mt={2} mb={4}>
        <Grid container item lg={4} md={6} sm={6} className="product-container">
          <div
            className="img"
            onMouseOver={() => setOver(true)}
            onMouseOut={() => setOver(false)}
            style={{
              backgroundImage: over
                ? "linear-gradient(160deg, rgba(255,0,0,0),rgba(0,0,0,0.5) ),url(" +
                  header1 +
                  ")"
                : "url(" + header1 + ")",
            }}
          ></div>
          {over && (
            <IconButton
              onMouseOver={() => setOver(true)}
              onMouseOut={() => setOver(true)}
              onMouseDown={() => setOver(true)}
              onMouseEnter={() => setOver(true)}
              variant="contained"
              className="btn"
            >
              <SearchRoundedIcon />
            </IconButton>
          )}

          <div>
            <label>Entertainment Center</label>
            <label>$599.99</label>
          </div>
        </Grid>
        <Grid container item lg={4} md={6} sm={6} className="product-container">
          <div
            className="img"
            style={{
              backgroundImage: "url(" + header2 + ")",
            }}
          ></div>
          <Button variant="contained" className="btn">
            <SearchRoundedIcon />
          </Button>

          <div>
            <label>Entertainment Center</label>
            <label>$599.99</label>
          </div>
        </Grid>
        <Grid container item lg={4} md={6} sm={6} className="product-container">
          <div
            className="img"
            style={{
              backgroundImage: "url(" + header2 + ")",
            }}
          ></div>
          <IconButton variant="contained" className="btn">
            <SearchRoundedIcon />
          </IconButton>
          <div>
            <label>Entertainment Center</label>
            <label>$599.99</label>
          </div>{" "}
        </Grid>
      </Grid>
      <div className="btn-conatiner">
        <Button variant="contained" size="small">
          ALL Products
        </Button>
      </div>
    </Grid>
  );
};

export default ProductsFeatured;
