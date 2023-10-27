import { Button } from 'antd';
import { useDispatch } from 'react-redux';
import { addToCart } from '~/redux/cart/cartSlice';

const MealCard = ({ data }) => {
  const dispatch = useDispatch();
  const { id, name, images, price, unit } = data;

  return (
    <div className='w-[calc(33.33%-80px*2/3)] aspect-square flex flex-col gap-2 border p-1 rounded'>
      <div className='flex items-center w-full h-full bg-slate-300 p-1 rounded'>
        <img src={images[0]} className='w-full' />
      </div>
      <div className='flex flex-col gap-1'>
        <h3 className='mb-0'>{name}</h3>
        <div className='flex justify-between items-end'>
          <p className='mb-0'>
            {price.toLocaleString()} đ/<span className='lowercase'>{unit}</span>
          </p>
          <Button
            type='primary'
            ghost
            size='small'
            className='cursor-pointer'
            onClick={() => dispatch(addToCart({ id, image: images[0], name, price, unit }))}
          >
            Thêm
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MealCard;

{
  /* <div className='flex gap-10'>
<div className='flex'>
  <div key={id}>
    <div className='w-24 overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 '>
      <img src={images[0]} className='h-full w-full object-cover object-center ' />
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
</div> */
}
