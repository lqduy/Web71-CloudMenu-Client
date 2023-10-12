import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import DishesAPI from '~/services/dishAPI';

const initialState = {
  dishData: [],
  isLoading: false,
  error: null
};

export const fetchAllDishes = createAsyncThunk('dish/fetchAll', async () => {
  const response = await DishesAPI.getAll();
  return response.data.data;
});

const dishSlice = createSlice({
  name: 'dish',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchAllDishes.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchAllDishes.fulfilled, (state, action) => {
        state.isLoading = false;
        const rawData = action.payload;
        const sortedData = rawData.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
        state.dishData = sortedData;
      })
      .addCase(fetchAllDishes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  }
});

// export const {} = dishSlice.actions;

export default dishSlice.reducer;
