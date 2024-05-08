import { createAsyncThunk } from "@reduxjs/toolkit";
import { removeCart, setCart } from "../../utils/HelperFunctions";

export const updateUserCart = createAsyncThunk("cart/updateUserCart", async (payload: any) => {
  setCart(payload);
  return payload;
});

export const clearUserCart = createAsyncThunk("cart/clearUserCart", async () => {
  removeCart();
  return;
});
