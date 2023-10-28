import Authen from '~/pages/Authen';
import Home from '~/pages/Home';
import Dishes from '~/pages/Dishes';
import Menus from '~/pages/Menus';
import MenuDetails from '~/pages/MenuDetails';
import Landing from '~/pages/Landing/Landing';
import Likes from '~/pages/Likes';
import User from '~/pages/User/UserPage';
import Order from '~/pages/Orders';

export const PATH = {
  LOGIN: '/login',
  SIGNUP: '/signup',
  ABOUT_ME: '/about-me'
};

const publicRoutes = [
  { path: '/:pageId', component: User },
  { path: '/p/:pageId', component: Home },
  { path: PATH.LOGIN, component: Authen },
  { path: PATH.SIGNUP, component: Authen },
  { path: PATH.ABOUT_ME, component: Landing }
];

const privateRoutes = [
  { path: '/', component: Home },
  { path: '/u/:userId/like', component: Likes },
  { path: '/p/:pageId/dish', component: Dishes },
  { path: '/p/:pageId/menu', component: Menus },
  { path: '/p/:pageId/order', component: Order },
  { path: '/m/:menuId', component: MenuDetails }
];

const privateRoutesMapping = privateRoutes.map(route => ({ ...route, isPrivated: true }));

const routes = [...publicRoutes, ...privateRoutesMapping];
export default routes;
