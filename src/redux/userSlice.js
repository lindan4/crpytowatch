import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCurrMetricData } from "../api";

const initialState = {
  watchingCurrencies: [],
};

export const addCurrency = createAsyncThunk(
  "currencies/addCurrency",
  async (currency, { rejectWithValue }) => {
    try {
      const getCurrencyInfo = await fetchCurrMetricData(currency);
      return getCurrencyInfo;
    } catch (e) {
      rejectWithValue(e);
    }
  }
);

export const updateCurrencies = createAsyncThunk(
  "currencies/updateCurrencies",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();

      const { watchingCurrencies } = state.user;

      const updatedCurrencies = await Promise.all(
        watchingCurrencies.map(async (item) => {
          const response = await fetchCurrMetricData(item.symbol);
          return response;
        })
      );

      return updatedCurrencies;
    } catch (e) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    removeCurrency: (state, action) => {
      state.watchingCurrencies = state.watchingCurrencies.filter(
        (currency) => currency.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateCurrencies.fulfilled, (state, action) => {
      state.watchingCurrencies = action.payload;
    }),
      builder.addCase(addCurrency.fulfilled, (state, action) => {
        if (
          state.watchingCurrencies.findIndex(
            (item) => item.id == action.payload.id
          ) == -1
        ) {
          state.watchingCurrencies.push(action.payload);
        }
      });
  },
});

export const { removeCurrency } = userSlice.actions;

export default userSlice.reducer;
