import { createAsyncThunk } from '@reduxjs/toolkit';
import PageAPI from '~/services/pageAPI';

const FETCH_ALL_PAGE = 'app/fetch-all-page';

export const fetchAllPages = createAsyncThunk(
  FETCH_ALL_PAGE,
  async (payload, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await PageAPI.getAll();
      const pageData = response.data.data;
      return fulfillWithValue(pageData);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      rejectWithValue(error);
    }
  }
);
