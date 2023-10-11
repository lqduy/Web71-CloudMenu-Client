import { Space, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const DishesTopBar = ({ onOpenModal }) => {
  return (
    <div className='flex justify-between items-end'>
      <h1 className='mb-0'>Món ăn</h1>
      <Space wrap>
        <Button type='primary' icon={<PlusOutlined />} className='h-9' onClick={onOpenModal}>
          Thêm mới
        </Button>
      </Space>
    </div>
  );
};

export default DishesTopBar;
