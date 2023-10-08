import { Navigate, useLocation } from 'react-router-dom';
import { PATH } from '~/routes';
import Signup from './Signup';
import Login from './Login';

const Authen = () => {
  const location = useLocation();
  const isAuthenticated = false;

  if (isAuthenticated) {
    return <Navigate to={'/'} />;
  }

  const AuthenForm = () => {
    const { pathname } = location;
    if (pathname === PATH.SIGNUP) {
      return <Signup />;
    } else if (pathname === PATH.LOGIN) {
      return <Login />;
    }
    return null;
  };

  return <AuthenForm />;
};

export default Authen;
