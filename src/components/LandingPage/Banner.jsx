import { Link } from 'react-router-dom';
import pictureBanner from '../../image/Nut-CH-sieu-thi-mini-min.png';
import { motion } from 'framer-motion';

const AppBanner = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: 'linear', duration: 2, x: { duration: 1 } }}
      className='flex items-center 2xl:justify-evenly 2xl:flex-row ssm:flex-col'
      style={{ paddingTop: 116, paddingBottom: 30 }}
    >
      <div className='w-full md:w-1/3 text-left'>
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            ease: 'easeInOut',
            duration: 0.9,
            delay: 0.1
          }}
          className=' font-bold text-2xl lg:text-3xl xl:text-3xl text-center sm:text-left text-ternary-dark dark:text-primary-light uppercase'
        >
          Phần mềm quản lý bán hàng phổ biến nhất
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            ease: 'easeInOut',
            duration: 0.9,
            delay: 0.2
          }}
          className='font-general-medium mt-4 md:text-xl lg:text-xl xl:text-xl text-center sm:text-left leading-normal text-gray-500 dark:text-gray-200'
        >
          Quản lý hàng hoá theo mã vạch, chủng loại - Quản lý doanh thu cửa hàng, kho hàng chặt chẽ
          theo ngày, ca làm việc nhân viên
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            ease: 'easeInOut',
            duration: 0.9,
            delay: 0.3
          }}
          className='flex justify-center sm:block'
        >
          <Link
            to='/signup'
            className=' no-underline font-general-medium flex justify-center items-center w-36 sm:w-48 mt-12 mb-6 sm:mb-0 text-lg border border-indigo-200 py-2.5 sm:py-3 shadow-lg rounded-lg bg-indigo-50 focus:ring-1 hover:bg-black text-gray-500 hover:text-white duration-500'
          >
            <span className='text-sm sm:text-lg font-general-medium duration-100'>
              Dùng thử miễn phí
            </span>
          </Link>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: -80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ease: 'easeInOut', duration: 0.9, delay: 0.2 }}
        className='w-full sm:w-1/2 text-center sm:text-right float-right mt-8 sm:mt-0'
      >
        <img className='w-5/6' src={pictureBanner} alt='Banner' />
      </motion.div>
    </motion.section>
  );
};

export default AppBanner;
