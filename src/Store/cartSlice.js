import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loadCart = createAsyncThunk(
  "cartSlice/loadCart",
  async (email, thunkAPI) => {
    var res = [];
    console.log("hiii at load");
    try {
      res = await axios.get(
        `https://my-json-server.typicode.com/ShivR13/json-shoppify/cart?email=${email}`
      );
      console.log("hiii at load data", (await res).data);
      return res.data;
    } catch (error) {
      console.log("error");
    }
    // return res.data;
  }
);

export const addCartItem = createAsyncThunk(
  "cartSlice/addCartItem",
  async (obj, thunkAPI) => {
    var redata = [];
    console.log("cart item 1");
    console.log("obj", obj);
    const res = await axios.get(
      `https://my-json-server.typicode.com/ShivR13/json-shoppify/cart?email=${obj.email}&pId=${obj.pId}`
    );
    console.log(res, "check res");
    if (res.data && res.data.length > 0) {
      console.log("product already in a cart");
    } else {
      console.log("cart item 2");
      const resUpdate = await axios.post(
        `https://my-json-server.typicode.com/ShivR13/json-shoppify/cart`,
        { obj }
      );
      console.log("res update", resUpdate);
      if (resUpdate.status === 201) {
        const res = await axios.get(
          `https://my-json-server.typicode.com/ShivR13/json-shoppify/cart?email=${obj.email}`
        );
        return await res.data;
      }
    }
    // return await redata;
  }
);

export const removeCartItem = createAsyncThunk(
  "cartSlice/removeCartItem",
  async (obj, thunkAPI) => {
    const res = await axios.delete(
      `https://my-json-server.typicode.com/ShivR13/json-shoppify/cart/${obj.id}`
    );
    console.log("res delete", res);
    if (res.status === 200) {
      const resdata = await axios.get(
        `https://my-json-server.typicode.com/ShivR13/json-shoppify/cart?email=${obj.email}`
      );
      return await resdata.data;
    }
  }
);

export const updateCartItem = createAsyncThunk(
  "cartSlice/updateCartItem",
  async (obj, thunkAPI) => {
    const res = await axios.patch(
      `https://my-json-server.typicode.com/ShivR13/json-shoppify/cart/${obj.id}`,
      {
        count: obj.count,
      }
    );
    console.log("res updated", res);
    if (res.status === 200) {
      const resdata = await axios.get(
        `https://my-json-server.typicode.com/ShivR13/json-shoppify/cart?email=${obj.email}`
      );
      return await resdata.data;
    }
  }
);

const cartSlice = createSlice({
  name: "cartSlice",
  initialState: {
    cart: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadCart.fulfilled, (state, action) => {
      state.cart = action.payload;
      console.log("cart", state.cart);
    });
    builder.addCase(addCartItem.fulfilled, (state, action) => {
      state.cart = action.payload;
      console.log("cart reducer", state.payload);
    });
    builder.addCase(updateCartItem.fulfilled, (state, action) => {
      state.cart = action.payload;
      console.log("updated ");
    });
    builder.addCase(removeCartItem.fulfilled, (state, action) => {
      state.cart = action.payload;
      console.log("deleted");
    });
  },
});

export const cartReducer = cartSlice.reducer;
export const cartAction = cartSlice.actions;
