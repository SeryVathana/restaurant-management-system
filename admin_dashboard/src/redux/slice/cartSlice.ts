import { createSlice } from "@reduxjs/toolkit";
import { clearUserCart, updateUserCart } from "./cartThunk";

// Define types for user data and login/fetch response
interface Cart {
  // Add specific properties based on your user data structure
  [key: string]: any;
}

// Define the initial state for the auth slice
const initialState = {
  cart: {} as Cart,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateUserCart.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      .addCase(clearUserCart.fulfilled, (state) => {
        state.cart = [];
      });
  },
});

// No need to destructure actions from authSlice in TypeScript
export default cartSlice.reducer;
