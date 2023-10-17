import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button, Row, Space } from 'antd';
import {
  HomeOutlined,
  BarsOutlined,
  BookOutlined,
  FileDoneOutlined,
  LineChartOutlined,
  HeartOutlined
} from '@ant-design/icons';
import Container from '~/components/Container';

const BottomHeader = () => {
  const { activePage } = useSelector(state => state.page);
  const navigate = useNavigate();

  return (
    <div className='bg-orange-500'>
      <Container>
        <Row className='justify-between items-center h-11'>
          <Space wrap>
            <Button
              type='text'
              icon={<HomeOutlined />}
              className='h-11 text-white'
              onClick={() => navigate('/')}
            >
              Bảng tin
            </Button>
            {!activePage && (
              <Button
                type='text'
                icon={<HeartOutlined />}
                className='h-11 text-white'
                onClick={() => navigate('/p/lqduycp/dish')}
              >
                Yêu thích
              </Button>
            )}
            {activePage && (
              <>
                <Button
                  type='text'
                  icon={<BarsOutlined />}
                  className='h-11 text-white'
                  onClick={() => navigate('/p/lqduycp/dish')}
                >
                  Món ăn
                </Button>
                <Button
                  type='text'
                  icon={<BookOutlined />}
                  className='h-11 text-white'
                  onClick={() => navigate('/p/lqduycp/menu')}
                >
                  Thực đơn
                </Button>
                <Button type='text' icon={<FileDoneOutlined />} className='h-11 text-white'>
                  Gọi món
                </Button>
                <Button type='text' icon={<LineChartOutlined />} className='h-11 text-white'>
                  Thống kê
                </Button>
              </>
            )}
          </Space>
        </Row>
      </Container>
    </div>
  );
};

export default BottomHeader;
