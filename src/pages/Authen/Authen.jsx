import { Navigate, useLocation, Link } from 'react-router-dom';
import { PATH } from '~/routes';
import Signup from './Signup';
import Login from './Login';
import Logo from '~/assets/image/Kios/Kios_dark.png';

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

  return (
    <div className='h-screen md:flex'>
      <div className='relative overflow-hidden md:flex w-2/5 bg-gradient-to-tr from-orange-500 to-yellow-400 i justify-around items-center hidden'>
        <div>
          <img className='w-20' src={Logo} alt='Logo' />
          <h1 className='text-white font-bold text-4xl font-sans'>Quản lý dễ dàng</h1>
          <h1 className='text-white font-bold text-4xl font-sans'>Bán hàng đơn giản</h1>
          <Link
            to='/'
            type='submit'
            className='block text-center w-28 bg-white text-[#F98416] hover:text-black hover:bg-[#b6600e] mt-4 py-2 rounded-2xl font-bold mb-2'
          >
            Trang Chủ
          </Link>
        </div>
      </div>
      <div className='flex md:w-3/5 justify-center py-10 items-center bg-white'>
        <AuthenForm />
      </div>
    </div>
  );
};

export default Authen;
