import { Route, Routes } from 'react-router-dom';
import routes from './routes';
import PageLayout from './layouts/PageLayout';
import PrivateRoute from './components/PrivateRoute';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPagesOfUser } from './redux/page/pageActions';
import { fetchCurrentUser } from './redux/user/userActions';
import { setActivePage } from './redux/page/pageSlice';

const App = () => {
  const { reload: userReload, currentUser, isAuthenticated } = useSelector(state => state.user);
  const { reload: pageReload } = useSelector(state => state.page);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrentUser('652acc4d67abf081c37e1636'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userReload]);

  useEffect(() => {
    handleFetchPages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser, pageReload]);

  const handleFetchPages = async () => {
    if (!isAuthenticated) return;
    try {
      await dispatch(fetchPagesOfUser(currentUser._id));
      dispatch(setActivePage(currentUser.activePageId));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error fetching pages:', error);
    }
  };

  return (
    <div className='bg-[#eee] text-base'>
      <PageLayout>
        <Routes>
          {routes.map(route => {
            const Page = route.component;
            let routeElement = <Page />;
            if (route.isPrivated) {
              routeElement = <PrivateRoute component={Page} />;
            }
            return <Route key={route.path} path={route.path} element={routeElement} />;
          })}
        </Routes>
      </PageLayout>
    </div>
  );
};

export default App;
