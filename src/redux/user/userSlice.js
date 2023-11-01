import { createSlice } from '@reduxjs/toolkit';
import { fetchCurrentUser, updateUserById } from './userActions';
import { TOKEN_TYPES } from '~/utils/constants';
import { PATH } from '~/routes';

const initialState = {
  isAuthenticated: false,
  currentUser: {},
  isLoading: false,
  reload: null,
  openEditProfile: false
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
      window.location.href = PATH.ABOUT_ME;
    },
    setOpenEditProfile: state => {
      state.openEditProfile = !state.openEditProfile;
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
      .addCase(updateUserById.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUserById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
});

export const { reloadUser, logout, setOpenEditProfile } = userSlice.actions;

export default userSlice.reducer;
