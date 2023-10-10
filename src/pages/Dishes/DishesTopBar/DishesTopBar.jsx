import { Space } from 'antd';
import CreateDish from './CreateDish';

const DishesTopBar = () => {
  return (
    <div className='flex justify-between items-end'>
      <h1 className='mb-0'>Món ăn</h1>
      <Space wrap>
        <CreateDish />
      </Space>
    </div>
  );
};

export default DishesTopBar;
