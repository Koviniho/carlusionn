import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../services/api";

// Async thunk to fetch vehicles
export const fetchAllInquiry = createAsyncThunk(
  "allVehicles/fetchAllInquiry",
  async (queryParams, { rejectWithValue }) => {
    try {
      const queryString = new URLSearchParams(queryParams).toString();
      const response = await axios.get(`/inquiry?${queryString}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching vehicles");
    }
  }
);

const fetchAllInquirySlice = createSlice({
  name: "allVehicles",
  initialState: {
    allInquiries: [],
    loading: false,
    error: null,
    page: 1,
    limit: 10,
    search: "",
  },
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setLimit: (state, action) => {
      state.limit = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllInquiry.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllInquiry.fulfilled, (state, action) => {
        state.loading = false;
        state.allInquiries = action.payload;
      })
      .addCase(fetchAllInquiry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setPage, setLimit, setSearch } = fetchAllInquirySlice.actions;
export default fetchAllInquirySlice.reducer;
