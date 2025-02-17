/* eslint-disable @typescript-eslint/no-explicit-any */
import {createSlice} from "@reduxjs/toolkit";

type TInitialState = {
  data: object;
};

const initialState: TInitialState = {
  data: {},
};
const saleSlice = createSlice({
  name: "sale",
  initialState,
  reducers: {
    setSaleQuery: (state, action) => {
      console.log("action.payload: ", action.payload);
      console.log("state: ", state);
      const {data} = action.payload;
      state.data = data;
    },
  },
});

export const {setSaleQuery} = saleSlice.actions;
export default saleSlice.reducer;
