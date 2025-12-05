import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../services/api"; // assuming axios is set up correctly
import showToast from "../../../utils/toaster";

const initialState = {
  contractTemplates: null,
  singleTamplet: {},
  isLoading: false,
  isSuccess: false,
  errorMessage: "",
};

// Define the asynchronous thunk for getting all vehicles
export const getAllContractTemplates = createAsyncThunk(
  "contractTemplates/getAllContractTemplates",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/contract-template");
      return response.data; // Assuming response.data contains vehicle data
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Define the asynchronous thunk for getting single contract by id
export const getSingleContractTemplate = createAsyncThunk(
  "contractTemplates/getSingleContractTemplate",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/contract-template/${id}`);
      return response.data; // Assuming response.data contains vehicle data
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Define the asynchronous thunk for adding a new vehicle
export const addNewContractTemplate = createAsyncThunk(
  "contractTemplates/addNewContractTemplate",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post("/contract-template", data);
      showToast("success", response?.data?.message);
      return response.data; // Assuming response.data contains the added vehicle info
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Define the asynchronous thunk for deleting a vehicle
export const deleteContractTemplate = createAsyncThunk(
  "contractTemplates/deleteContractTemplate",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/contract-template/${id}`);
      showToast("success", "Contract Template Delete ");
      return response?.data; // Return the ID of the deleted vehicle to remove it from the state
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Define the asynchronous thunk for updating a vehicle
export const updateContracTemplatestById = createAsyncThunk(
  "contractTemplates/updateContracTemplatestById",
  async ({ id, body }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/contract-template/${id}`, body);
      showToast("success", "Contract Template updated successfully");
      return response.data; // Assuming response.data contains the updated vehicle info
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const contractTemplatesSlice = createSlice({
  name: "contractTemplates",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllContractTemplates.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllContractTemplates.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.contractTemplates = action.payload;
        state.errorMessage = "";
      })
      .addCase(getAllContractTemplates.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = action.payload;
        state.contractTemplates = null;
      })
      .addCase(getSingleContractTemplate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleContractTemplate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.singleTamplet = action.payload;
        state.errorMessage = "";
      })
      .addCase(getSingleContractTemplate.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = action.payload;
        state.singleTamplet = null;
      })

      .addCase(addNewContractTemplate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewContractTemplate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.errorMessage = "";
      })
      .addCase(addNewContractTemplate.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = action.payload;
      })
      .addCase(deleteContractTemplate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteContractTemplate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.errorMessage = "";
      })
      .addCase(deleteContractTemplate.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = action.payload;
      })
      .addCase(updateContracTemplatestById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateContracTemplatestById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // Update the vehicle in the state with the updated data

        state.errorMessage = "";
      })
      .addCase(updateContracTemplatestById.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = action.payload;
      });
  },
});

export default contractTemplatesSlice.reducer;
