import {
  DollarOutlined,
  EditOutlined,
  EllipsisOutlined,
  FileTextOutlined,
  SettingOutlined
} from '@ant-design/icons';
import { Avatar, Button, Card } from 'antd';
import Meta from 'antd/es/card/Meta';
import { Link } from 'react-router-dom';

const MenuCard = ({ data, index }) => {
  return (
    <Card
      key={data._id}
      hoverable
      className='w-[calc(33.33%-16px*2/3)] shadow-sm'
      cover={<div className='h-12 bg-red-300 rounded-t-lg'></div>}
      actions={[
        <SettingOutlined key='setting' />,
        <EditOutlined key='edit' />,
        <EllipsisOutlined key='ellipsis' />
      ]}
    >
      <Meta
        avatar={<Avatar>#{index + 1}</Avatar>}
        title={
          <Link to={`/m/${data._id}`} className='text-black'>
            {data.name}
          </Link>
        }
        description={
          <div className='flex gap-8'>
            <Button icon={<FileTextOutlined />} type='text' className='p-0.5'>
              {data.dishQuantity} món
            </Button>
            <Button icon={<DollarOutlined />} type='text' className='p-0.5'>
              {data.priceAverage?.toLocaleString('vi-VN')}đ
            </Button>
          </div>
        }
      />
    </Card>
  );
};

export default MenuCard;
