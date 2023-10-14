import { createSlice } from '@reduxjs/toolkit';
import { fetchCurrentUser } from './userActions';

const initialState = {
  isAuthenticated: false,
  currentUser: {},
  isLoading: false,
  reload: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    reloadUser: state => {
      state.reload = Math.random();
    }
  },
  extraReducers: builder =>
    builder
      .addCase(fetchCurrentUser.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
});

export const { reloadUser } = userSlice.actions;

export default userSlice.reducer;
