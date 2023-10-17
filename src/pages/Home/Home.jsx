import { Row, Col, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { PlusOutlined } from '@ant-design/icons';
import { setOpenPageCreateForm } from '~/redux/page/pageSlice';

const Home = () => {
  const { activePage } = useSelector(state => state.page);
  const dispatch = useDispatch();
  return (
    <div className='flex flex-col gap-4'>
      <Row gutter={16} className='mt-4 min-h-screen'>
        <Col span={19} className='flex flex-col gap-4'>
          <div className='ct-section-wrapper min-h-screen'></div>
        </Col>
        <Col span={5} className='flex flex-col gap-4'>
          {!activePage && (
            <div className='ct-section-wrapper flex items-end bg-create-page bg-no-repeat bg-cover bg-right h-[140px] p-1.5'>
              <Button
                type='primary'
                icon={<PlusOutlined />}
                className='w-full h-11 outline outline-white'
                onClick={() => dispatch(setOpenPageCreateForm())}
              >
                Tạo trang kinh doanh
              </Button>
            </div>
          )}
          <div className='ct-section-wrapper min-h-[500px]'></div>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
