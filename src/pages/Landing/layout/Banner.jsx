import { Link } from 'react-router-dom';
import pictureBanner from '~/assets/image/Nut-CH-sieu-thi-mini-min.png';
import { motion } from 'framer-motion';

const AppBanner = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: 'linear', duration: 2, x: { duration: 1 } }}
      className='flex items-center lg:justify-evenly lg:flex-row ssm:flex-col ssm:justify-center h-screen'
      style={{ paddingTop: 100, paddingBottom: 30 }}
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
          <Link to='/signup'>
            <button className='h-12 px-8 bg-primary text-white hover:bg-[#b6600e] font-bold rounded-2xl cursor-pointer'>
              Dùng thử miễn phí
            </button>
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
