import PageLayout from '~/layouts/PageLayout';
import { Row, Col } from 'antd';
import CreatePage from './CreatePage';

const Home = () => {
  return (
    <PageLayout>
      <div className='flex flex-col gap-4'>
        <Row gutter={16} className='mt-4 min-h-screen'>
          <Col span={19} className='flex flex-col gap-4'>
            {/* <div className='ct-section-wrapper h-[140px]'></div> */}
            <div className='ct-section-wrapper min-h-screen'></div>
          </Col>
          <Col span={5} className='flex flex-col gap-4'>
            <div className='ct-section-wrapper flex items-end bg-create-page bg-no-repeat bg-cover bg-right h-[140px] p-1.5'>
              <CreatePage />
            </div>
            <div className='ct-section-wrapper min-h-[500px]'></div>
          </Col>
        </Row>
      </div>
    </PageLayout>
  );
};

export default Home;
