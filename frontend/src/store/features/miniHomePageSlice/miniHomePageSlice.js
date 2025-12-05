import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosWithoutToken } from "../../../services/api";
import showToast from "../../../utils/toaster";

// Async thunk to fetch data from the API
export const fetchMiniHomePage = createAsyncThunk(
  "miniHomePage/fetchMiniHomePage",
  async ({ webpageId, ...queryParams }, { rejectWithValue }) => {
    try {
      let url = `/webpage/public/${webpageId}`;

      // If vehicleId is provided, append it to the URL
      // if (vehicleId) {
      //   url = `${url}/${vehicleId}`;
      // }
      const queryString = new URLSearchParams(queryParams).toString();
      const response = await axiosWithoutToken.get(
        `${url}${queryString ?`?${queryString}`:""}`
      );
      showToast("success", response?.data?.message);
      return response.data;
    } catch (error) {
      showToast("error", error?.response?.data?.error);
      return rejectWithValue(error.response.data);
    }
  }
);

const miniHomePageSlice = createSlice({
  name: "miniHomePage",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMiniHomePage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMiniHomePage.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchMiniHomePage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default miniHomePageSlice.reducer;
