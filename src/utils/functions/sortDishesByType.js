/* eslint-disable indent */

import { SORT_TYPE } from '../constants';

const sortDishesByType = (originList, type) => {
  let sortedList = [...originList];
  switch (type) {
    case SORT_TYPE.N_TO_O: {
      sortedList = sortedList.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      break;
    }
    case SORT_TYPE.O_TO_N: {
      sortedList = sortedList.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      break;
    }
    case SORT_TYPE.Z_TO_A: {
      sortedList = sortedList.sort((a, b) => b.name.localeCompare(a.name));
      break;
    }
    case SORT_TYPE.L_TO_H: {
      sortedList = sortedList.sort((a, b) => a.price - b.price);
      break;
    }
    case SORT_TYPE.H_TO_L: {
      sortedList = sortedList.sort((a, b) => b.price - a.price);
      break;
    }
    default:
      sortedList = sortedList.sort((a, b) => a.name.localeCompare(b.name));
  }
  return sortedList;
};

export default sortDishesByType;
