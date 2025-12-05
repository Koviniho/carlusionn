import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../services/api";

// Async thunk to fetch vehicles
export const recordPayment = createAsyncThunk(
  "recordPaymentSlice/recordPayment",
  async ({id,payload}, { rejectWithValue }) => {
    try {
    //   const queryString = new URLSearchParams(queryParams).toString();
      const response = await axios.put(`/invoice/${id}`,payload);
      console.log("🚀 ~ response:", response)
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message ||"Error fetching vehicles");
    }
  }
);

const recordPaymentSlice = createSlice({
  name: "recordPaymentSlice",
  initialState: {
    payment:null,
    loading: false,
    error: null,
    
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(recordPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(recordPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.payment = action.payload;
      })
      .addCase(recordPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default recordPaymentSlice.reducer;
