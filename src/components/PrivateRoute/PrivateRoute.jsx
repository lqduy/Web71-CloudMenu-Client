import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ component: Component }) => {
  const isAuthenticated = true;

  if (!isAuthenticated) {
    return <Navigate to={'/login'} />;
  }

  return <Component />;
};

export default PrivateRoute;
