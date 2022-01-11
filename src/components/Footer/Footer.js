import React, { useEffect, useState } from "react";
import "./Footer.scss";
import { Grid } from "@mui/material";
const Footer = () => {
  const [state, setstate] = useState(null);
  useEffect(() => {
    const data = new Date();
    setstate(data.getFullYear());
  }, []);
  return (
    <Grid className="footer">
      <p>
        {/* &#128512;  */}© {state} <span>ShivR</span> 🙂 All rights reserved
      </p>
    </Grid>
  );
};

export default Footer;
