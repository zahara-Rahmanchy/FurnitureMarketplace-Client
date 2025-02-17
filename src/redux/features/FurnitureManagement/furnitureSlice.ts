/* eslint-disable @typescript-eslint/no-explicit-any */
import {PayloadAction, createSlice} from "@reduxjs/toolkit";
import {TFurniture} from "../../../pages/Products/utils/types/TFurniture";

type TInitialState = {
  id: string;
  idArray: string[];
  data: TFurniture;
  filters: {
    minPrice: number;
    maxPrice: number;

    color: string;
    material: string;
    type: string;
    category: string;
    name: string;
  };
};

const initialState: TInitialState = {
  id: "",
  idArray: [],
  data: {
    _id: "",
    name: "",
    productId: "",
    quantity: 0,
    price: 0,

    image: "",
    type: "",
    dimensions: "",

    category: "",
    warranty: "",
    description: "",

    color: "",
    material: "",
    createdBy: "",
    createdAt: "",
    updatedAt: "",
  },
  filters: {
    name: "",
    minPrice: 0,
    maxPrice: Infinity,
    type: "",
    category: "",
    color: "",
    material: "",
  },
};
const FurnitureSlice = createSlice({
  name: "Furniture",
  initialState,
  reducers: {
    checkboxIds: (state, action: PayloadAction<string>) => {
      console.log(state, action);
      const id = action.payload;
      if (state.idArray.includes(id)) {
        state.idArray = state.idArray.filter(sId => sId !== id);
      } else {
        state.idArray.push(id);
      }
      // state.idArray.push(action.payload);
      console.log(" state.idArray:", state.idArray);
    },
    setFurnitureData: (state, action) => {
      console.log("action.payload: ", action.payload);
      const {data} = action.payload;
      state.data = data;
    },
    setFilterOptions: (state, action) => {
      console.log("action.payload: ", action.payload);
      state.filters = {...state.filters, ...action.payload};
      console.log("state.filters: ", state.filters);
    },
    ClearFilter: state => {
      state.filters = initialState.filters;
      console.log("state.filters: ", state.filters);
    },
  },
});

export const {checkboxIds, setFurnitureData, setFilterOptions, ClearFilter} =
  FurnitureSlice.actions;
export default FurnitureSlice.reducer;
