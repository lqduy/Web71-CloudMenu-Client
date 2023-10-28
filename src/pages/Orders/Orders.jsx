import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PageLayout from '~/layouts/PageLayout';
import { setCurrentView } from '~/redux/view/viewSlice';
import { VIEW_NAME } from '~/utils/constants';
import { Row, Col } from 'antd';
import OrderAPI from '~/services/orderApi';
import Dish from '~/utils/data/dish';
import MenuItem from '~/components/MenuItem';
import { calcLength } from 'framer-motion';

const Orders = () => {
  const { activePage } = useSelector(state => state.page);
  const { dishData } = useSelector(state => state.dish);
  const [orderData, setOrderData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCurrentView(VIEW_NAME.ORDER));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchOrderData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchOrderData = async () => {
    if (!activePage) return;
    try {
      const res = await OrderAPI.getAllOfPage(activePage._id);
      setOrderData(res.data.data);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  console.log(orderData);
  console.log(dishData);
  return (
    <PageLayout>
      <div className='flex flex-col gap-4'>
        <Row gutter={16} className='mt-4 min-h-screen'>
          <Col span={5} className='flex flex-col gap-4'>
            <div className='ct-section-wrapper h-[400px]'></div>
          </Col>
          <Col span={19} className='flex flex-col gap-4'>
            <div className='flex gap-4'>
              {orderData.length > 0 &&
                (orderData || []).map(order => {
                  return (
                    <div key={order._id} className='w-[calc(33.33%-16px*2/3)] h-[200px] shadow-2xl'>
                      {order.list.map(dish => {
                        return (
                          <div key={dish._id}>
                            <h4>{dish.name}</h4>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
            </div>
          </Col>
        </Row>
      </div>
    </PageLayout>
  );
};

export default Orders;
