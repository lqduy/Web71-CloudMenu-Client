import { createAsyncThunk } from '@reduxjs/toolkit';
import DishesAPI from '~/services/dishAPI';

// Types
const FETCH_ALL_DISH = 'app/fetch-all-dish';

// Async actions
export const fetchAllDishes = createAsyncThunk(
  FETCH_ALL_DISH,
  async (payload, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response = await DishesAPI.getAllOfPage(payload);
      const dishData = response.data.data;
      return fulfillWithValue(dishData);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      rejectWithValue(error);
    }
  }
);
