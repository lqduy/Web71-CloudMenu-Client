import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PageLayout from '~/layouts/PageLayout';
import { setCurrentView } from '~/redux/view/viewSlice';
import { VIEW_NAME } from '~/utils/constants';

const Likes = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCurrentView(VIEW_NAME.LIKE));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PageLayout>
      <h1>Like</h1>
    </PageLayout>
  );
};

export default Likes;
