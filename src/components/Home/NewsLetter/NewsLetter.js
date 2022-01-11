import { Grid, TextField, Button } from "@mui/material";
import React from "react";
import "./NewsLetter.scss";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";

const NewsLetter = () => {
  return (
    <Grid container p={5} className="sub-ctr">
      <Grid lg={12} sx={12}>
        <h3>Join our newsletter and get 20% off</h3>
      </Grid>
      <Grid lg={7} md={7} sx={12} pt={3}>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat sint
          unde quaerat ratione soluta veniam provident adipisci cumque eveniet
          tempore?
        </p>
      </Grid>
      <Grid lg={5} md={5} sx={4} pr={3} pt={3}>
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          label="Enter email..."
          InputProps={{
            endAdornment: (
              //   <Button variant="contained" size="small">
              //     search
              //   </Button>
              <EmailOutlinedIcon />
            ),
          }}
        />
      </Grid>
    </Grid>
  );
};

export default NewsLetter;
