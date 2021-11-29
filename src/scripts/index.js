import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.css';
import '../styles/home.css';
import '../styles/sign_in.css';
import '../styles/sign_up.css';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './views/app';

// import component
import './component/component_navbar';
import './component/component_footer';

const app = new App({
    content: document.querySelector('#mainContent'),
  });
  
  window.addEventListener('hashchange', () => {
    app.renderPage();
  });
  
  window.addEventListener('load', () => {
    app.renderPage();
  });
