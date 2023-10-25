import { createSlice } from '@reduxjs/toolkit';

const items =
  localStorage.getItem('cartItems') !== null ? JSON.parse(localStorage.getItem('cartItems')) : [];
const totalAmount =
  localStorage.getItem('totalAmount') !== null
    ? JSON.parse(localStorage.getItem('totalAmount'))
    : 0;
const quantity =
  localStorage.getItem('quantity') !== null ? JSON.parse(localStorage.getItem('quantity')) : 0;

const initialState = {
  quantity: quantity,
  cartItems: items,
  totalAmount: totalAmount
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,

  reducers: {
    addToCart: (state, { payload }) => {
      const isItemExist = state.cartItems.find(item => item.id === payload.id);
      if (!isItemExist) {
        state.cartItems = [...state.cartItems, { ...payload, quantity: 1 }];
      } else {
        state.cartItems = state.cartItems.map(item => {
          if (item.id === payload.id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
      state.quantity++;
      state.totalAmount += payload.price;
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems.map(item => item)));
      localStorage.setItem('totalAmount', JSON.stringify(state.totalAmount));
      localStorage.setItem('quantity', JSON.stringify(state.quantity));
    },

    removeFromCart: (state, { payload }) => {
      state.cartItems = state.cartItems.filter(item => item.id !== payload.id);
      state.quantity -= payload.quantity;
      state.totalAmount -= payload.price * payload.quantity;
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems.map(item => item)));
      localStorage.setItem('totalAmount', JSON.stringify(state.totalAmount));
      localStorage.setItem('quantity', JSON.stringify(state.quantity));
    },

    addItemQuantity: (state, { payload }) => {
      state.cartItems = state.cartItems.map(item => {
        if (item.id === payload.id) {
          return { ...item, quantity: item.quantity + 1 };
        } else {
          return item;
        }
      });
      state.quantity++;
      state.totalAmount += payload.price;
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems.map(item => item)));
      localStorage.setItem('totalAmount', JSON.stringify(state.totalAmount));
      localStorage.setItem('quantity', JSON.stringify(state.quantity));
    },

    subtractItemQuantity: (state, { payload }) => {
      const subItem = state.cartItems.find(item => item.id === payload.id);
      if (subItem.quantity === 1) {
        state.cartItems = state.cartItems.filter(item => item.id !== subItem.id);
      } else {
        subItem.quantity -= 1;
      }
      state.quantity--;
      state.totalAmount -= subItem.price;
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems.map(item => item)));
      localStorage.setItem('totalAmount', JSON.stringify(state.totalAmount));
      localStorage.setItem('quantity', JSON.stringify(state.quantity));
    }
  }
});

export const { addToCart, addItemQuantity, subtractItemQuantity, removeFromCart } =
  cartSlice.actions;

export default cartSlice.reducer;
