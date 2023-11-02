import Container from '~/components/Container';
import BottomHeader from '../BottomHeader';
import TopHeader from '../TopHeader';
import Footer from '../Footer';

const PageLayout = ({ children }) => {
  return (
    <>
      <TopHeader />
      <BottomHeader />
      <Container>{children}</Container>
      <div className='mt-4'>
        <Footer />
      </div>
    </>
  );
};

export default PageLayout;
