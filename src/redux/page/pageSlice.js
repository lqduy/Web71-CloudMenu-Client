import { createSlice } from '@reduxjs/toolkit';
import { fetchAllPages } from './pageActions';

const initialState = {
  pageList: [],
  currentPage: {},
  isLoading: false,
  reload: null
};

const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    reloadPage: state => {
      state.reload = Math.random();
    }
  },
  extraReducers: builder =>
    builder
      .addCase(fetchAllPages.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllPages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.pageList = action.payload;
        state.currentPage = action.payload[0];
      })
      .addCase(fetchAllPages.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
});

export const { reloadPage } = pageSlice.actions;

export default pageSlice.reducer;
