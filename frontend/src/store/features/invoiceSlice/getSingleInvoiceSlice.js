import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../services/api";

// Async thunk to fetch vehicles
export const fetchSingleInvoice = createAsyncThunk(
  "fetchSingleInvoiceSlice/fetchSingleInvoice",
  async (id, { rejectWithValue }) => {
    try {
    //   const queryString = new URLSearchParams(queryParams).toString();
      const response = await axios.get(`/invoice/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching vehicles");
    }
  }
);

const fetchSingleInvoiceSlice = createSlice({
  name: "fetchSingleInvoiceSlice",
  initialState: {
    singleInvoice:null,
    loading: false,
    error: null,
    
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSingleInvoice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSingleInvoice.fulfilled, (state, action) => {
        state.loading = false;
        state.singleInvoice = action.payload;
      })
      .addCase(fetchSingleInvoice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default fetchSingleInvoiceSlice.reducer;
