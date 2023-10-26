import CartItem from './CartItem';
import { useSelector } from 'react-redux';

const Cart = () => {
  const { cartItems, totalAmount } = useSelector(state => state.cart);

  return (
    <div>
      <div className='flex flex-wrap'>
        {cartItems.map(data => (
          <CartItem {...data} key={data.id} />
        ))}
      </div>
      <div className='flex justify-between'>
        <h2>Price:</h2>
        <h2 className=' text-red-800'>{totalAmount}$</h2>
      </div>
    </div>
  );
};

export default Cart;
