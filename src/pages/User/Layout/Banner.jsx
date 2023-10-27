import backgroundBanner from '~/assets/image/blog/pexels-vincent-ma-janssen-1310777.jpg';
import { Button, Tag } from 'antd';
import { EnvironmentOutlined, LikeOutlined, SendOutlined } from '@ant-design/icons';

const Banner = ({ pageData }) => {
  const { name, businessType, address, ward, district, province } = pageData || {};
  return (
    <div className='md:mt-20 ssm:mt-14 bg-white'>
      <div>
        <img
          src={backgroundBanner}
          className='object-cover w-full lg:h-80 md:h-64 sm:h-52 ssm:h-36 '
        />
      </div>
      <div className='ct-client-page-container relative'>
        <div className='w-full absolute left-0 top-0 -translate-y-1/2 flex items-end'>
          <div>
            <img
              className='w-72 aspect-square rounded-full object-cover shadow-2xl'
              src='https://picsum.photos/536/354'
              alt='Avatar Restaurant'
            />
          </div>
          <div className='flex-1 flex justify-between items-end'>
            <div className='flex flex-col gap-4'>
              <h1 className='flex items-center gap-2 m-0 pl-5 lg:text-3xl md:text-lg font-bold font-roboto'>
                {name}
                <Tag className='text-base font-normal'>{businessType}</Tag>
              </h1>
              <p className='m-0 pl-5 lg:text-lg ssm:text-sm text-gray-500'>
                <EnvironmentOutlined className='mr-2' />
                {address}, {ward}, <br /> {district}, {province}
              </p>
            </div>
            <div className='flex flex-col items-end'>
              <p className='font-bold'>2.000 lượt thích</p>
              <div className='flex gap-2'>
                <Button icon={<SendOutlined />} type='primary' size='large'>
                  Nhắn tin
                </Button>
                <Button icon={<LikeOutlined />} type='primary' ghost size='large'>
                  Yêu thích
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
