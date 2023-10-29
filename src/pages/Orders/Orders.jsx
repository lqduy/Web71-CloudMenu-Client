import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PageLayout from '~/layouts/PageLayout';
import { setCurrentView } from '~/redux/view/viewSlice';
import { VIEW_NAME } from '~/utils/constants';
import { Row, Col, Button } from 'antd';
import OrderAPI from '~/services/orderApi';
import OrderCard from './OrderCard';
import { SyncOutlined } from '@ant-design/icons';

const Orders = () => {
  const { activePage } = useSelector(state => state.page);
  const [orderData, setOrderData] = useState([]);
  const [reload, setReload] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCurrentView(VIEW_NAME.ORDER));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchOrderData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload]);

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

  return (
    <PageLayout>
      <div className='flex flex-col gap-4'>
        <Row gutter={16} className='mt-4 min-h-screen'>
          <Col span={5} className='flex flex-col gap-4'>
            <div className='ct-section-wrapper h-9'>
              <Button
                type='text'
                icon={<SyncOutlined />}
                // disabled={!activeSeeAllBtn}
                className='w-full h-full'
                // onClick={handleSeeAll}
              >
                Làm mới
              </Button>
            </div>
            <div className='ct-section-wrapper h-[400px]'></div>
          </Col>
          <Col span={19} className='flex flex-col gap-4'>
            <div className='flex flex-wrap gap-x-4 gap-y-12'>
              {orderData.length > 0 &&
                (orderData || []).map(order => (
                  <OrderCard
                    key={order._id}
                    data={order}
                    handleReload={() => setReload(Math.random())}
                  />
                ))}
            </div>
          </Col>
        </Row>
      </div>
    </PageLayout>
  );
};

export default Orders;
