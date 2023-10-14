import { createAsyncThunk } from '@reduxjs/toolkit';
import UserAPI from '~/services/userAPI';

const FETCH_CURRENT_USER = 'app/fetch-current-user';

export const fetchCurrentUser = createAsyncThunk(
  FETCH_CURRENT_USER,
  async (payload, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await UserAPI.getOne(payload);
      const userData = response.data.data;
      return fulfillWithValue(userData);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      rejectWithValue(error);
    }
  }
);
