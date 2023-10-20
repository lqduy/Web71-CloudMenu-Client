import React from 'react';
import backgroundBanner from '../../../assets/image/blog/pexels-vincent-ma-janssen-1310777.jpg';

const Banner = () => {
  return (
    <div className=' relative  md:mt-20 ssm:mt-14 bg-white'>
      <div>
        <img
          src={backgroundBanner}
          className=' object-cover w-full lg:h-80 md:h-64 sm:h-52 ssm:h-36 '
        />
      </div>
      <div className=' absolute xl:left-40 lg:left-24 md:left-20 sm:left-10 top-2/3 sm:w-52 sm:h-52 bg-white flex items-center justify-center border border-gray-600 border-1 lg:w-72 lg:h-72 ssm:w-32 ssm:h-32 rounded-full shadow-lg shadow-orange-900'>
        <img
          className=' md:p-2 ssm:p-1  rounded-full object-cover lg:w-72 lg:h-72 sm:w-52 sm:h-52 ssm:w-32 ssm:h-32 shadow-2xl'
          src='https://picsum.photos/536/354'
          alt='Avatar Restaurant'
        />
      </div>

      <div className=' lg:w-96 md:w-72 sm:w-56 ssm:w-19 lg:pt-10 mb:pt-6  xl:left-1/3 lg:left-96 md:left-80 sm:left-72 ssm:left-36  absolute '>
        <p className='m-0 pl-5  lg:text-3xl md:text-lg font-bold font-roboto'>Nhà hàng Sài Gòn</p>
        <p className='m-0 pl-5 lg:text-lg ssm:text-sm'>
          Địa chỉ: 74 Nguyễn Thị Thập, Phường Tân Hưng, Quận 7, Thành phố Hồ Chí Minh
        </p>
      </div>
    </div>
  );
};

export default Banner;
