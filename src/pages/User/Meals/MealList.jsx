import MealCard from './MealCard';
import MenuItem from '~/components/MenuItem';
import Dish from '~/utils/data/dish';

const MealList = ({ data }) => {
  return (
    <div className='ct-section-wrapper p-4 flex justify-between '>
      <div className='w-full'>
        {(data ?? []).map(group => {
          const groupData = Dish.group.find(item => item.value === group.value);
          return (
            <div key={group.id}>
              <h2 className='pl-4 py-1 rounded-full bg-primary/70 text-white shadow-card'>
                {groupData.title}
              </h2>
              <div className='flex flex-col gap-8 pl-4'>
                {group.subGroup.map(type => {
                  const typeData = Dish.type.find(item => item.value === type.value);
                  return (
                    <div key={type.id}>
                      <h3 className='text-xl'>{typeData.title}</h3>
                      <div className='flex flex-wrap gap-x-20 pl-8'>
                        {type.dishList.map(dish => (
                          <MealCard data={dish} key={dish.id} />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MealList;

{
  /* <MealCard {...dish} key={dish.id} /> */
}
