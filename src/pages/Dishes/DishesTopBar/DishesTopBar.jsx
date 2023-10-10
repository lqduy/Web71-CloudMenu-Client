import { useState } from 'react';
import { Space, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import CreateDish from '~/components/CreateDish';

const DishesTopBar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className='flex justify-between items-end'>
      <h1 className='mb-0'>Món ăn</h1>
      <Space wrap>
        <Button
          type='primary'
          icon={<PlusOutlined />}
          className='h-9'
          onClick={() => setIsModalOpen(true)}
        >
          Thêm mới
        </Button>
        <CreateDish isModalOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} />
      </Space>
    </div>
  );
};

export default DishesTopBar;
