import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  watchingCurrencies: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addCurrency: (state, action) => {
      if (
        state.watchingCurrencies.findIndex(
          (item) => item.id == action.payload.id
        ) == -1
      ) {
        state.watchingCurrencies.push(action.payload);
      }
    },
    removeCurrency: (state, action) => {
      state.watchingCurrencies = state.watchingCurrencies.filter(
        (currency) => currency.id !== action.payload
      );
    },
    updateCurrencies: (state, action) => {
      state.watchingCurrencies = action.payload;
    },
  },
});

export const { addCurrency, removeCurrency } = userSlice.actions;

export default userSlice.reducer;
