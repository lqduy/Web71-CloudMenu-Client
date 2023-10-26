import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentView: null,
  themeColor: null
};

const viewSlice = createSlice({
  name: 'view',
  initialState,
  reducers: {
    setCurrentView: (state, action) => {
      state.currentView = action.payload;
    },
    setThemeColor: (state, action) => {
      state.themeColor = action.payload;
    }
  }
});

export const { setCurrentView, setThemeColor } = viewSlice.actions;

export default viewSlice.reducer;
