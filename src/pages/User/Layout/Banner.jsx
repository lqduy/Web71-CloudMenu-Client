import backgroundBanner from '~/assets/image/blog/pexels-vincent-ma-janssen-1310777.jpg';
import { Avatar, Button, Tag } from 'antd';
import { EnvironmentOutlined, LikeOutlined, SendOutlined } from '@ant-design/icons';

const Banner = ({ pageData }) => {
  const { name, businessType, address, ward, district, province, avatar } = pageData || {};

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
          <div className='bg-gray-300/60 rounded-full p-2'>
            {Array.isArray(avatar) && avatar.length > 0 ? (
              <img
                className='w-72 aspect-square rounded-full object-cover shadow-2xl'
                src={avatar[0]}
                alt={name}
              />
            ) : (
              <div className='flex items-center justify-center w-72 h-72 rounded-full text-[172px] bg-primary'>
                <span className='leading-3 font-roboto text-white'>
                  Q
                </span>
              </div>
            )}
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
