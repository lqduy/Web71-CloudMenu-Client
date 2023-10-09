import BottomHeader from '../BottomHeader';
import TopHeader from '../TopHeader';

const PageLayout = ({ children }) => {
  return (
    <>
      <TopHeader />
      <BottomHeader />
      {children}
    </>
  );
};

export default PageLayout;
