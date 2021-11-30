import Home from '../views/pages/home';
import Favorite from '../views/pages/favorite';
import Sign_In from '../views/pages/sign_in';
import Sign_Up from '../views/pages/sign_up';
import allEvent from '../views/pages/all_event';
 
const routes = {
  '/': Home, // default page
  '/home': Home,
  '/favorite': Favorite,
  '/sign_in': Sign_In,
  '/sign_up': Sign_Up,
  '/all_event': allEvent,
};
 
export default routes;