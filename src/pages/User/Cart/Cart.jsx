import { Divider, Empty } from 'antd';
import CartItem from './CartItem';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { removeAllCart } from '~/redux/cart/cartSlice';
import { useEffect } from 'react';

const Cart = () => {
  const { pageId } = useParams();
  const { pageId: cartOfPage, cartItems, totalAmount } = useSelector(state => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    if (pageId !== cartOfPage) {
      dispatch(removeAllCart());
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='flex flex-col justify-between gap-4'>
      <div className='flex flex-col gap-2 min-h-[240px]'>
        {cartItems.length > 0 && cartItems.map(data => <CartItem {...data} key={data.id} />)}
        {cartItems.length === 0 && (
          <div className='flex items-center justify-center flex-grow'>
            <Empty description='Chưa chọn món' />
          </div>
        )}
      </div>
      <Divider className='mb-2 mt-2' />
      <div className='flex justify-between'>
        <h4 className='m-0 text-lg'>Tổng tiền:</h4>
        <p className='m-0 text-lg text-red-800'>{totalAmount.toLocaleString()}đ</p>
      </div>
    </div>
  );
};

export default Cart;
