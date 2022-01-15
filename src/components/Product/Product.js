import {
  Container,
  Grid,
  Button,
  TextField,
  Select,
  MenuItem,
  IconButton,
  Divider,
  Collapse,
} from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { withRouter, useHistory } from "react-router-dom";
import "./Product.scss";
import Slider from "@mui/material/Slider";
import useStyles from "./Inputstyles";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import Breadcrums from "../Breadcrums/Breadcrums";
import { Checkbox } from "@material-ui/core";
import CheckIcon from "@mui/icons-material/Check";
import useWindow from "../Utility/useWindow";
import WindowIcon from "@mui/icons-material/Window";
import FormControl from "@mui/material/FormControl";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
const Product = () => {
  const [category, setCategory] = useState([]);
  const [company, setCompany] = useState([]);
  const [colors, setColors] = useState([]);
  const [price, setPrice] = useState([]);
  const [data, setData] = useState([]);
  const [tempData, setTempData] = useState([]);
  const classes = useStyles();
  const [over, setOver] = useState(false);
  const [grid, setGrid] = useState(true);
  const [filter, setFilter] = useState({});
  const { height, width } = useWindow();
  const [drawerfilter, setdrawerfilter] = useState();
  const history = useHistory();
  const [sortBy, setSortBy] = useState("Lowest");

  useEffect(() => {
    if (width < 780) {
      setdrawerfilter(false);
      console.log(width, typeof width, drawerfilter, "less width");
    } else {
      setdrawerfilter(true);
      console.log(width, typeof width, drawerfilter, "big width");
    }
  }, [width]);

  useEffect(async () => {
    console.log("hiiii");
    const res = await axios.get("http://localhost:3004/products");
    console.log(res.data, "data");
    setData(res.data);
    setTempData(res.data);

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

  useEffect(() => {
    console.log("filter", filter);
    filter &&
      Object.keys(filter).map((x) => {
        if (
          filter[x] === undefined ||
          filter[x] === null ||
          filter[x] === "" ||
          filter[x] === "All"
        ) {
          delete filter[x];
        }
      });
    console.log("clean", filter);
    const query = data.filter((x) => {
      return Object.keys(filter).every((propertyName) =>
        propertyName === "colors"
          ? x.colors.find((m) => m === filter.colors)
          : propertyName === "price"
          ? x[propertyName] < filter[propertyName]
          : x[propertyName] === filter[propertyName]
      );
    });

    console.log("find", query);
    setTempData(query);
  }, [filter]);

  return (
    <Grid className="product-ctr">
      <Breadcrums />
      <Container>
        <Grid
          container
          lg={12}
          md={12}
          sm={12}
          // columnSpacing={{ xs: 2, sm: 3, md: 6 }}
        >
          <Grid
            container
            item
            lg={2}
            md={3}
            sm={3}
            style={{ display: drawerfilter ? "" : "none" }}
            className="filter-col"
          >
            <div className="filter-card">
              <TextField
                fullWidth
                size="small"
                variant="outlined"
                label="Search.."
                id="inputSearch"
                // onChange={(e) => setFilter({ ...filter, ["name"]: x })}
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
              <button
                onClick={(e) => setFilter({ ...filter, ["category"]: null })}
                // disabled={filter.category ? false : true}
                style={{
                  borderBottomColor: filter.category ? "" : "#617d98",
                }}
                className="filter-btn"
              >
                All
              </button>
              {category &&
                category.length > 0 &&
                category.map((x) => (
                  <button
                    style={{
                      borderBottomColor: filter.category === x ? "#617d98" : "",
                    }}
                    onClick={(e) => setFilter({ ...filter, ["category"]: x })}
                    size="small"
                    className="filter-btn"
                  >
                    {x}
                  </button>
                ))}
            </div>
            <div className="filter-card">
              <h5>Company</h5>
              {company && company.length > 0 && (
                <FormControl>
                  <Select
                    size="small"
                    value={filter.company ? filter.company : "All"}
                    onChange={(e) =>
                      setFilter({ ...filter, ["company"]: e.target.value })
                    }
                    classes={{
                      select: classes.selectRoot,
                      outlined: {},
                    }}
                    InputLabelProps={{
                      classes: {
                        root: classes.label,
                      },
                    }}
                    style={{ border: "none", letterSpacing: "0.1rem" }}
                  >
                    <MenuItem
                      className="menu"
                      style={{
                        cursor: "pointer",
                        display: "block",
                        padding: "0 0.5rem",
                        letterSpacing: "0.1rem",
                      }}
                      onClick={(e) =>
                        setFilter({ ...filter, ["company"]: null })
                      }
                      selected={filter.company ? true : false}
                      value="All"
                    >
                      All
                    </MenuItem>
                    {company.map((x) => (
                      <MenuItem
                        id={x}
                        style={{
                          cursor: "pointer",
                          display: "block",
                          padding: "0 0.5rem",
                          letterSpacing: "0.1rem",
                        }}
                        className="menu"
                        value={x}
                        onClick={(e) =>
                          setFilter({ ...filter, ["company"]: x })
                        }
                      >
                        {x}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            </div>
            <div className="filter-card">
              <h5>Colors</h5>
              <div className="color-btn-ctr">
                <button
                  className="filter-btn"
                  onClick={(e) => setFilter({ ...filter, ["colors"]: null })}
                  // disabled={filter.category ? false : true}
                  style={{
                    borderBottomColor: filter.colors ? "" : "#617d98",
                  }}
                >
                  All
                </button>
                {colors &&
                  colors.length > 0 &&
                  colors.map((x) => (
                    <button
                      id="color-btn"
                      style={{
                        backgroundColor: x,
                        opacity:
                          filter.colors && filter.colors === x ? "1" : "0.5",
                      }}
                      size="small"
                      onClick={(e) => setFilter({ ...filter, ["colors"]: x })}
                    >
                      {filter.colors && filter.colors === x && (
                        <CheckIcon
                          style={{
                            fontSize: "0.7rem",
                            fontWeight: "bolder",
                            color: "white",
                          }}
                        />
                      )}
                    </button>
                  ))}
              </div>
            </div>
            <div className="filter-card">
              <h5>Price</h5>
              <div style={{ paddingLeft: "10px" }}>
                {price && (
                  <Slider
                    sx={{ width: "5em" }}
                    defaultValue={Math.min(price)}
                    valueLabelDisplay="auto"
                    min={0}
                    name="price"
                    value={filter.price && filter.price}
                    max={price.sort((x, y) => (x < y ? 1 : -1))[0]}
                    onChange={(e) =>
                      setFilter({ ...filter, ["price"]: e.target.value })
                    }
                  />
                )}
              </div>
            </div>
            <div className="filter-card">
              <h5>Free Shipping</h5>
              <Checkbox
                size="small"
                checked={filter.shipping ? true : false}
                onClick={() =>
                  setFilter({
                    ...filter,
                    ["shipping"]: filter.shipping ? null : true,
                  })
                }
                color="primary"
              />
            </div>
            <div className="filter-card">
              <Button
                variant="contained"
                size="small"
                id="btn"
                onClick={() => setFilter(null)}
              >
                Clear Filter
              </Button>
            </div>
          </Grid>
          <Grid
            container
            item
            lg={drawerfilter ? 10 : 12}
            md={drawerfilter ? 9 : 12}
            sm={drawerfilter ? 9 : 12}
            alignSelf={"flex-start"}
          >
            <Grid container item className="menu-ctr" lg={12} md={12} sm={12}>
              <div>
                <IconButton
                  size="small"
                  style={{
                    display: width < 780 ? "" : "none",
                    backgroundColor: width < 780 && drawerfilter ? "black" : "",
                    color: width < 780 && drawerfilter ? "white" : "black",
                    borderRadius: "0.25rem",
                    padding: "1",
                    margin: "0 0.3rem",
                    fontSize: "0.4rem",
                  }}
                  onClick={() => {
                    setdrawerfilter(!drawerfilter);
                  }}
                >
                  <FilterAltOutlinedIcon />
                </IconButton>
                <IconButton
                  style={{
                    backgroundColor: grid === true ? "black" : "",
                    boder: "2px solid black",
                    color: grid === true ? "white" : "black",
                    borderRadius: "0.25rem",
                    padding: "1",
                    margin: "0 0.3rem",
                    fontSize: "0.4rem",
                  }}
                  size="small"
                  disabled={grid === true ? true : false}
                  onClick={() => {
                    setGrid(true);
                  }}
                >
                  {/* <GridViewOutlinedIcon /> */}
                  <WindowIcon />
                </IconButton>
                <IconButton
                  style={{
                    backgroundColor: grid !== true ? "black" : "",
                    color: grid !== true ? "white" : "black",
                    boder: "2px solid black",
                    borderRadius: "0.25rem",
                    padding: "1",
                    margin: "0 0.3rem",
                    fontSize: "0.4rem",
                  }}
                  size="small"
                  disabled={grid !== true ? true : false}
                  onClick={() => setGrid(false)}
                >
                  <MenuOutlinedIcon />
                </IconButton>
              </div>
              <p>{tempData && tempData.length} Products Found</p>
              <hr></hr>
              <div>
                <label style={{ paddingRight: "0.5rem" }}>Sort By</label>
                <Select
                  style={{ border: "none", letterSpacing: "0.1rem" }}
                  size="small"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <MenuItem
                    selected={sortBy === "Lowest"}
                    value={"Lowest"}
                    style={{
                      cursor: "pointer",
                      display: "block",
                      padding: "0 0.5rem",
                      letterSpacing: "0.1rem",
                    }}
                  >
                    Price (Lowest)
                  </MenuItem>
                  <MenuItem
                    style={{
                      cursor: "pointer",
                      display: "block",
                      padding: "0 0.5rem",
                      letterSpacing: "0.1rem",
                    }}
                    value={"Highest"}
                  >
                    Price (Highest)
                  </MenuItem>
                  <MenuItem
                    style={{
                      cursor: "pointer",
                      display: "block",
                      padding: "0 0.5rem",
                      letterSpacing: "0.1rem",
                    }}
                    value={"A-Z"}
                  >
                    Name (A-Z)
                  </MenuItem>
                  <MenuItem
                    style={{
                      cursor: "pointer",
                      display: "block",
                      padding: "0 0.5rem",
                      letterSpacing: "0.1rem",
                    }}
                    value={"Z-A"}
                  >
                    Name (Z-A)
                  </MenuItem>
                </Select>
              </div>
            </Grid>
            <Grid
              container
              item
              lg={12}
              md={12}
              sm={12}
              spacing={3}
              pl={3}
              pr={2}
              pb={2}
              pt={1}
            >
              {grid === true
                ? tempData.map((x, i) => (
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
                          onClick={() =>
                            history.push({
                              pathname: `/product/${x.id}`,
                            })
                          }
                          variant="contained"
                          className="btn"
                        >
                          <SearchRoundedIcon />
                        </IconButton>
                      )}

                      <div>
                        <label>{x.name}</label>
                        <label>${x.price.toLocaleString()}</label>
                      </div>
                    </Grid>
                  ))
                : tempData.map((x) => (
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
                      <Grid
                        container
                        direction={"column"}
                        item
                        lg={8}
                        md={8}
                        sm={12}
                        // pl={{ sx: 1, md: 2, lg: 4 }}
                        // pr={1}
                      >
                        <h4>{x.name}</h4>
                        <h5>${x.price.toLocaleString()}</h5>

                        <p>{x.description}</p>
                        <button
                          id="btn"
                          onClick={() =>
                            history.push({
                              pathname: `/product/${x.id}`,
                            })
                          }
                        >
                          Details
                        </button>
                      </Grid>
                    </Grid>
                  ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Grid>
  );
};

export default withRouter(Product);
