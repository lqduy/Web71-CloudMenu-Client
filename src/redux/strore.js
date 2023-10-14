import { configureStore } from '@reduxjs/toolkit';
import pageReducer from './page/pageSlice';
import dishReducer from './dish/dishSlice';
import menuReducer from './menu/menuSlice';

export const store = configureStore({
  reducer: {
    page: pageReducer,
    dish: dishReducer,
    menu: menuReducer
  }
});
