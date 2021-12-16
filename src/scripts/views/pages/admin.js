import AdminSource from "../../data/admin-source";
import logout from "../../utils/logout";
import { createDashboardTemplate } from "../templates/template-creator";

const Admin = {
    async render() {
      return `
      <div class="wrapper d-flex align-items-stretch">
        <component-sidebar></component-sidebar>

        <div class="content container-fluid p-4 p-md-5 pt-5">
            
        </div>
    </div>
      `;
    },
   
    async afterRender() {
    // manipulasi dom navbar
    const navbarLink = document.querySelectorAll('.nav-item .nav-link');
    for (let i = 0; i < navbarLink.length; i++) {
        navbarLink[i].classList.remove('active');
    };

    // button sidebar
    const sideBar = document.querySelector('component-sidebar');
    const btnSidebar = document.querySelector('#sidebarCollapse');
    btnSidebar.addEventListener('click', function() {
        sideBar.classList.toggle('active');
    });

    const userSessionStorage = JSON.parse(sessionStorage.getItem('user'));

    // content
    const content = document.querySelector('.content');
    const countUsers = await AdminSource.allUsers(userSessionStorage.api_token);
    const countEvents = await AdminSource.allEvents(userSessionStorage.api_token);
    content.innerHTML = createDashboardTemplate(countEvents, countUsers);

    logout();
    }
  };
   
  export default Admin;