import { Button } from 'antd';
import { useDispatch } from 'react-redux';
import { addToCart } from '~/redux/cart/cartSlice';

const MealCard = ({ data }) => {
  const dispatch = useDispatch();
  const { name, images, price, unit } = data;

  return (
    <div className='w-[calc(33.33%-80px*2/3)] flex flex-col gap-2 p-1 border rounded border-gray-400/40 shadow-sm'>
      <div className='flex items-center relative w-full aspect-square overflow-hidden border-b border-b-gray-400/40'>
        <img src={images[0]} className='absolute w-full h-full object-cover align-middle mx-auto' />
      </div>
      <div className='h-[90px] flex flex-col gap-1 px-2 py-1'>
        <h3 className='mb-0'>{name}</h3>
        <div className='flex justify-between items-end mt-auto'>
          <p className='mb-0'>
            {price.toLocaleString()} đ/<span className='lowercase'>{unit}</span>
          </p>
          <Button
            type='primary'
            ghost
            size='small'
            className='cursor-pointer'
            onClick={() => dispatch(addToCart(data))}
          >
            Thêm
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MealCard;
