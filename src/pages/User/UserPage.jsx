import { useEffect, useState } from 'react';
import Banner from './Layout/Banner';
import Header from './Layout/Header';
import MealList from './Meals/MealList';

const User = () => {
  return (
    <>
      {<Header />}
      <Banner />
      <MealList />
    </>
  );
};

export default User;
