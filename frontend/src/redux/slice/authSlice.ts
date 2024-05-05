import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login, signOut } from "./authThunk";

// Define types for user data and login/fetch response
interface User {
  // Add specific properties based on your user data structure
  [key: string]: any;
}

interface LoginResponse {
  token: string;
  user: User;
}

export const fetchUserData = createAsyncThunk<LoginResponse>("auth/fetchUserData", async () => {
  // Implement fetchUserData logic (replace with your actual logic)
  const response = await fetch("/api/user");

  if (!response.ok) {
    throw new Error("Failed to fetch user data");
  }

  return (await response.json()) as LoginResponse;
});

// Define the initial state for the auth slice
const initialState = {
  token: null as string | null,
  loading: false,
  userData: {} as User,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signOut.fulfilled, (state) => {
        state.loading = false;
        state.userData = {};
        state.token = null;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        const { token, user } = action.payload;
        state.token = token;
        state.userData = user;
        state.loading = false;
      })
      .addCase(login.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserData.fulfilled, (state, action: any) => {
        const { jwt_token, email } = action.payload.data;
        state.token = jwt_token;
        state.userData = email;
        state.loading = false;
      })
      .addCase(fetchUserData.rejected, (state) => {
        state.loading = false;
        state.userData = {};
        state.token = null;
      });
  },
});

// No need to destructure actions from authSlice in TypeScript
export default authSlice.reducer;
