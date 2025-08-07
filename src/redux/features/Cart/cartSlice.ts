import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  product: {
    _id: string;
    name: string;
    price: number;
    image?: string;
    key: string;
  };
  quantity: number;
  seller?: string;
  instructions?: string;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartFromDB: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
    },
    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const item = state.items.find(i => i.product._id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(i => i.product._id !== action.payload);
    },
  },
});

export const { setCartFromDB, updateQuantity, clearCart, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
