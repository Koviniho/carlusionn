import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../services/api"; // assuming axios is set up correctly
import showToast from "../../../utils/toaster";

const initialState = {
  contract: null,
  singleContract: {},
  isLoading: false,
  isSuccess: false,
  errorMessage: "",
  page: 1,
  limit: 10,
  search: "",
};

// Define the asynchronous thunk for getting all vehicles
export const getAllContract = createAsyncThunk(
  "contract/getAllContract",
  async (queryParams, { rejectWithValue }) => {
    try {
      const queryString = new URLSearchParams(queryParams).toString();
      const response = await axios.get(`/contracts?${queryString}`);
      return response.data; // Assuming response.data contains vehicle data
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Define the asynchronous thunk for adding a new vehicle
export const addNewContract = createAsyncThunk(
  "contract/addNewContract",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post("/contracts", data);

      showToast("success", response?.data?.message);
      return response.data; // Assuming response.data contains the added vehicle info
    } catch (error) {
      showToast("error", error?.response?.data?.error);

      return rejectWithValue(error?.response?.data?.error);
    }
  }
);

// Define the asynchronous thunk for deleting a vehicle
export const deleteContract = createAsyncThunk(
  "contract/deleteContract",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/contracts/${id}`);
      showToast("success", response?.data?.message);
      return response?.data; // Return the ID of the deleted vehicle to remove it from the state
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Define the asynchronous thunk for updating a vehicle
export const updateContractById = createAsyncThunk(
  "contract/updateContractById",
  async ({ id, body }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/contracts/${id}`, body);
      showToast("success", response?.data?.message);
      return response.data; // Assuming response.data contains the updated vehicle info
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const getSingleContract = createAsyncThunk(
  "contract/getSingleContract",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/contracts/${id}`);
      return response.data; // Assuming response.data contains vehicle data
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const contractSlice = createSlice({
  name: "contract",
  initialState,
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
      .addCase(getAllContract.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllContract.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.contract = action.payload;
        state.errorMessage = "";
      })
      .addCase(getAllContract.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = action.payload;
        state.contract = null;
      })
      .addCase(addNewContract.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewContract.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.errorMessage = "";
      })
      .addCase(addNewContract.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = action.payload;
      })
      .addCase(deleteContract.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteContract.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.errorMessage = "";
      })
      .addCase(deleteContract.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = action.payload;
      })
      .addCase(updateContractById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateContractById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // Update the vehicle in the state with the updated data

        state.errorMessage = "";
      })
      .addCase(updateContractById.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = action.payload;
      })
      .addCase(getSingleContract.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleContract.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.singleContract = action.payload;
        // Update the vehicle in the state with the updated data

        state.errorMessage = "";
      })
      .addCase(getSingleContract.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = action.payload;
        state.singleContract = {};
      });
  },
});
export const { setPage, setLimit, setSearch } = contractSlice.actions;

export default contractSlice.reducer;
