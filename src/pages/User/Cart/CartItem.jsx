import { Button } from 'antd';
import { useDispatch } from 'react-redux';
import { subtractItemQuantity, addItemQuantity, removeFromCart } from '~/redux/cart/cartSlice';
import { TiTime, TiTimes } from 'react-icons/ti';

const CartItem = props => {
  const dispatch = useDispatch();

  const { id, name, image, quantity } = props;
  return (
    <div>
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
    </div>
  );
};

export default CartItem;
