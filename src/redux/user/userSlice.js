import { createSlice } from '@reduxjs/toolkit';
import { fetchCurrentUser } from './userActions';
import { TOKEN_TYPES } from '~/utils/constants';

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
    },
    logout: state => {
      localStorage.removeItem(TOKEN_TYPES.ACCESS_TOKEN);
      state.isAuthenticated = false;
      state.currentUser = {};
      window.location.href = '/login';
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

export const { reloadUser, logout } = userSlice.actions;

export default userSlice.reducer;
