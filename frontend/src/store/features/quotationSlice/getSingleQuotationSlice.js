import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../services/api";

// Async thunk to fetch Invoices
export const getSingleQuotation = createAsyncThunk(
  "getSingleQuotationSlice/getSingleQuotation",
  async (id, { rejectWithValue }) => {
    try {
    //   const queryString = new URLSearchParams(queryParams).toString();
      const response = await axios.get(`/quotation/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || "Error fetching quotation");
    }
  }
);

const getSingleQuotationSlice = createSlice({
  name: "getSingleQuotationSlice",
  initialState: {
    singleQuotation: {},
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
      .addCase(getSingleQuotation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSingleQuotation.fulfilled, (state, action) => {
        state.loading = false;
        state.singleQuotation = action.payload;
      })
      .addCase(getSingleQuotation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setPage, setLimit, setSearch } = getSingleQuotationSlice.actions;
export default getSingleQuotationSlice.reducer;
