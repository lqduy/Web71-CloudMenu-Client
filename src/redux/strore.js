import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import pageReducer from './page/pageSlice';
import dishReducer from './dish/dishSlice';
import menuReducer from './menu/menuSlice';
import viewReducer from './view/viewSlice';
import cartReducer from './cart/cartSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    page: pageReducer,
    dish: dishReducer,
    menu: menuReducer,
    view: viewReducer,
    cart: cartReducer
  }
});
