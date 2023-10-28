import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PageLayout from '~/layouts/PageLayout';
import { setCurrentView } from '~/redux/view/viewSlice';
import { VIEW_NAME } from '~/utils/constants';
import { Row, Col } from 'antd';
import BodyPageTopBar from '~/components/BodyPageTopBar';
import DishesTable from '../Dishes/DishesTable';
import DishesAsideBar from '../Dishes/DishesAsideBar';

const Orders = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCurrentView(VIEW_NAME.ORDER));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <PageLayout>
      <div className='flex flex-col gap-4'>
        <Row gutter={16} className='mt-4 min-h-screen'>
          <Col span={5} className='flex flex-col gap-4'>
            <div className='ct-section-wrapper h-[400px]'></div>
          </Col>
          <Col span={19} className='flex flex-col gap-4'>
            <div className='ct-section-wrapper h-[400px]'></div>
          </Col>
        </Row>
      </div>
    </PageLayout>
  );
};

export default Orders;
