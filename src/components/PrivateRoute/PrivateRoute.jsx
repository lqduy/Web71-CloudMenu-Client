import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { PATH } from '~/routes';
import { TOKEN_TYPES } from '~/utils/constants';

const PrivateRoute = ({ component: Component }) => {
  // const { isAuthenticated, isLoading } = useSelector(state => state.user);
  // if (!isLoading && !isAuthenticated) {
  //   return <Navigate to={PATH.ABOUT_ME} />;
  // }

  const accessToken = localStorage.getItem(TOKEN_TYPES.ACCESS_TOKEN);
  if (!accessToken) {
    return <Navigate to={PATH.ABOUT_ME} />;
  }

  return <Component />;
};

export default PrivateRoute;
