import PageLayout from '~/layouts/PageLayout';
import { Row, Col } from 'antd';
import DishesTopBar from './DishesTopBar';
import DishesTable from './DishesTable';
import DishesAsideBar from './DishesAsideBar';

const Dishes = () => {
  return (
    <PageLayout>
      <div className='flex flex-col gap-4'>
        <Row gutter={16} className='mt-4 min-h-screen'>
          <Col span={5} className='flex flex-col gap-4'>
            <DishesAsideBar />
          </Col>
          <Col span={19} className='flex flex-col gap-4'>
            <DishesTopBar />
            <DishesTable />
          </Col>
        </Row>
      </div>
    </PageLayout>
  );
};

export default Dishes;
