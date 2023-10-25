import { createSlice } from '@reduxjs/toolkit';
import { applyMenu, fetchPagesOfUser, updatePageById } from './pageActions';

const initialState = {
  openPageCreateForm: false,
  pageList: [],
  activePage: null,
  isLoading: false,
  isEditingPage: false,
  reload: null
};

const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    setOpenPageCreateForm: state => {
      state.openPageCreateForm = !state.openPageCreateForm;
    },
    setActivePage: (state, action) => {
      state.activePage = state.pageList.find(page => page._id === action.payload);
    },
    reloadPage: state => {
      state.reload = Math.random();
    },
    setEditPage: state => {
      state.isEditingPage = !state.isEditingPage;
    }
  },
  extraReducers: builder =>
    builder
      .addCase(fetchPagesOfUser.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPagesOfUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.pageList = action.payload;
      })
      .addCase(fetchPagesOfUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(updatePageById.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updatePageById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(applyMenu.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(applyMenu.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
});

export const { setActivePage, reloadPage, setOpenPageCreateForm, setEditPage } = pageSlice.actions;

export default pageSlice.reducer;
