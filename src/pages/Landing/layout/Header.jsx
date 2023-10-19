import { useState } from 'react';
import { FiMenu, FiMoon, FiSun, FiX } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import useThemeSwitcher from '~/hooks/useThemeSwitcher';
import logoLight from '~/assets/image/Kios/Kios_dark.png';
import logoDark from '~/assets/image/Kios/Kios_light.png';
import { motion } from 'framer-motion';

const AppHeader = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [activeTheme, setTheme] = useThemeSwitcher();

  function toggleMenu() {
    if (!showMenu) {
      setShowMenu(true);
    } else {
      setShowMenu(false);
    }
  }

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      id='nav'
      className='w-full h-[100px] z-10 fixed top-0 left-1/2 -translate-x-1/2 shadow-xl rounded-lg bg-white dark:bg-[#FB8900] sm:container sm:mx-auto '
    >
      <div className='z-10 max-w-screen-lg xl:max-w-screen-xl block sm:flex sm:justify-between sm:items-center py-0'>
        {/* Header menu links and small screen hamburger menu */}
        <div className='flex justify-between items-center px-4 sm:px-0'>
          <div>
            <Link to='/'>
              {activeTheme === 'dark' ? (
                <img src={logoDark} className='w-20' alt='Dark Logo' />
              ) : (
                <img src={logoLight} className='w-20' alt='Dark Logo' />
              )}
            </Link>
          </div>

          {/* Theme switcher small screen */}
          <div
            onClick={() => setTheme(activeTheme)}
            aria-label='Theme Switcher'
            className='h-11 aspect-square sm:hidden ml-0 bg-gray-light dark:bg-ternary-dark p-3 shadow-sm rounded-xl cursor-pointer'
          >
            {activeTheme === 'dark' ? (
              <FiMoon className='text-ternary-dark hover:text-gray-400 dark:text-ternary-light dark:hover:text-primary-light text-xl' />
            ) : (
              <FiSun className='text-gray-200 hover:text-gray-50 text-xl' />
            )}
          </div>

          {/* Small screen hamburger menu */}
          <button
            onClick={toggleMenu}
            type='button'
            className='ct-flex-center h-11 aspect-square rounded-lg sm:hidden focus:outline-none'
            aria-label='Hamburger Menu'
          >
            {showMenu ? (
              <FiX className='text-3xl align-middle' />
            ) : (
              <FiMenu className='text-3xl align-middle' />
            )}
          </button>
        </div>

        {/* Header links small screen */}
        <div
          className={
            showMenu
              ? 'block bg-white m-0 sm:ml-4 sm:flex p-5 sm:p-0 justify-center items-center shadow-lg sm:shadow-none'
              : 'hidden'
          }
        >
          <Link
            to='/projects'
            className='block text-left text-lg text-primary-dark dark:text-ternary-light hover:text-secondary-dark dark:hover:text-secondary-light  sm:mx-4 mb-2 sm:py-2'
            aria-label='Projects'
          >
            Sản phẩm
          </Link>
          <Link
            to='/about'
            className='block text-left text-lg text-primary-dark dark:text-ternary-light hover:text-secondary-dark dark:hover:text-secondary-light  sm:mx-4 mb-2 sm:py-2 border-t-2 pt-3 sm:pt-2 sm:border-t-0 border-primary-light dark:border-secondary-dark'
            aria-label='About Me'
          >
            Giải pháp
          </Link>
          <Link
            to='/contact'
            className='block text-left text-lg text-primary-dark dark:text-ternary-light hover:text-secondary-dark dark:hover:text-secondary-light  sm:mx-4 mb-2 sm:py-2 border-t-2 pt-3 sm:pt-2 sm:border-t-0 border-primary-light dark:border-secondary-dark'
            aria-label='Contact'
          >
            Phí dịch vụ
          </Link>
          <Link
            to='/contact'
            className='block text-left text-lg text-primary-dark dark:text-ternary-light hover:text-secondary-dark dark:hover:text-secondary-light  sm:mx-4 mb-2 sm:py-2 border-t-2 pt-3 sm:pt-2 sm:border-t-0 border-primary-light dark:border-secondary-dark'
            aria-label='Contact'
          >
            Liên hệ
          </Link>
          <div className='border-t-2 pt-3 sm:pt-0 sm:border-t-0 border-primary-light dark:border-secondary-dark'>
            <span
              className='w-fit font-general-medium sm:hidden block text-left text-md bg-primary hover:bg-primary/80 text-white shadow-sm rounded-lg px-4 py-2 mt-2 duration-300 cursor-pointer'
              aria-label='Hire Me Button'
            >
              Đăng ký
            </span>
          </div>
        </div>

        {/* Header links large screen */}
        <div className='font-general-medium hidden m-0 sm:ml-4 mt-5 sm:mt-3 sm:flex p-5 sm:p-0 justify-center items-center shadow-lg sm:shadow-none'>
          <Link
            className=' no-underline  block text-left text-lg text-primary-dark dark:text-ternary-light hover:text-black dark:hover:text-black   sm:mx-4 mb-2 sm:py-2'
            aria-label='Projects'
          >
            Sản phẩm
          </Link>
          <Link
            className=' no-underline  block text-left text-lg text-primary-dark dark:text-ternary-light hover:text-black dark:hover:text-black  sm:mx-4 mb-2 sm:py-2'
            aria-label='About Me'
          >
            Giải pháp
          </Link>
          <Link
            to='/contact'
            className='no-underline  block text-left text-lg text-primary-dark dark:text-ternary-light hover:text-black dark:hover:text-black   sm:mx-4 mb-2 sm:py-2'
            aria-label='Contact'
          >
            Phí dịch vụ
          </Link>
          <Link
            className=' no-underline block text-left text-lg text-primary-dark dark:text-ternary-light hover:text-black dark:hover:text-black   sm:mx-4 mb-2 sm:py-2'
            aria-label='Contact'
          >
            Liên hệ
          </Link>
        </div>

        {/* Header right section buttons */}
        <div className='hidden sm:flex justify-between items-center flex-col md:flex-row'>
          <div className='hidden gap-2 md:flex'>
            <Link
              to='/signup'
              className=' no-underline text-white text-md font-general-medium bg-secondary-dark hover:bg-black rounded-md px-5 py-2.5 duration-300'
              aria-label='buttonSignup'
            >
              Đăng ký
            </Link>
            <Link
              to='/login'
              className='no-underline text-white text-md font-general-medium bg-secondary-dark hover:bg-black rounded-md px-5 py-2.5 duration-300'
              aria-label='buttonLogin'
            >
              Đăng nhập
            </Link>
          </div>

          {/* Theme switcher large screen */}
          <div
            onClick={() => setTheme(activeTheme)}
            aria-label='Theme Switcher'
            className='h-11 aspect-square ml-8 bg-primary-light dark:bg-ternary-dark p-3 shadow-sm rounded-xl cursor-pointer'
          >
            {activeTheme === 'dark' ? (
              <FiMoon className='text-ternary-dark hover:text-black dark:text-ternary-light dark:hover:text-black text-xl' />
            ) : (
              <FiSun className='text-gray-200 hover:text-gray-50 text-xl' />
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default AppHeader;
