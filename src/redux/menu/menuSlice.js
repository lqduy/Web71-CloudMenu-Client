import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { fetchAllMenus } from './menuActions';
import Dish from '~/utils/data/dish';

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
    let content = [...state.menuContent, newGroup];
    content = content.sort((a, b) => {
      const aIndex = Dish.group.findIndex(gr => gr.value === a.value);
      const bIndex = Dish.group.findIndex(gr => gr.value === b.value);
      return aIndex - bIndex;
    });
    state.menuContent = content;
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

const unselectItemInMenu = (state, itemData) => {
  // Remove in itemList State
  const itemIndexInItemList = state.itemList.indexOf(itemData);
  state.itemList.splice(itemIndexInItemList, 1);

  // Remove in menuContent State
  const group = state.menuContent.find(group => group.value === itemData.group);
  const subGroup = group.subGroup.find(subGroup => subGroup.value === itemData.type);
  const itemIndexInDishList = subGroup.dishList.indexOf(itemData);
  subGroup.dishList.splice(itemIndexInDishList, 1);

  // Check empty group & subGroup to removing
  if (subGroup.dishList.length === 0) {
    const subGroupIndexInGroup = group.subGroup.indexOf(subGroup);
    group.subGroup.splice(subGroupIndexInGroup, 1);
  }
  if (group.subGroup.length === 0) {
    const groupIndexInMenu = state.menuContent.indexOf(group);
    state.menuContent.splice(groupIndexInMenu, 1);
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
    unselectOne: (state, action) => {
      const itemData = action.payload;
      unselectItemInMenu(state, itemData);
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

export const { addMenuItem, unselectOne, unselectAll } = menuSlice.actions;

export default menuSlice.reducer;
