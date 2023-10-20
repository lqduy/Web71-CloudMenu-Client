import { Button } from 'antd';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../redux/cart/cartSlice';

const MealCard = ({ id, name, price, image }) => {
  const dispatch = useDispatch();
  return (
    <div className=' flex gap-10'>
      <div className='flex'>
        <div key={id}>
          <div className=' w-24 overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 '>
            <img src={image} className='h-full w-full object-cover object-center ' />
          </div>
          <div className='mt-4 flex justify-between gap-5'>
            <div>
              <h3 className='text-bold text-gray-700'>{name}</h3>
            </div>
            <p className='text-sm font-medium text-red-700'>{price}$</p>
          </div>
        </div>
      </div>
      <div>
        <Button onClick={() => dispatch(addToCart({ id, image, name, price }))}>Thêm</Button>
      </div>
    </div>
  );
};

export default MealCard;
