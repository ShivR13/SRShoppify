import { Button, Container, Divider, Grid, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Breadcrumb } from "react-bootstrap";
import Breadcrums from "../Breadcrums/Breadcrums";
import "./Cart.scss";
import header from "../../Images/header1.jpeg";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import Add from "@mui/icons-material/AddOutlined";
import Remove from "@mui/icons-material/RemoveOutlined";
import { useDispatch, useSelector } from "react-redux";
import {
  loadCart,
  removeCartItem,
  updateCartItem,
} from "../../Store/cartSlice";
const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const user = useSelector((state) => state.user);
  const [cartData, setCartData] = useState([]);
  const [updated, setUpdated] = useState({});

  //   useEffect(() => {
  //     if (user.email) {
  //       dispatch(loadCart(user.email));
  //     }
  //   }, [user]);
  return (
    <Grid container className="cart-ctr">
      <Breadcrums />
      <Grid container item lg={12} md={12} sm={12}>
        <Grid container item className="top-ctr" lg={12} md={12} sm={12}>
          <Grid className="heading" container item lg={12} md={12} sm={12}>
            <label>Item</label>
            <label>Price</label>
            <label>Quantity</label>
            <label>Subtotal</label>
          </Grid>
          <Divider style={{ width: "100%" }} />
          {cart &&
            cart.map((x) => (
              <Grid className="item-ctr" container item lg={12} md={12} sm={12}>
                <div className="title">
                  <div
                    className="img"
                    style={{ backgroundImage: `url(${x.image})` }}
                  ></div>
                  <div className="prod-details">
                    <h6>{x.name}</h6>
                    <div className="colors-ctr">
                      <div>
                        Colors :
                        <span
                          id="color-btn"
                          style={{
                            backgroundColor: x.colors,
                          }}
                        ></span>
                      </div>
                      <label className="price-sm">price : {x.price}</label>
                    </div>
                    {/* <p>Price</p> */}
                  </div>
                </div>
                <h5 className="price-lg">${x.price}</h5>
                <div className="count-ctr">
                  <IconButton
                    onClick={() =>
                      dispatch(updateCartItem({ ...x, ["count"]: x.count + 1 }))
                    }
                  >
                    <Add style={{ fontWeight: "bolder" }} />
                  </IconButton>
                  <h5>{x.count}</h5>
                  <IconButton
                    disabled={x.count > 1 ? false : true}
                    onClick={() =>
                      dispatch(updateCartItem({ ...x, ["count"]: x.count - 1 }))
                    }
                  >
                    <Remove style={{ fontWeight: "bolder" }} />
                  </IconButton>
                </div>
                <h5 className="price-lg subtotal">${x.price * x.count}</h5>
                <IconButton
                  size="small"
                  className="delete-btn"
                  onClick={() => dispatch(removeCartItem(x))}
                >
                  <DeleteOutlinedIcon />
                </IconButton>
              </Grid>
            ))}

          <Divider />
          <Grid className="backbtn-ctr" container item lg={12} md={12} sm={12}>
            <Button id="btn">Continue Shopping</Button>
            <Button id="btn" className="clr-btn">
              Clear Cart
            </Button>
          </Grid>
          <Grid className="total-amount" container item lg={12} md={12} sm={12}>
            <div>
              <div>
                <h5 className="price-grid">
                  Subtotal :<span>$2,540.92</span>
                </h5>
                <p className="price-grid">
                  Shipping Fee :<span>$5.34</span>
                </p>
                <Divider />
                <h4 className="price-grid">
                  Order Total :<span>$2,546.26</span>
                </h4>
              </div>
              <Button id="btn" fullWidth>
                Login
              </Button>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Cart;
