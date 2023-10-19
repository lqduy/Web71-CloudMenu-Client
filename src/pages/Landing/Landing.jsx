import AppBanner from './layout/Banner';
import AppHeader from './layout/Header';
import DataPricing from './layout/Pricing/DataPricing';
import Blog from './layout/BlogSection/BlogSection';
import Footer from './layout/Footer';
import Container from '~/components/Container';

const Landing = () => {
  return (
    <div className=' bg-secondary-light dark:bg-gradient-to-r from-primary-dark to-yellow-500 transition duration-300'>
      <Container>
        <AppHeader />
        <AppBanner />
        <DataPricing />
        <Blog />
        <Footer />
      </Container>
    </div>
  );
};

export default Landing;
