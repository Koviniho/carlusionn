import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../services/api";

// Async thunk to fetch Invoices
export const getAllQuotation = createAsyncThunk(
  "getAllQuotationSlice/getAllQuotation",
  async (queryParams, { rejectWithValue }) => {
    try {
      const queryString = new URLSearchParams(queryParams).toString();
      const response = await axios.get(`/quotation?${queryString}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || "Error fetching quotation");
    }
  }
);

const getAllQuotationSlice = createSlice({
  name: "getAllQuotationSlice",
  initialState: {
    AllQuotations: [],
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
      .addCase(getAllQuotation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllQuotation.fulfilled, (state, action) => {
        state.loading = false;
        state.AllQuotations = action.payload;
      })
      .addCase(getAllQuotation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setPage, setLimit, setSearch } = getAllQuotationSlice.actions;
export default getAllQuotationSlice.reducer;
