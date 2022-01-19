import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "useSlice",
  initialState: {
    name: "",
    email: "",
  },
  reducers: {
    logIn(state, action) {
      state.name = action.payload.name;
      state.email = action.payload.email;
      console.log("reducer", action.payload);
    },
    logOut(state, action) {
      state.name = "";
      state.email = "";
      state.id = "";
    },
  },
});
export const userReducer = userSlice.reducer;
export const userAction = userSlice.actions;
