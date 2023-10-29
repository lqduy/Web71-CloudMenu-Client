import { EllipsisOutlined } from '@ant-design/icons';
import { Button, Divider } from 'antd';

const TabBar = () => {
  return (
    <div className='ct-client-page-container mt-[calc(288px/2+32px)]'>
      <Divider className='bg-gray-200 my-1' />
      <div className='flex justify-between items-center mb-1'>
        <div className='flex'>
          <Button type='text' className='h-14 px-6 font-bold text-base text-gray-500'>
            Giới thiệu
          </Button>
          <Button type='text' className='h-14 px-6 font-bold text-base text-gray-500'>
            Bài viết
          </Button>
          <Button type='text' className='h-14 px-6 font-bold text-base text-gray-500'>
            Đánh giá
          </Button>
          <Button type='text' className='h-14 px-6 font-bold text-base text-gray-500'>
            Thực đơn
          </Button>
        </div>
        <div className='flex gap-2'>
          {/* <Button type='primary' size='large' className='px-6 font-bold text-base'>
            Đơn gọi món
          </Button> */}
          <Button size='large'>
            <EllipsisOutlined />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TabBar;
