import { Route, Routes } from 'react-router-dom';
import routes from './routes';
import PageLayout from './layouts/PageLayout';
import PrivateRoute from './components/PrivateRoute';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllPages } from './redux/page/pageActions';

const App = () => {
  const { reload: pageReload } = useSelector(state => state.page);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllPages());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageReload]);

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
