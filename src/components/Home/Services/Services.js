import { Avatar, Grid, TextField, Button } from "@mui/material";
import React from "react";
import "./Services.scss";
import ApiOutlinedIcon from "@mui/icons-material/ApiOutlined";
import DiamondOutlinedIcon from "@mui/icons-material/DiamondOutlined";
import HistoryEduOutlinedIcon from "@mui/icons-material/HistoryEduOutlined";
const Services = () => {
  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3, lg: 4 }}
      p={5}
      mb={5}
      rowGap={4}
      className="services-ctr"
    >
      <Grid item lg={6} md={6} sm={12}>
        <h2>
          Custom Furniture
          <br></br>Built Only For You
        </h2>
      </Grid>
      <Grid item lg={6} md={6} sm={12}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe dolorum
        debitis consectetur reprehenderit non aliquam voluptates dolore aut vero
        consequuntur.
      </Grid>

      <Grid container item lg={4} sm={6} md={6} sx={12} pl={3} pr={3}>
        <div className="service-card">
          <Avatar id="avtr">
            <ApiOutlinedIcon />{" "}
          </Avatar>
          <h3>Mission</h3>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Voluptates, ea. Perferendis corrupti reiciendis nesciunt rerum velit
            autem unde numquam nisi
          </p>
        </div>
      </Grid>
      <Grid container item lg={4} sm={6} md={6} sx={12} pl={3} pr={3}>
        <div className="service-card">
          <Avatar id="avtr">
            <DiamondOutlinedIcon />{" "}
          </Avatar>
          <h3>Vision</h3>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Voluptates, ea. Perferendis corrupti reiciendis nesciunt rerum velit
            autem unde numquam nisi
          </p>
        </div>
      </Grid>
      <Grid container item lg={4} sm={6} md={6} sx={12} pl={3} pr={3}>
        <div className="service-card">
          <Avatar id="avtr">
            <HistoryEduOutlinedIcon />{" "}
          </Avatar>
          <h3>History</h3>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Voluptates, ea. Perferendis corrupti reiciendis nesciunt rerum velit
            autem unde numquam nisi
          </p>
        </div>
      </Grid>
    </Grid>
  );
};

export default Services;
