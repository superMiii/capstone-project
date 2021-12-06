import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.css';
import '../styles/home.css';
import '../styles/sign_in.css';
import '../styles/sign_up.css';
import '../styles/card.css';
import '../styles/favorite.css';
import '../styles/all-event.css';
import '../styles/detail.css';
import '../styles/my-account.css';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './views/app';

// import component
import './component/component_navbar';
import './component/component_footer';
import logout from './utils/logout';

  const app = new App({
    content: document.querySelector('#mainContent'),
  });
  
  window.addEventListener('hashchange', () => {
    app.renderPage();
  });
  
  window.addEventListener('load', () => {
    app.renderPage();
  });

  if(localStorage.getItem('user')) {
    const logoutBtn = document.querySelector('.sign-out');
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      logout();
    });
  }