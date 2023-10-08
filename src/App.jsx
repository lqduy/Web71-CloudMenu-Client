import { Route, Routes } from 'react-router-dom';
import routes from './routes';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  return (
    <Routes>
      {routes.map(route => {
        const Page = route.component;
        let routeElement = <Page />;
        if (route.isPrivated) {
          routeElement = <PrivateRoute component={<Page />} />;
        }
        return <Route key={route.path} path={route.path} element={routeElement} />;
      })}
    </Routes>
  );
};

export default App;
