import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem("cart")) ?? [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      // Check if item already exists in the cart
      const itemExists = state.find((item) => item.id === action.payload.id);
      if (itemExists) {
        // If item exists, update the quantity
        itemExists.quantity += action.payload.quantity;
      } else {
        // If item doesn't exist, add it to the cart
        state.push(action.payload);
      }
    },
    deleteFromCart(state, action) {
      return state.filter((item) => item.id !== action.payload.id);
    },
    updateCartQuantity(state, action) {
      const item = state.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
  },
});

export const { addToCart, deleteFromCart, updateCartQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;
