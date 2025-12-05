import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../services/api";

// Async thunk to fetch Invoices
export const fetchAllInvoices = createAsyncThunk(
  "allInvoices/fetchAllInvoices",
  async (queryParams, { rejectWithValue }) => {
    try {
      const queryString = new URLSearchParams(queryParams).toString();
      const response = await axios.get(`/invoice?${queryString}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching Invoices");
    }
  }
);

const fetchAllInvoicesSlice = createSlice({
  name: "allInvoices",
  initialState: {
    allInvoices: [],
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
      .addCase(fetchAllInvoices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllInvoices.fulfilled, (state, action) => {
        state.loading = false;
        state.allInvoices = action.payload;
      })
      .addCase(fetchAllInvoices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setPage, setLimit, setSearch } = fetchAllInvoicesSlice.actions;
export default fetchAllInvoicesSlice.reducer;
