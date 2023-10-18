import BlogCard from './BlogCard';
import bgImage0 from '~/assets/image/blog/kinh-doanh-grab.jpg';
import bgImage1 from '~/assets/image/blog/dat-hang-online-1.jpg';
import bgImage2 from '~/assets/image/blog/blog1.png';
import bgImage3 from '~/assets/image/blog/qr-order-1.jpg';
import { motion } from 'framer-motion';

const data = [
  {
    imgSrc: bgImage0,
    title: 'Liên kết đơn hàng với Grab',
    description:
      'Nhận đơn đặt hàng qua Grabfood nhanh chóng. PosApp hỗ trợ đăng ký Grabfood nhanh chóng, in hóa đơn, in tem, in phiếu chế biến dễ dàng.'
  },
  {
    imgSrc: bgImage1,
    title: 'Hệ thống order Online',
    description:
      'Tạo website bán hàng, đặt hàng online dành cho khách. Phù hợp cho bán lẻ online, nhà hàng ăn uống, đặt lịch cho ngành spa, thẩm mỹ...'
  },
  {
    imgSrc: bgImage2,
    title: 'Giải pháp Kiosk order',
    description:
      'Hỗ trợ khách hàng tự đặt đồ, thanh toán trên Kiosk. Giúp gia tăng trải nghiệm khách hàng, tối ưu thời gian phục vụ'
  },
  {
    imgSrc: bgImage3,
    title: 'Hệ thống QR Order online',
    description: 'Dành cho nhà hàng ăn uống. Hỗ trợ khách hàng ngồi tại bàn tự order món'
  }
];

const Blog = () => {
  return (
    <motion.div
      whileInView='onscreen'
      viewport={{ once: true, amount: 0.8 }}
      initial={{ opacity: 0, y: -80 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ease: 'easeInOut', duration: 0.9, delay: 0.2 }}
    >
      <div className='py-2 pb-3 px-4 mx-auto max-w-screen-xl lg:py-10 lg:px-6'>
        <div className='mx-auto max-w-screen-md text-center mb-8 lg:mb-12'>
          <h2 className='mb-4 text-3xl tracking-tight font-bold text-gray-900 dark:text-white'>
            Kios - Giải pháp kinh doanh toàn diện
          </h2>
          <p className='mb-5 font-light text-gray-500 sm:text-xl dark:text-white'>
            Chúng tôi chuyên thiết kế phần mềm chuyên biệt cho từng ngành hàng, Có ngay một website
            cho riêng cửa hàng của bạn chỉ với 1 lần chạm.
          </p>
        </div>
      </div>

      <div className=' pb-30 space-y-8 lg:grid lg:grid-cols-4 sm:gap-6 xl:gap-10 lg:space-y-0'>
        {data.map(data => (
          <BlogCard {...data} key={data.title} />
        ))}
      </div>
    </motion.div>
  );
};

export default Blog;
