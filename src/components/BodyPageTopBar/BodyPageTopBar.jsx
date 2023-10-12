import { Space, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const BodyPageTopBar = ({ title, createButtonTitle, onOpenModal }) => {
  return (
    <div className='flex justify-between items-end'>
      <h1 className='mb-0'>{title}</h1>
      <Space wrap>
        <Button type='primary' icon={<PlusOutlined />} className='h-9' onClick={onOpenModal}>
          {createButtonTitle}
        </Button>
      </Space>
    </div>
  );
};

export default BodyPageTopBar;
