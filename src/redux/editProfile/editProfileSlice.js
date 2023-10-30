// import { createSlice } from '@reduxjs/toolkit';
// import { fetchCurrentUser } from '../user/userActions';

// const initialState = {
//   openEditProfile: false,
//   dataProfile: [],
//   isLoading: false,
//   reload: null
// };

// const profileSilce = createSlice({
//   name: 'profile',
//   initialState,
//   reducers: {
//     setOpenEditProfile: state => {
//       state.openEditProfile = !state.openEditProfile;
//     }
//   },
//   extraReducers: builder =>
//     builder
//       .addCase(fetchCurrentUser.pending, state => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(fetchCurrentUser.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.dataProfile = action.payload;
//       })
//       .addCase(fetchCurrentUser.rejected, (state, action) => {
//         state.isLoading = false;
//       })
// });
