import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import DishDefaultImage from '~/assets/layouts/default-dish.png';
import Dish from '~/utils/data/dish';
import { addMenuItem } from '~/redux/slices/menuSlice';

const MenuItem = ({ data, isPreview }) => {
  const { itemIdList } = useSelector(state => state.menu);
  const dispatch = useDispatch();

  const isAdded = itemIdList.some(id => data._id === id);

  const handleAddMenuItem = dishData => {
    dispatch(addMenuItem(dishData));
  };

  let imageSrc = DishDefaultImage;
  if (data.images && data.images.length > 0) {
    imageSrc = data.images[0].url;
  }

  const typeData = Dish.type.find(item => item.value === data.type);
  const typeTitle = typeData.title;

  const formattedPrice = data.price.toLocaleString('vi-VN');
  const formattedUnit = data.unit.toLowerCase();
  return (
    <div
      className={classNames('flex justify-between items-center p-1 rounded-md', {
        border: !isPreview,
        'cursor-pointer hover:bg-gray-100': isPreview
      })}
    >
      <div className='flex items-center gap-1'>
        <div className='w-14'>
          <img src={imageSrc} alt={data._id} className='w-full' />
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
        <Button
          icon={<PlusOutlined style={{ fontSize: '12px' }} />}
          size='small'
          disabled={isAdded}
          onClick={() => handleAddMenuItem(data)}
        />
      </div>
    </div>
  );
};

export default MenuItem;
