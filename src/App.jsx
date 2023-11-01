import { Route, Routes } from 'react-router-dom';
import routes from './routes';
import PrivateRoute from './components/PrivateRoute';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentUser } from './redux/user/userActions';
import { fetchPagesOfUser } from './redux/page/pageActions';
import { setActivePage } from './redux/page/pageSlice';
import PageForm from './pages/Home/PageForm';
import { TOKEN_TYPES } from './utils/constants';
import ProfileUser from './pages/ProfileUser/ProfileUser';

const App = () => {
  const { reload: userReload, currentUser, isAuthenticated } = useSelector(state => state.user);
  const { reload: pageReload } = useSelector(state => state.page);
  const dispatch = useDispatch();

  useEffect(() => {
    const accessToken = localStorage.getItem(TOKEN_TYPES.ACCESS_TOKEN);
    if (accessToken) {
      dispatch(fetchCurrentUser());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchCurrentUser());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userReload]);

  useEffect(() => {
    if (isAuthenticated) {
      handleFetchPages();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser, pageReload]);

  const handleFetchPages = async () => {
    try {
      await dispatch(fetchPagesOfUser(currentUser._id));
      dispatch(setActivePage(currentUser.activePageId));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error fetching pages:', error);
    }
  };

  return (
    <>
      <div className='bg-[#eee] text-base'>
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
      </div>
      <PageForm />
      <ProfileUser />
    </>
  );
};

export default App;
