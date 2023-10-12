import { configureStore } from '@reduxjs/toolkit';
import dishReducer from './slices/dishSlice';

export const store = configureStore({
  reducer: {
    dish: dishReducer
  }
});
