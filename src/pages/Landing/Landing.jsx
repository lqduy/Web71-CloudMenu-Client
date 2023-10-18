import AppBanner from './layout/Banner';
import AppHeader from './layout/Header';
import DataPricing from './layout/Pricing/DataPricing';
import Blog from './layout/BlogSection/BlogSection';
import Footer from './layout/Footer';

const Landing = () => {
  return (
    <div className=' bg-secondary-light dark:bg-gradient-to-r from-primary-dark to-yellow-500 transition duration-300'>
      <div className='container mx-auto '>
        <AppHeader />
        <AppBanner />
        <DataPricing />
        <Blog />
        <Footer />
      </div>
    </div>
  );
};

export default Landing;
