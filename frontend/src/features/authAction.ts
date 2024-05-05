// authActions.js
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const backendURL = "http://127.0.0.1:3000";

export const registerUser = createAsyncThunk("auth/register", async ({ firstName, email, password }: any, { rejectWithValue }) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    await axios.post(`${backendURL}/api/user/register`, { firstName, email, password }, config);
  } catch (error) {
    // return custom error message from backend if present
    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message);
    } else {
      return rejectWithValue(error.message);
    }
  }
});
