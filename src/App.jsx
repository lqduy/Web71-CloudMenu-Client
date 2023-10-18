import { Route, Routes } from 'react-router-dom';
import routes from './routes';
import PageLayout from './layouts/PageLayout';
import PrivateRoute from './components/PrivateRoute';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentUser } from './redux/user/userActions';
import { fetchPagesOfUser } from './redux/page/pageActions';
import { setActivePage } from './redux/page/pageSlice';
import AuthenAPI from './services/authenAPI';
import CreatePage from './pages/Home/CreatePage';
import Landing from './pages/Landing/Landing';

const App = () => {
  const { reload: userReload, currentUser, isAuthenticated } = useSelector(state => state.user);
  const { reload: pageReload } = useSelector(state => state.page);
  const dispatch = useDispatch();

  useEffect(() => {
    login();
    // const accessToken = localStorage.getItem('accessToken');
    // if (accessToken) {
    //   dispatch(fetchCurrentUser());
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(fetchCurrentUser());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userReload]);

  const login = async () => {
    const loginData = {
      email: 'duy123@gmail.com',
      password: 'Aa123456!'
    };
    try {
      const response = await AuthenAPI.login(loginData);
      const accessToken = response.data.accessToken;
      if (accessToken) {
        localStorage.setItem('accessToken', accessToken);
        await dispatch(fetchCurrentUser());
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

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
    <>
      <div className='bg-[#eee] text-base'>
        <PageLayout>
          <Routes>
            <Route path='/landing' element={<Landing />} />

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
      <CreatePage />
    </>
  );
};

export default App;
