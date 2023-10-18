import Pricing from './Pricing';

const data = [
  {
    Title: 'Phần mềm quản lý bán hàng',
    Description: 'Phần mềm quản lý bán hàng phổ biến nhất với 20+ ngành hàng',
    price: 100,
    time: 'tháng',
    titleLists: [
      'Đơn giản quản lý hàng hóa, nhân sự',
      'Tối ưu quản lý bán hàng đa kênh',
      'Nâng cao chất lượng vận hành'
    ]
  },
  {
    Title: 'Sàn kết nối nguồn hàng tốt',
    Description: 'Dễ dàng truy cập báo cáo, theo dõi tăng trưởng doanh thu',
    price: 200,
    time: 'năm',
    titleLists: [
      'Nhà bán hàng tìm kiếm nguồn hàng  ',
      'Nhà Cung Cấp tìm kiếm đại lý phân phối ',
      'Nâng cao chất lượng vận hành'
    ]
  },
  {
    Title: 'Giải pháp thanh toán',
    Description: 'Giải pháp thanh toán - Vay vốn uy tín dành cho chủ shop',
    price: 300,
    time: 'tháng',
    titleLists: [
      'Tích hợp thanh toán QR',
      'Hỗ trợ vay vốn từ các đối tác tài chính ',
      'Giải pháp giao hàng dễ dàng'
    ]
  }
];

const DataPricing = () => {
  return (
    <section className='bg-white dark:bg-gradient-to-r from-primary-dark to-yellow-500'>
      <div className='py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6'>
        <div className='mx-auto max-w-screen-md text-center mb-8 lg:mb-12'>
          <h2 className='mb-4 text-3xl tracking-tight font-semibold text-gray-900 dark:text-white'>
            Kios giúp bạn quản lý dễ dàng, bán hàng hiệu quả.
          </h2>
          <p className='mb-5 font-light text-gray-500 sm:text-xl dark:text-white'>
            Chúng tôi chuyên thiết kế phần mềm chuyên biệt cho từng ngành hàng, Có ngay một website
            cho riêng cửa hàng của bạn chỉ với 1 lần chạm.
          </p>
        </div>
      </div>
      <div className='space-y-8 pb-10 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0'>
        {data.map(data => (
          <Pricing {...data} key={data.Title} />
        ))}
      </div>
    </section>
  );
};

export default DataPricing;
