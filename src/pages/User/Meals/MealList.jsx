import MealCard from './MealCard';
import Mockdata from './MockData';

const MealList = () => {
  return (
    <div className='pl-36 pt-52 flex justify-around '>
      {Mockdata.map(data => (
        <MealCard {...data} key={data.id} />
      ))}
    </div>
  );
};

export default MealList;
