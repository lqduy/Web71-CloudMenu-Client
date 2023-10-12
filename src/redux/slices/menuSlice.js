import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  menuContent: [],
  itemIdList: []
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    addMenuItem: (state, action) => {
      const itemData = action.payload;
      state.itemIdList.push(itemData._id);
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
    },
    unselectAll: state => {
      state.menuContent = [];
      state.itemIdList = [];
    }
  }
});

export const { addMenuItem, unselectAll } = menuSlice.actions;

export default menuSlice.reducer;
