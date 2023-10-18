import AppBanner from '../../components/LandingPage/Banner';
import AppHeader from '../../components/LandingPage/Header';
import DataPricing from '../../components/LandingPage/Pricing/DataPricing';
import Blog from '../../components/LandingPage/BlogSection/BlogSection';
import Footer from '~/components/LandingPage/Footer';

const Landing = () => {
  return (
    <div className=' bg-secondary-light dark:bg-gradient-to-r from-primary-dark to-yellow-500 transition duration-300'>
      <div className='container mx-auto '>
        <AppHeader></AppHeader>
        <AppBanner></AppBanner>
        <DataPricing></DataPricing>
        <Blog></Blog>
        <Footer></Footer>
      </div>
    </div>
  );
};

export default Landing;
