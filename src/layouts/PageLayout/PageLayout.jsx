import Container from '~/components/Container';
import BottomHeader from '../BottomHeader';
import TopHeader from '../TopHeader';
import Footer from '../Footer';

const PageLayout = ({ children }) => {
  return (
    <div className='min-w-[1536px]'>
      <TopHeader />
      <BottomHeader />
      <Container>{children}</Container>
      <div className='mt-4'>
        <Footer />
      </div>
    </div>
  );
};

export default PageLayout;
