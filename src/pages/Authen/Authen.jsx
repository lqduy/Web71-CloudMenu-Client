import { Navigate, useLocation, Link } from 'react-router-dom';
import { PATH } from '~/routes';
import Signup from './Signup';
import Login from './Login';
import Logo from '~/assets/image/Kios/Kios_dark.png';
import { useSelector } from 'react-redux';

const Authen = () => {
  const { isAuthenticated } = useSelector(state => state.user);
  const location = useLocation();

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
        <div className='flex flex-col gap-4'>
          <img className='w-24' src={Logo} alt='Logo' />
          <h1 className='mb-0 text-white font-bold text-4xl font-sans leading-snug'>
            Quản lý dễ dàng
            <br /> Bán hàng đơn giản
          </h1>
          <Link
            to='/'
            type='submit'
            className='w-fit mt-4 px-6 py-3 text-center bg-white text-primary hover:text-white hover:bg-[#b6600e] rounded-2xl font-bold no-underline'
          >
            Tìm hiểu về chúng tôi
          </Link>
        </div>
      </div>
      <div className='flex md:w-3/5 h-screen justify-center py-10 items-center bg-white'>
        <div className='w-[37.75%] min-w-[432px]'>
          <AuthenForm />
        </div>
      </div>
    </div>
  );
};

export default Authen;
