import { createAsyncThunk } from '@reduxjs/toolkit';
import PageAPI from '~/services/pageAPI';

const FETCH_PAGES_OF_USER = 'app/fetch-pages-of-user';
const UPDATE_PAGE_BY_ID = 'app/update-page-by-id';
const APPLY_MENU = 'app/apply-menu';

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

export const updatePageById = createAsyncThunk(
  UPDATE_PAGE_BY_ID,
  async (payload, { rejectWithValue }) => {
    const { id, data } = payload;
    try {
      await PageAPI.update(id, data);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      rejectWithValue(error);
    }
  }
);

export const applyMenu = createAsyncThunk(APPLY_MENU, async (payload, { rejectWithValue }) => {
  const { id, data } = payload;
  try {
    await PageAPI.applyMenu(id, data);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    rejectWithValue(error);
  }
});
