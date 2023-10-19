import MenuItem from '~/components/MenuItem';
import Dish from '~/utils/data/dish';

const MenuContent = ({ data }) => {
  return (
    <div className='flex flex-col gap-8 p-4 border border-gray-300 border-1 rounded-lg'>
      {data.map(group => {
        const groupData = Dish.group.find(item => item.value === group.value);
        return (
          <div key={group.id}>
            <h2 className='pl-4 py-1 rounded-full bg-primary/70 text-white shadow-card'>
              {groupData.title}
            </h2>
            <div className='flex flex-col gap-2 pl-8'>
              {group.subGroup.map(type => {
                const typeData = Dish.type.find(item => item.value === type.value);
                return (
                  <div key={type.id}>
                    <h3>{typeData.title}</h3>
                    <div className='flex flex-col gap-2 pl-4'>
                      {type.dishList.map(dish => (
                        <MenuItem key={dish.id} data={dish} isPreviewer />
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
  );
};

export default MenuContent;
