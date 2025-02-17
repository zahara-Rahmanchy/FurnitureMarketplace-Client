// AddQuizSlice.js
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type TMenuInitialState = {
  openMenu: boolean;
};

const initialState: TMenuInitialState = {
  openMenu: false,
};

export const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setOpenMenu: (
      state,
      action: PayloadAction<TMenuInitialState["openMenu"]>
    ) => {
      state.openMenu = action.payload;
    },
  },
});

export const {setOpenMenu} = menuSlice.actions;

export default menuSlice.reducer;
