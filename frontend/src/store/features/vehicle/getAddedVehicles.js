import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../services/api";

// Async thunk to fetch vehicles
export const fetchAddedVehicles = createAsyncThunk(
  "allVehicles/fetchAddedVehicles",
  async (queryParams, { rejectWithValue }) => {
    try {
      const queryString = new URLSearchParams(queryParams).toString();
      const response = await axios.get(`/vehicle?${queryString}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || "Error fetching vehicles");
    }
  }
);

const fetchAddedVehicleSlice = createSlice({
  name: "allVehicles",
  initialState: {
    allVehicles: [],
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
      .addCase(fetchAddedVehicles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAddedVehicles.fulfilled, (state, action) => {
        state.loading = false;
        state.allVehicles = action.payload;
      })
      .addCase(fetchAddedVehicles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setPage, setLimit, setSearch } = fetchAddedVehicleSlice.actions;
export default fetchAddedVehicleSlice.reducer;
