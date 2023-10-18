import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ component: Component }) => {
  const { isAuthenticated, isLoading } = useSelector(state => state.user);

  if (!isLoading && !isAuthenticated) {
    return <Navigate to={'/login'} />;
  }

  return <Component />;
};

export default PrivateRoute;
