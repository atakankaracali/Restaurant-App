import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  history: [],
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addOrder: (state, action) => {
      const newOrder = {
        ...action.payload,
        timestamp: new Date().toISOString(),
      };
      state.history.push(newOrder);
    },
    clearOrderHistory: (state) => {
      state.history = [];
    },
  },
});

export const { addOrder, clearOrderHistory } = orderSlice.actions;
export default orderSlice.reducer;
