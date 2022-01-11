import {
  Container,
  Grid,
  Button,
  TextField,
  Select,
  MenuItem,
  IconButton,
  Divider,
} from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import "./Product.scss";
import Slider from "@mui/material/Slider";
import useStyles from "./Inputstyles";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import Breadcrums from "../Breadcrums/Breadcrums";
import { Checkbox } from "@material-ui/core";
const Product = () => {
  const [category, setCategory] = useState([]);
  const [company, setCompany] = useState([]);
  const [colors, setColors] = useState([]);
  const [price, setPrice] = useState([]);
  const [data, setData] = useState([]);
  const classes = useStyles();
  const [over, setOver] = useState(false);
  const [grid, setGrid] = useState(true);
  useEffect(async () => {
    console.log("hiiii");
    const res = await axios.get("http://localhost:3004/products");
    console.log(res.data, "data");
    setData(res.data);

    const cm = await res.data
      .map((item) => item.company)
      .filter((it, i, data) => data.indexOf(it) === i); //company

    const ct = await res.data
      .map((item) => item.category)
      .filter((it, i, data) => data.indexOf(it) === i); //caterory

    const cr = await res.data.map((item) => item.colors);
    //   .filter((it, i, data) => data.indexOf(it) === i); //color
    var newArray = Array.prototype.concat.apply([], cr);
    const cr2 = newArray.filter((it, i, data) => data.indexOf(it) === i);
    console.log("new cr", cr, newArray, cr2);

    const pr = await res.data
      .map((item) => item.price)
      .filter((it, i, data) => data.indexOf(it) === i); //price
    setPrice(pr);
    setCategory(ct);
    setCompany(cm);
    setColors(cr2);
  }, []);
  return (
    <Container className="product-ctr">
      <Breadcrums />
      <Grid
        container
        lg={12}
        md={12}
        sm={12}
        // columnSpacing={{ xs: 2, sm: 3, md: 6 }}
      >
        <Grid container item lg={2} md={3} sm={3} className="filter-col">
          <div className="filter-card">
            <TextField
              fullWidth
              size="small"
              variant="outlined"
              label="Search.."
              InputLabelProps={{
                classes: {
                  root: classes.textFieldLabel,
                  focused: classes.textFieldLabelFocused,
                },
              }}
              InputProps={{
                classes: {
                  root: classes.textFieldRoot,
                  focused: classes.textFieldFocused,
                  notchedOutline: classes.textFieldNotchedOutline,
                },
              }}
            />
          </div>
          <div className="filter-card">
            <h5>Category</h5>
            <button>All</button>
            {category &&
              category.length > 0 &&
              category.map((x) => <button size="small">{x}</button>)}
          </div>
          <div className="filter-card">
            <h5>Company</h5>
            {
              company && company.length > 0 && (
                <Select
                  variant="outlined"
                  size="small"
                  // value={age}
                  // label="Age"
                  // onChange={handleChange}
                  // className={classes.rootSelect}
                  // InputProps={{
                  // className={classes.nativeSelect}
                  classes={{
                    select: classes.selectRoot,
                    outlined: {},
                    // notchedOutline: classes.textFieldNotchedOutline,
                  }}
                  // }}
                >
                  <MenuItem value={0}>All</MenuItem>
                  {company.map((x) => (
                    <MenuItem value={20}>{x}</MenuItem>
                  ))}
                </Select>
              )
              //   company.map((x) => <button>{x}</button>)
            }
          </div>
          <div className="filter-card">
            <h5>Colors</h5>
            <div className="color-btn">
              <button>All</button>
              {colors &&
                colors.length > 0 &&
                colors.map((x) => (
                  <button
                    className="button"
                    style={{ backgroundColor: x }}
                    size="small"
                  ></button>
                ))}
            </div>
          </div>
          <div className="filter-card">
            <h5>Price</h5>
            {price && (
              <Slider
                // size="medium"
                sx={{ width: "5em" }}
                defaultValue={Math.min(price)}
                valueLabelDisplay="auto"
                min={0}
                max={price.sort((x, y) => (x < y ? 1 : -1))[0]}
              />
            )}
          </div>
          <div className="filter-card">
            <label>Free Shipping</label>
            <Checkbox size="small" color="primary" />
          </div>
          <div className="filter-card">
            <Button variant="contained" size="small" id="btn">
              Clear Filter
            </Button>
          </div>
        </Grid>
        <Grid container item lg={10} md={9} sm={9}>
          <Grid container item className="menu-ctr" lg={12} md={12} sm={12}>
            <div>
              <IconButton
                size="small"
                disabled={grid === true ? true : false}
                onClick={() => setGrid(true)}
              >
                <GridViewOutlinedIcon />
              </IconButton>
              <IconButton
                size="small"
                disabled={grid !== true ? true : false}
                onClick={() => setGrid(false)}
              >
                <MenuOutlinedIcon />
              </IconButton>
            </div>
            <p>{data && data.length} Products Found</p>
            <hr></hr>
            <div>
              Sort By
              <Select size="small">
                <MenuItem selected value={0}>
                  Price (Lowest)
                </MenuItem>
                <MenuItem value={0}>Price (Highest)</MenuItem>
                <MenuItem value={0}>Name (A-Z)</MenuItem>
                <MenuItem value={0}>Name (Z-A)</MenuItem>
              </Select>
            </div>
          </Grid>
          <Grid container item lg={12} md={12} sm={12} spacing={3} pl={2}>
            {grid === true
              ? data.map((x, i) => (
                  <Grid
                    container
                    item
                    lg={4}
                    md={6}
                    sm={12}
                    key={x.id}
                    className="product-container"
                  >
                    <div
                      id="prod-ctr"
                      className="img"
                      onMouseOver={() => setOver(x.id)}
                      onMouseOut={() => setOver(false)}
                      style={{
                        backgroundImage:
                          over === x.id
                            ? "linear-gradient(160deg, rgba(255,0,0,0),rgba(0,0,0,0.5) ),url(" +
                              x.image +
                              ")"
                            : "url(" + x.image + ")",
                      }}
                    ></div>
                    {over === x.id && (
                      <IconButton
                        onMouseOver={() => setOver(x.id)}
                        onMouseOut={() => setOver(x.id)}
                        onMouseDown={() => setOver(x.id)}
                        onMouseEnter={() => setOver(x.id)}
                        variant="contained"
                        className="btn"
                      >
                        <SearchRoundedIcon />
                      </IconButton>
                    )}

                    <div>
                      <label>{x.name}</label>
                      <label>${x.price}</label>
                    </div>
                  </Grid>
                ))
              : data.map((x) => (
                  <Grid
                    container
                    item
                    lg={12}
                    md={12}
                    sm={12}
                    className="list-ctr"
                  >
                    <Grid
                      item
                      lg={4}
                      md={4}
                      sm={12}
                      style={{ backgroundImage: "url(" + x.image + ")" }}
                    ></Grid>
                    <Grid container item lg={8} md={8} sm={12} pl={4} pr={4}>
                      <h4>{x.name}</h4>
                      <h5>${x.price}</h5>
                      <br></br>
                      <p>{x.description}</p>
                      <Button id="btn">Details</Button>
                    </Grid>
                  </Grid>
                ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default withRouter(Product);
