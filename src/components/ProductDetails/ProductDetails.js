import { Container, Grid, IconButton, Rating } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Breadcrums from "../Breadcrums/Breadcrums";
import { withRouter, useParams } from "react-router-dom";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import "./ProductDetails.scss";
import CheckIcon from "@mui/icons-material/Check";
import img1 from "../../Images/Slider/img1.jpeg";
import img2 from "../../Images/Slider/img2.jpeg";
import img3 from "../../Images/Slider/img3.jpeg";
import img4 from "../../Images/Slider/img4.jpeg";
import { useDispatch, useSelector } from "react-redux";
import { addCartItem } from "../../Store/cartSlice";
import { v4 as uuidv4 } from "uuid";

const ProductDetails = withRouter(({ props }) => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const [cartProduct, setCartProduct] = useState({});
  const [slider, setSlider] = useState();
  const [sliderImg, setSliderImg] = useState([]);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const addToCart = async (product) => {
    if (user.email) {
      const obj = { ...product, ["email"]: user.email };
      await setCartProduct({ ...product, ["email"]: user.email });
      dispatch(addCartItem(obj));
      console.log("loggedin", obj);
    } else {
      console.log("please login");
    }
  };
  useEffect(async () => {
    const res = await axios.get(`http://localhost:3004/products?id=${id}`);
    setProduct(res.data[0]);
    setSliderImg([res.data[0].image, img1, img2, img3, img4]);
    setSlider(res.data[0].image);
    setCartProduct({
      pId: res.data[0]["id"],
      name: res.data[0]["name"],
      colors: res.data[0]["colors"][0],
      count: 1,
      price: res.data[0]["price"],
      company: res.data[0]["company"],
      image: res.data[0]["image"],
      id: uuidv4(),
    });
    console.log("data", res.data[0]);
  }, []);
  return (
    <Grid className="prod-top-ctr">
      <Breadcrums />
      <Container>
        {product ? (
          <Grid
            container
            p={2}
            spacing={{ sx: 0, lg: 3, md: 0 }}
            className="prod-ctr"
          >
            <Grid container item lg={6} md={12} sm={12} p={2}>
              <Grid
                className="big-img"
                item
                lg={12}
                sm={12}
                md={12}
                style={{
                  backgroundImage: "url(" + slider + ")",
                }}
              ></Grid>
              <Grid container className="small-img">
                {sliderImg &&
                  sliderImg.map((x) => (
                    <div
                      onClick={() => setSlider(x)}
                      className={slider === x ? "active" : ""}
                      style={{
                        backgroundImage: "url(" + x + ")",
                      }}
                    ></div>
                  ))}
              </Grid>
            </Grid>
            <Grid container item lg={6} md={12} sm={12}>
              <Grid class="prod-info">
                <h2>{product.name}</h2>
                <div className="review-ctr">
                  <Rating size="small" value={product.stars} readOnly />
                  <span style={{ paddingLeft: "0.5rem" }}>
                    ({product.reviews} customer reviews)
                  </span>
                </div>

                <h5>${product.price.toLocaleString()}</h5>
                <p>{product.description}</p>

                <p className="info">
                  <span>Avalibility :</span>
                  {product.stock > 0 ? "In Stock" : "Out of stock"}
                </p>
                <p className="info">
                  <span>SKU :</span>
                  {product.id}
                </p>
                <p className="info">
                  <span>Brand:</span>
                  {product.company}
                </p>
                <hr></hr>

                <p className="info">
                  <span>colors :</span>

                  <div className="color-ctr">
                    {product.colors.map((x) => (
                      <button
                        id="color-btn"
                        style={{
                          backgroundColor: x,
                          opacity:
                            cartProduct && cartProduct.colors === x
                              ? "1"
                              : "0.5",
                        }}
                        onClick={(e) =>
                          setCartProduct({
                            ...cartProduct,
                            ["colors"]: x,
                          })
                        }
                      >
                        {cartProduct && cartProduct.colors === x && (
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
                </p>
                <div className="count-ctr">
                  <IconButton
                    size="small"
                    onClick={(e) =>
                      setCartProduct({
                        ...cartProduct,
                        ["count"]: cartProduct.count + 1,
                      })
                    }
                  >
                    <AddOutlinedIcon />
                  </IconButton>
                  <h2 className="count">{cartProduct.count}</h2>
                  <IconButton
                    size="small"
                    disabled={cartProduct.count > 1 ? false : true}
                    onClick={(e) =>
                      setCartProduct({
                        ...cartProduct,
                        ["count"]: cartProduct.count - 1,
                      })
                    }
                  >
                    <RemoveOutlinedIcon />
                  </IconButton>
                </div>
                <button id="btn" onClick={() => addToCart(cartProduct)}>
                  Add to Cart
                </button>
              </Grid>
            </Grid>
          </Grid>
        ) : (
          <h1>Loading..........</h1>
        )}
      </Container>
    </Grid>
  );
});

export default ProductDetails;
