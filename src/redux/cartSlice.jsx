import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = JSON.parse(localStorage.getItem("cart")) ?? [];

const updateLocalStorage = (state) => {
  localStorage.setItem("cart", JSON.stringify(state));
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const itemExists = state.find((item) => item.id === action.payload.id);
      if (!itemExists) {
        state.push(action.payload);
      } else {
        toast.info("Item already exists, please check cart", {
          autoClose: 6000,
        });
      }
      updateLocalStorage(state); // Update localStorage
    },
    deleteFromCart(state, action) {
      const updatedState = state.filter(
        (item) => item.id !== action.payload.id
      );
      updateLocalStorage(updatedState); // Update localStorage
      return updatedState;
    },
    updateCartQuantity(state, action) {
      const item = state.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
        toast.info("Cart quantity updated");
      }
      updateLocalStorage(state); // Update localStorage
    },
  },
});

export const { addToCart, deleteFromCart, updateCartQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;
