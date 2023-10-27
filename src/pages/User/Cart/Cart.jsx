import { Divider, Empty } from 'antd';
import CartItem from './CartItem';
import { useSelector } from 'react-redux';

const Cart = () => {
  const { cartItems, totalAmount } = useSelector(state => state.cart);

  return (
    <div className='flex flex-col justify-between gap-4 h-full'>
      <div className='flex flex-col gap-2 min-h-[400px]'>
        {cartItems.length > 0 && cartItems.map(data => <CartItem {...data} key={data.id} />)}
        {cartItems.length === 0 && (
          <div className='h-[400px] flex items-center justify-center'>
            <Empty description='Chưa chọn món' />
          </div>
        )}
      </div>
      <Divider className='mb-2 mt-4' />
      <div className='flex justify-between'>
        <h4 className='m-0 text-2xl'>Tổng tiền:</h4>
        <p className='m-0 text-2xl text-red-800'>{totalAmount.toLocaleString()}đ</p>
      </div>
    </div>
  );
};

export default Cart;
