import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../services/api";

// Async thunk to fetch vehicles
export const fetchSingleInquiry = createAsyncThunk(
  "SingleInquiry/fetchSingleInquiry",
  async (id, { rejectWithValue }) => {
    try {
    //   const queryString = new URLSearchParams(queryParams).toString();
      const response = await axios.get(`/inquiry/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching vehicles");
    }
  }
);

const fetchSingleInquirySlice = createSlice({
  name: "SingleInquiry",
  initialState: {
    singleInquiry:null,
    loading: false,
    error: null,
    
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSingleInquiry.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSingleInquiry.fulfilled, (state, action) => {
        state.loading = false;
        state.singleInquiry = action.payload;
      })
      .addCase(fetchSingleInquiry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default fetchSingleInquirySlice.reducer;
