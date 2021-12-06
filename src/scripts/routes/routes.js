import Home from '../views/pages/home';
import Favorite from '../views/pages/favorite';
import Sign_In from '../views/pages/sign_in';
import Sign_Up from '../views/pages/sign_up';
import allEvent from '../views/pages/all_event';
import eventCategory from '../views/pages/event_category';
import detail from '../views/pages/detail';
import my_account from '../views/pages/my_account';
 
const routes = {
  '/': Home, // default page
  '/home': Home,
  '/favorite': Favorite,
  '/sign_in': Sign_In,
  '/sign_up': Sign_Up,
  '/event-category/:id': eventCategory,
  '/all_event/:id': allEvent,
  '/detail/:id': detail,
  '/my_account': my_account,
};
 
export default routes;