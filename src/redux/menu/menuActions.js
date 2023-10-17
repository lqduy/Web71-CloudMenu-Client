import { createAsyncThunk } from '@reduxjs/toolkit';
import MenusAPI from '~/services/menuAPI';

const FETCH_ALL_MENU = 'app/fetch-all-menu';

export const fetchAllMenus = createAsyncThunk(
  FETCH_ALL_MENU,
  async (payload, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await MenusAPI.getAllOfPage(payload);
      const menuData = response.data.data;
      return fulfillWithValue(menuData);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      rejectWithValue(error);
    }
  }
);
