import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../services/api";
import showToast from "../../../utils/toaster";

// Async thunk to delete a file
export const deleteFile = createAsyncThunk(
  "files/deleteFile",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.delete("/file/delete", { data: payload });
      showToast("success", response?.data?.message);
      return response?.data
    } catch (error) {
        showToast("error", error?.response?.data?.error);
      return rejectWithValue(error.response?.data?.error || "Error deleting file");
    }
  }
);

const deleteFileSlice = createSlice({
  name: "files",
  initialState: {
    isLoading:false,
    deleting: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteFile.pending, (state) => {
        state.isLoading=true;
        state.deleting = true;
        state.error = null;
      })
      .addCase(deleteFile.fulfilled, (state) => {
        state.isLoading=false;
        state.deleting = false;
      })
      .addCase(deleteFile.rejected, (state, action) => {
        state.isLoading=false;
        state.deleting = false;
        state.error = action.payload;
      });
  },
});

export default deleteFileSlice.reducer;
