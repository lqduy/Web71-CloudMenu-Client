import CartItem from './CartItem';
import { useDispatch, useSelector } from 'react-redux';

const Cart = () => {
  const { cartItems, totalAmount } = useSelector(state => state.cart);
  console.log(totalAmount);
  return (
    <div>
      {cartItems.map(data => (
        <CartItem {...data} key={data.id} />
      ))}
    </div>
  );
};

export default Cart;
