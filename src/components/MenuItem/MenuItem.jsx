import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'antd';
import { DragOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import DishDefaultImage from '~/assets/layouts/dish-default.png';
import Dish from '~/utils/data/dish';
import { addMenuItem, unselectOne } from '~/redux/menu/menuSlice';

const MenuItem = ({ data, isPreviewer, controls = true }) => {
  const { itemList } = useSelector(state => state.menu);
  const dispatch = useDispatch();

  const isAdded = itemList.some(item => data._id === item._id);

  const handleAddMenuItem = dishData => {
    dispatch(addMenuItem(dishData));
  };

  let imageSrc = DishDefaultImage;
  if (data.images && data.images.length > 0) {
    imageSrc = data.images[0];
  }

  const typeData = Dish.type.find(item => item.value === data.type);
  const typeTitle = typeData.title;

  const formattedPrice = data.price.toLocaleString('vi-VN');
  const formattedUnit = data.unit.toLowerCase();

  return (
    <div
      className={classNames('flex justify-between items-center p-1 rounded-full pr-6', {
        'bg-gray-100': !isPreviewer,
        'hover:shadow-card': !isAdded && !isPreviewer,
        'cursor-pointer hover:bg-gray-100 hover:shadow-card': isPreviewer,
        'opacity-20': isAdded && !isPreviewer
      })}
    >
      <div className='flex items-center gap-1'>
        <div className='w-14 aspect-square relative overflow-hidden rounded-full'>
          <img src={imageSrc} alt={data.name} className='w-full h-full absolute object-cover' />
        </div>
        <div className='flex flex-col gap-2'>
          <h3 className='mb-0 leading-none'>{data.name}</h3>
          <p className='mb-0 leading-none'>{typeTitle}</p>
        </div>
      </div>
      <div className='flex flex-col justify-center items-end gap-1'>
        <p className='mb-0'>
          {formattedPrice}/{formattedUnit}
        </p>
        {!isPreviewer && controls && (
          <Button
            icon={<PlusOutlined style={{ fontSize: '12px' }} />}
            size='small'
            disabled={isAdded}
            onClick={() => handleAddMenuItem(data)}
          />
        )}
        {isPreviewer && controls && (
          <div className='flex gap-1'>
            <Button
              icon={<MinusOutlined style={{ fontSize: '12px' }} />}
              size='small'
              onClick={() => dispatch(unselectOne(data))}
            />
            <Button icon={<DragOutlined />} size='small' className='cursor-grab' />
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuItem;
