import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../services/api";

// Async thunk to fetch Invoices
export const fetchAllReports = createAsyncThunk(
  "fetchAllReportsSlice/fetchAllReports",
  async (queryParams, { rejectWithValue }) => {
    try {
      const queryString = new URLSearchParams(queryParams).toString();
      const response = await axios.get(`/report?${queryString}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching Invoices");
    }
  }
);

const fetchAllReportsSlice = createSlice({
  name: "fetchAllReportsSlice",
  initialState: {
    allReports: [],
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
      .addCase(fetchAllReports.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllReports.fulfilled, (state, action) => {
        state.loading = false;
        state.allReports = action.payload;
      })
      .addCase(fetchAllReports.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setPage, setLimit, setSearch } = fetchAllReportsSlice.actions;
export default fetchAllReportsSlice.reducer;
