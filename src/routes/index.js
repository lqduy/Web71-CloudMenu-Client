import Authen from '~/pages/Authen';
import Home from '~/pages/Home';
import Dishes from '~/pages/Dishes';

export const PATH = {
  LOGIN: '/login',
  SIGNUP: '/signup'
};

const publicRoutes = [
  { path: '/', component: Home },
  { path: '/p/:pageId', component: Home },
  { path: PATH.LOGIN, component: Authen },
  { path: PATH.SIGNUP, component: Authen }
];

const privateRoutes = [
  { path: '/u/:userId', component: Home },
  { path: '/p/:pageId/dashboard', component: Home },
  { path: '/p/:pageId/dishes', component: Dishes }
];

const privateRoutesMapping = privateRoutes.map(route => ({ ...route, isPrivated: true }));

const routes = [...publicRoutes, ...privateRoutesMapping];
export default routes;
