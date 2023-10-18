import Logo from '../../image/Kios/Kios_light.png';
import { AiFillFacebook, AiFillInstagram, AiFillRedditSquare } from 'react-icons/ai';

const Footer = () => {
  return (
    <footer className=' absolute left-0 w-full bg-slate-100 dark:bg-gray-900'>
      <div className='container px-6 py-12 mx-auto'>
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4'>
          <div className='sm:col-span-2'>
            <div className=' flex flex-row items-center gap-4 pl-10 '>
              <img className='w-auto h-32' src={Logo} alt='Logo' />
              <div className=' font-semibold text-gray-800 xl:text-2xl dark:text-white'>
                Quản lý nhà hàng chuyên nghiệp
              </div>
            </div>
          </div>
          <div>
            <p className='font-bold text-gray-800 dark:text-white'>Doanh Nghiệp</p>
            <div className='flex flex-col items-start mt-5 space-y-2'>
              <a
                href='#'
                className='no-underline text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500'
              >
                Về Kios
              </a>
              <a
                href='#'
                className='no-underline text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500'
              >
                Khách hàng
              </a>
              <p className='text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 '>
                Email:{' '}
                <span className=' text-blue-500 hover: cursor-pointer'>hotro@kios.com.vn</span>
              </p>
            </div>
          </div>
          <div>
            <p className='font-bold text-gray-800 dark:text-white'>Địa chỉ</p>
            <div className='flex flex-col items-start mt-5 space-y-2'>
              <a
                href='#'
                className='no-underline text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500'
              >
                <b>Hà Nội:</b> Số 1B Yết Kiêu, quận Hoàn Kiếm
              </a>
              <a
                href='#'
                className='no-underline text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500'
              >
                <b>TP.HCM:</b> 412 Nguyễn Thị Minh Khai, Quận 3
              </a>
              <a
                href='#'
                className='no-underline text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500'
              >
                <b>Đà Nẵng</b> Số 110 Đống Đa, quận Hải Châu
              </a>
            </div>
          </div>
        </div>
        <hr className='my-6 border-gray-200 md:my-8 dark:border-gray-700' />
        <div className='flex  items-center justify-between '>
          <div className='text-gray-800 dark:text-white'>
            © 2023 Flowbite™. All Rights Reserved.
          </div>
          <div className='flex  -mx-2'>
            <a
              href='#'
              className='no-underline mx-2 text-gray-600 transition-colors duration-300 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400'
              aria-label='Reddit'
            >
              <AiFillRedditSquare className='w-5 h-5 fill-current' />
            </a>
            <a
              href='#'
              className=' no-underline mx-2 text-gray-600 transition-colors duration-300 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400'
              aria-label='Facebook'
            >
              <AiFillInstagram className='w-5 h-5 fill-current' />
            </a>
            <a
              href='#'
              className='no-underline mx-2 text-gray-600 transition-colors duration-300 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400'
              aria-label='Github'
            >
              <AiFillFacebook className='w-5 h-5 fill-current' />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
