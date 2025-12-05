import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../services/api"; // assuming axios is set up correctly

const initialState = {
  vehicle: null,
  singleVehicle: {},
  isLoading: false,
  isSuccess: false,
  errorMessage: "",
};

export const getAllVehicle = createAsyncThunk(
  "vehicle/getAllVehicle",
  async ({ page, limit, searchQuery }, { rejectWithValue }) => {
    try {
      const response = await axios.get("/vehicle", {
        params: {
          page, // Pagination page
          limit, // Number of items per page
          search: searchQuery, // Optional search query
        },
      });
      return response.data; // Assuming response.data contains vehicle data
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// Define the asynchronous thunk for adding a new vehicle
export const addNewVehicle = createAsyncThunk(
  "vehicle/addNewVehicle",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post("/vehicle", data);
      return response.data; // Assuming response.data contains the added vehicle info
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Define the asynchronous thunk for deleting a vehicle
export const deleteVehicle = createAsyncThunk(
  "vehicle/deleteVehicle",
  async (vehicleId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/vehicle/${vehicleId}`);
      return response?.data; // Return the ID of the deleted vehicle to remove it from the state
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Define the asynchronous thunk for updating a vehicle
export const updateVehicle = createAsyncThunk(
  "vehicle/updateVehicle",
  async ({ id, body }, { rejectWithValue }) => {
    console.log("🚀 ~ body:", body);
    try {
      const response = await axios.put(`/vehicle/${id}`, body);
      return response.data; // Assuming response.data contains the updated vehicle info
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
// Define the asynchronous thunk for updating a vehicle
export const getSingleVehicle = createAsyncThunk(
  "vehicle/getSingleVehicle",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/vehicle/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const vehicleSlice = createSlice({
  name: "vehicle",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllVehicle.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllVehicle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.vehicle = action.payload;
        state.errorMessage = "";
      })
      .addCase(getAllVehicle.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = action.payload;
        state.vehicle = null;
      })
      .addCase(addNewVehicle.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewVehicle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.errorMessage = "";
      })
      .addCase(addNewVehicle.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = action.payload;
      })
      .addCase(deleteVehicle.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteVehicle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.errorMessage = "";
      })
      .addCase(deleteVehicle.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = action.payload;
      })
      .addCase(updateVehicle.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateVehicle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;

        state.errorMessage = "";
      })
      .addCase(updateVehicle.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = action.payload;
      })
      .addCase(getSingleVehicle.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleVehicle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.singleVehicle = action.payload;
        state.errorMessage = "";
      })
      .addCase(getSingleVehicle.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.singleVehicle = {};

        state.errorMessage = action.payload;
      });
  },
});

export default vehicleSlice.reducer;
