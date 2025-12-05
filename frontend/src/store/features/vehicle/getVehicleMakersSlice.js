import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch vehicles
export const fetchVehicleMakers = createAsyncThunk(
  "allVehicleMakersSlice/fetchVehicleMakers",
  async (queryParams, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://manage.carlusion.com/make/get`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching vehicles");
    }
  }
);

const allVehicleMakersSlice = createSlice({
  name: "allVehicleMakersSlice",
  initialState: {
    vehicleMakers: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVehicleMakers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVehicleMakers.fulfilled, (state, action) => {
        state.loading = false;
        state.vehicleMakers = action.payload;
      })
      .addCase(fetchVehicleMakers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// export const { setPage, setLimit, setSearch } = allVehicleMakersSlice.actions;
export default allVehicleMakersSlice.reducer;
