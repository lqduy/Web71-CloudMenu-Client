import Authen from '~/pages/Authen';
import Home from '~/pages/Home';
import Dishes from '~/pages/Dishes';
import Menus from '~/pages/Menus';
import MenuDetails from '~/pages/MenuDetails';
import Landing from '~/pages/Landing/Landing';

export const PATH = {
  DASH_BOARD: '/u/dashboard',
  LOGIN: '/login',
  SIGNUP: '/signup'
};

const publicRoutes = [
  { path: '/', component: Home },
  { path: '/p/:pageId', component: Home },
  { path: PATH.LOGIN, component: Authen },
  { path: PATH.SIGNUP, component: Authen },
  { path: '/about-me', component: Landing }
];

const privateRoutes = [
  { path: '/u/:userId', component: Home },
  { path: PATH.DASH_BOARD, component: Home },
  { path: '/p/:pageId/dashboard', component: Home },
  { path: '/p/:pageId/dish', component: Dishes },
  { path: '/p/:pageId/menu', component: Menus },
  { path: '/m/:menuId', component: MenuDetails }
];

const privateRoutesMapping = privateRoutes.map(route => ({ ...route, isPrivated: true }));

const routes = [...publicRoutes, ...privateRoutesMapping];
export default routes;
