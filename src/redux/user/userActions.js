import { createAsyncThunk } from '@reduxjs/toolkit';
import AuthenAPI from '~/services/authenAPI';
import UserAPI from '~/services/userAPI';

const FETCH_CURRENT_USER = 'app/fetch-current-user';
const UPDATE_USER_BY_ID = 'app/update-user-by-id';

export const fetchCurrentUser = createAsyncThunk(
  FETCH_CURRENT_USER,
  async (payload, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await AuthenAPI.fetchCurrentUser();
      const userData = response.data;
      return fulfillWithValue(userData);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      rejectWithValue(error);
    }
  }
);

export const updateUserById = createAsyncThunk(
  UPDATE_USER_BY_ID,
  async (payload, { rejectWithValue }) => {
    const { id, data } = payload;
    try {
      await UserAPI.update(id, data);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      rejectWithValue(error);
    }
  }
);
