import { configureStore } from '@reduxjs/toolkit';
import dishReducer from './slices/dishSlice';
import menuReducer from './slices/menuSlice';

export const store = configureStore({
  reducer: {
    dish: dishReducer,
    menu: menuReducer
  }
});
