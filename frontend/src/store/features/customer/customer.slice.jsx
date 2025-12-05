import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../services/api"; // assuming axios is set up correctly
import showToast from "../../../utils/toaster";

const initialState = {
  customers: null,
  singleCustomer: {},
  isLoading: false,
  isSuccess: false,
  errorMessage: "",
  page: 1,
  limit: 10,
  search: "",
};

// Define the asynchronous thunk for getting all vehicles
export const getAllCustomers = createAsyncThunk(
  "customer/getAllCustomers",
  async (queryParams, { rejectWithValue }) => {
    try {
      const queryString = new URLSearchParams(queryParams).toString();
      const response = await axios.get(`/customer?${queryString}`);
      
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Define the asynchronous thunk for getting single contract by id
export const getSingleCustomer = createAsyncThunk(
  "customer/getSingleCustomer",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/customer/${id}`);
      return response.data; // Assuming response.data contains vehicle data
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Define the asynchronous thunk for adding a new vehicle
export const addNewCustomer = createAsyncThunk(
  "customer/addNewCustomer",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post("/customer", data);
      showToast("success", response?.data?.message);
      return response?.data; // Assuming response.data contains the added vehicle info
    } catch (error) {
      showToast("error", error?.response?.data?.error);
      return rejectWithValue(error?.response?.data?.error);
    }
  }
);

// Define the asynchronous thunk for deleting a vehicle
export const deleteCustomer = createAsyncThunk(
  "customer/deleteCustomer",
  async (id, { rejectWithValue }) => {
    try {
     
      const response = await axios.delete(`/customer/${id}`);
      showToast("success", response?.data?.message);
      return response?.data; // Return the ID of the deleted vehicle to remove it from the state
    } catch (error) {
      console.log("🚀 ~ error:", error)
      showToast("error", error?.response?.data?.error);
      return rejectWithValue(error?.response?.data?.error);
    }
  }
);

// Define the asynchronous thunk for updating a vehicle
export const updateCustomerById = createAsyncThunk(
  "customer/updateCustomerById",
  async (data, { rejectWithValue }) => {

    try {
      const response = await axios.put(`/customer/${data?.id}`, data?.formData);
      showToast("success", response?.data?.message);
      console.log("🚀 ~ response:", response)
      return response.data; // Assuming response.data contains the updated vehicle info
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const customerSlice = createSlice({
  name: "customer",
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
      .addCase(getAllCustomers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllCustomers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.customers = action.payload;
        state.errorMessage = "";
      })
      .addCase(getAllCustomers.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = action.payload;
        state.customers = null;
      })
      .addCase(getSingleCustomer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleCustomer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.singleCustomer = action.payload;
        state.errorMessage = "";
      })
      .addCase(getSingleCustomer.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = action.payload;
        state.singleCustomer = null;
      })

      .addCase(addNewCustomer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewCustomer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.errorMessage = "";
      })
      .addCase(addNewCustomer.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = action.payload;
      })
      .addCase(deleteCustomer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCustomer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.errorMessage = "";
      })
      .addCase(deleteCustomer.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = action.payload;
      })
      .addCase(updateCustomerById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCustomerById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // Update the vehicle in the state with the updated data

        state.errorMessage = "";
      })
      .addCase(updateCustomerById.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = action.payload;
      });
  },
});
export const { setPage, setLimit, setSearch } = customerSlice.actions;

export default customerSlice.reducer;
