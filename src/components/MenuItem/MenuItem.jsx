import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import DishDefaultImage from '~/assets/layouts/default-dish.png';

const MenuItem = ({ data }) => {
  let imageSrc = DishDefaultImage;
  if (data.images && data.images.length > 0) {
    imageSrc = data.images[0].url;
  }
  const formattedPrice = data.price.toLocaleString('vi-VN');
  const formattedUnit = data.unit.toLowerCase();
  return (
    <div className='flex justify-between items-center p-1 border rounded-md cursor-pointer'>
      <div className='flex items-center gap-1'>
        <div className='w-14'>
          <img src={imageSrc} alt={data._id} className='w-full' />
        </div>
        <div className='flex flex-col gap-1'>
          <h3 className='mb-0 leading-none'>{data.name}</h3>
          <h4 className='mb-0 leading-none'>{data.type}</h4>
        </div>
      </div>
      <div className='flex flex-col justify-center items-end gap-1'>
        <p className='mb-0'>
          {formattedPrice}/{formattedUnit}
        </p>
        <Button icon={<PlusOutlined style={{ fontSize: '12px' }} />} size='small' />
      </div>
    </div>
  );
};

export default MenuItem;
