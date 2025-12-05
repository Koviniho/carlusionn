import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch vehicles
export const fetchVehicleModels = createAsyncThunk(
  "allVehicleModelSlice/fetchVehicleModels",
  async (queryParams, { rejectWithValue }) => {
    try {
        const queryString = new URLSearchParams(queryParams).toString();
      const response = await axios.get(
        `https://manage.carlusion.com/model/get?${queryString}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching vehicles");
    }
  }
);

const allVehicleModelSlice = createSlice({
  name: "allVehicleModelSlice",
  initialState: {
    VehicleModels: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVehicleModels.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVehicleModels.fulfilled, (state, action) => {
        state.loading = false;
        state.VehicleModels = action.payload;
      })
      .addCase(fetchVehicleModels.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default allVehicleModelSlice.reducer;
