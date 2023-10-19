import { CheckOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Card } from 'antd';
import Meta from 'antd/es/card/Meta';
import MenuContent from '~/components/MenuContent';

const MenuFullCard = ({ data }) => {
  return (
    <Card
      className='ct-card-shadow-hover'
      cover={
        <div className='h-28 py-4 px-6 bg-red-300 rounded-t-lg'>
          <div className='flex justify-between items-end h-full mt-auto'>
            <h1 className='mb-0'>{data.name}</h1>
            <div className='flex gap-2'>
              <Button type='text' icon={<CheckOutlined />} />
              <Button type='text' icon={<EditOutlined />} />
            </div>
          </div>
        </div>
      }
    >
      <Meta
        description={
          <div className='bg-white text-black'>
            <MenuContent data={data?.content} />
          </div>
        }
      />
    </Card>
  );
};

export default MenuFullCard;
