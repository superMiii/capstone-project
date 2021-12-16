import Home from '../views/pages/home';
import Favorite from '../views/pages/favorite';
import Sign_In from '../views/pages/sign_in';
import Sign_Up from '../views/pages/sign_up';
import allEvent from '../views/pages/all_event';
import eventCategory from '../views/pages/event_category';
import detail from '../views/pages/detail';
import my_account from '../views/pages/my_account';
import my_events from '../views/pages/my_events';
import upload_event from '../views/pages/upload_event';
import edit_event from '../views/pages/edit_event';
import searchEvent from '../views/pages/search_event';
import Admin from '../views/pages/admin';
import AdminUser from '../views/pages/admin_user';
import AdminEvents from '../views/pages/admin_events';
import AdminEventStatus from '../views/pages/admin_event_status';
import AdminUserRole from '../views/pages/admin_user_role';
 
const routes = {
  '/': Home, // default page
  '/home': Home,
  '/favorite': Favorite,
  '/sign_in': Sign_In,
  '/sign_up': Sign_Up,
  '/event-category/:id/:page': eventCategory,
  '/all_event/:id': allEvent,
  '/detail/:id': detail,
  '/my_account': my_account,
  '/my_events': my_events,
  '/upload_event': upload_event,
  '/edit_event/:id': edit_event,
  '/search_event/:id/:page': searchEvent,
  '/admin': Admin,
  '/admin_user': AdminUser,
  '/admin_user/:id': AdminUserRole,
  '/admin_events': AdminEvents,
  '/admin_events/:id': AdminEventStatus,
};
 
export default routes;