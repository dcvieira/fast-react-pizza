import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      // payload cartItem
      state.cartItems.push(action.payload);
    },
    deleteItem: (state, action) => {
      // payload pizzaId
      state.cartItems = state.cartItems.filter(
        (item) => item.pizzaId !== action.payload,
      );
    },
    increaseItemQuantity: (state, action) => {
      // payload pizzaId
      const item = state.cartItems.find(
        (item) => item.pizzaId === action.payload,
      );
      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    decreaseItemQuantity: (state, action) => {
      // payload pizzaId
      const item = state.cartItems.find(
        (item) => item.pizzaId === action.payload,
      );

      item.quantity--;
      item.totalPrice = item.quantity * item.unitPrice;

      if (item.quantity === 0) {
        cartSlice.caseReducers.deleteItem(state, action);
      }
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

export const getCartItems = (state) => state.cart.cartItems;

export const getTotalCartQuantity = (state) =>
  state.cart.cartItems.reduce((sum, item) => sum + item.quantity, 0);

export const getTotalCartPrice = (state) =>
  state.cart.cartItems.reduce((sum, item) => sum + item.totalPrice, 0);

export const getCurrentItemQuantityById = (id) => (state) =>
  state.cart.cartItems.find((item) => item.pizzaId === id)?.quantity ?? 0;
