import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { fetchAllMenus } from './menuActions';

const initialState = {
  menuList: [],
  menuContent: [],
  itemList: [],
  isLoading: false,
  error: null
};

const addMenuItemToMenuContent = (state, itemData) => {
  state.itemList.push(itemData);
  const group = state.menuContent.find(group => group.value === itemData.group);
  if (!group) {
    const newGroup = {
      id: uuidv4(),
      value: itemData.group,
      subGroup: [
        {
          id: uuidv4(),
          value: itemData.type,
          dishList: [{ id: uuidv4(), ...itemData }]
        }
      ]
    };
    state.menuContent.push(newGroup);
  } else {
    const subGroup = group.subGroup.find(type => type.value === itemData.type);
    if (!subGroup) {
      const newSubGroup = {
        id: uuidv4(),
        value: itemData.type,
        dishList: [{ id: uuidv4(), ...itemData }]
      };
      group.subGroup.push(newSubGroup);
    } else {
      const newItem = { id: uuidv4(), ...itemData };
      subGroup.dishList.push(newItem);
    }
  }
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    addMenuItem: (state, action) => {
      const itemData = action.payload;
      addMenuItemToMenuContent(state, itemData);
    },
    unselectAll: state => {
      state.menuContent = [];
      state.itemList = [];
    }
  },
  extraReducers: builder =>
    builder
      .addCase(fetchAllMenus.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllMenus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.menuList = action.payload;
      })
      .addCase(fetchAllMenus.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
});

export const { addMenuItem, unselectAll } = menuSlice.actions;

export default menuSlice.reducer;
