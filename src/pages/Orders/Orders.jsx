import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PageLayout from '~/layouts/PageLayout';
import { setCurrentView } from '~/redux/view/viewSlice';
import { ORDER_STATUS, VIEW_NAME } from '~/utils/constants';
import { Row, Col, Button, Checkbox, Switch } from 'antd';
import OrderAPI from '~/services/orderApi';
import OrderCard from './OrderCard';
import { SyncOutlined } from '@ant-design/icons';

const Orders = () => {
  const { activePage } = useSelector(state => state.page);
  const [orderData, setOrderData] = useState([]);
  const [status, setStatus] = useState([]);
  const [showDone, setShowDone] = useState(false);
  const [reload, setReload] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCurrentView(VIEW_NAME.ORDER));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchOrderData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload, showDone, status]);

  const fetchOrderData = async () => {
    if (!activePage) return;
    try {
      const res = await OrderAPI.getAllOfPage(activePage._id);
      let data = res.data.data;

      data = data.filter(order =>
        showDone ? order.status === ORDER_STATUS.DONE : order.status !== ORDER_STATUS.DONE
      );

      if (status.length > 0) {
        data = data.filter(order => status.includes(order.status));
      }
      setOrderData(data);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  useEffect(() => {
    if (showDone) {
      setStatus([]);
    }
  }, [showDone]);

  const handleRefresh = () => {
    setShowDone(false);
    setStatus([]);
  };

  const statusOptions = useMemo(
    () =>
      Object.values(ORDER_STATUS)
        .filter(status => status !== ORDER_STATUS.DONE)
        .map(status => ({ label: status, value: status })),
    []
  );

  return (
    <PageLayout>
      <div className='flex flex-col gap-4'>
        <Row gutter={16} className='mt-4 min-h-screen'>
          <Col span={5} className='flex flex-col gap-4'>
            <div className='ct-section-wrapper h-9'>
              <Button
                type='text'
                icon={<SyncOutlined />}
                className='w-full h-full'
                onClick={handleRefresh}
              >
                Làm mới
              </Button>
            </div>
            <div className='ct-section-wrapper p-4'>
              <div className='flex justify-between items-center'>
                <h3 className='m-0'>Xem đơn hoàn thành</h3>
                <Switch onChange={value => setShowDone(value)} />
              </div>
              {!showDone && (
                <Checkbox.Group
                  value={status}
                  options={statusOptions}
                  className='flex flex-col gap-2 mt-4'
                  onChange={value => setStatus(value)}
                />
              )}
            </div>
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
