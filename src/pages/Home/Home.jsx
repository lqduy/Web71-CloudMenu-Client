import Container from '~/components/Container';
import PageLayout from '~/layouts/PageLayout';
import Body from './Body';

const Home = () => {
  return (
    <PageLayout>
      <Container>
        <Body />
      </Container>
    </PageLayout>
  );
};

export default Home;
