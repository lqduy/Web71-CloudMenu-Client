import { createAsyncThunk } from '@reduxjs/toolkit';
import PageAPI from '~/services/pageAPI';

const FETCH_PAGES_OF_USER = 'app/fetch-pages-of-user';

export const fetchPagesOfUser = createAsyncThunk(
  FETCH_PAGES_OF_USER,
  async (payload, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await PageAPI.getAllOfUser(payload);
      const pageData = response.data.data;
      return fulfillWithValue(pageData);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      rejectWithValue(error);
    }
  }
);
