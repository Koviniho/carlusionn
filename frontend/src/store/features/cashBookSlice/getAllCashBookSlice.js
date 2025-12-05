import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../services/api";

// Async thunk to fetch Invoices
export const fetchAllCashbook = createAsyncThunk(
  "fetchAllCashbookSlice/fetchAllCashbook",
  async (queryParams, { rejectWithValue }) => {
    try {
      const queryString = new URLSearchParams(queryParams).toString();
      const response = await axios.get(`/cashbook?${queryString}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching Invoices");
    }
  }
);

const fetchAllCashbookSlice = createSlice({
  name: "fetchAllCashbookSlice",
  initialState: {
    allCashbookEntries: [],
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
      .addCase(fetchAllCashbook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllCashbook.fulfilled, (state, action) => {
        state.loading = false;
        state.allCashbookEntries = action.payload;
      })
      .addCase(fetchAllCashbook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setPage, setLimit, setSearch } = fetchAllCashbookSlice.actions;
export default fetchAllCashbookSlice.reducer;
