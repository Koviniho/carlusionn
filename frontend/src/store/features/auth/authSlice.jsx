import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { axiosWithoutToken } from "../../../services/api";
const initialState = {
  user: null,
  isLoading: false,
  isSuccess: false,
  errorMessage: "",
};

// Define the asynchronous thunk for login
export const loginHandler = createAsyncThunk(
  "auth/loginHandler",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosWithoutToken.post("/auth/sign-in", data);

      localStorage.setItem("token", response?.data?.token);
      return response.data; // Assuming response.data contains user info and token
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error ||
          error.response?.data?.message ||
          "Login failed"
      );
    }
  }
);

/// thunk for sign up
export const signupHandler = createAsyncThunk(
  "auth/signupHandler",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosWithoutToken.post("/auth/sign-up", data);

      // Optionally save token to localStorage if the response contains a token
      // if (response?.data?.token) {
      //   localStorage.setItem("token", response.data.token);
      // }

      return response.data; // Assuming response.data contains user info and token
    } catch (error) {
      console.log("🚀 ~ error:", error.response)
      
      return rejectWithValue(error.response?.data?.message || "Signup failed");
    }
  }
);

export const getLoginUser = createAsyncThunk(
  "auth/getLoginUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.get("/auth/me");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Signup failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginHandler.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginHandler.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload; // Save user info and token
        state.errorMessage = "";
      })
      .addCase(loginHandler.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = action.payload;
      })
      .addCase(signupHandler.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signupHandler.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload; // Save user info and token
        state.errorMessage = "";
      })
      .addCase(signupHandler.rejected, (state, action) => {
        console.log("🚀 ~ .addCase ~ action:", action)
        
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = action.payload;
      });
  },
});

export default authSlice.reducer;
