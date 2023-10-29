import { useDispatch } from 'react-redux';
import { subtractItemQuantity, addItemQuantity } from '~/redux/cart/cartSlice';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import DishDefaultImg from '~/assets/layouts/dish-default.png';

const CartItem = props => {
  const { name, images, quantity, price, unit } = props;
  const dispatch = useDispatch();

  return (
    <div className='flex justify-between items-center'>
      <div className='h-20 flex items-center gap-3'>
        <div className='flex items-center h-full w-20'>
          <img src={images[0] ?? DishDefaultImg} className='w-full' />
        </div>
        <div className='flex flex-col'>
          <h4 className='m-0'>{name}</h4>
          <p className='m-0'>
            {price.toLocaleString()} đ/<span className='lowercase'>{unit}</span>
          </p>
        </div>
      </div>
      <div>
        <div className='flex  rounded-md'>
          <button
            className='rounded-l-md px-1 cursor-pointer bg-primary text-white'
            onClick={() => dispatch(subtractItemQuantity(props))}
          >
            <MinusOutlined />
          </button>
          <input
            type='number'
            value={quantity}
            readOnly
            className='w-8 outline-none border border-primary text-center'
          />
          <button
            className='rounded-r-md px-1 cursor-pointer bg-primary text-white'
            onClick={() => dispatch(addItemQuantity(props))}
          >
            <PlusOutlined />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;

{
  /* <div>
      <div className=' mb-3 gap-3 grid grid-cols-4  border-b-2'>
        <h3>{name}</h3>
        <img className='w-16' src={image} alt={name} />
        <div className='flex gap-3 col-span-2'>
          <Button onClick={() => dispatch(subtractItemQuantity(props))}>-</Button>
          <div className='w-8 border border-1 h-8 text-center'>
            <h3>{quantity}</h3>
          </div>
          <Button onClick={() => dispatch(addItemQuantity(props))}>+</Button>
          <Button type='primary' danger onClick={() => dispatch(removeFromCart(props))}>
            <TiTimes />
          </Button>
        </div>
      </div>
    </div> */
}
