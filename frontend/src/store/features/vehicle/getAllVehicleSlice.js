import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch vehicles
export const fetchVehicles = createAsyncThunk(
  "allVehicles/fetchVehicles",
  async (queryParams, { rejectWithValue }) => {
    if (queryParams?.manufactureYear) {
      queryParams.manufacture_year = queryParams.manufactureYear;
      delete queryParams.manufactureYear;
    }
    try {
      const queryString = new URLSearchParams(queryParams).toString();
      const response = await axios.get(
        `https://manage.carlusion.com/vehicle?${queryString}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching vehicles");
    }
  }
);

const allVehicleSlice = createSlice({
  name: "allVehicles",
  initialState: {
    vehicles: [],
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
      .addCase(fetchVehicles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVehicles.fulfilled, (state, action) => {
        state.loading = false;
        state.vehicles = action.payload;
      })
      .addCase(fetchVehicles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setPage, setLimit, setSearch } = allVehicleSlice.actions;
export default allVehicleSlice.reducer;
