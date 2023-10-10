import Container from '~/components/Container';
import BottomHeader from '../BottomHeader';
import TopHeader from '../TopHeader';

const PageLayout = ({ children }) => {
  return (
    <>
      <TopHeader />
      <BottomHeader />
      <Container>{children}</Container>
    </>
  );
};

export default PageLayout;
