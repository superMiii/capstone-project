import { Grid, html } from "gridjs";
import API_ENDPOINT from "../../globals/api-endpoint";
import logout from "../../utils/logout";
import { createAdminUserTemplate } from "../templates/template-creator";

const AdminUser = {
    async render() {
      return `
      <div class="wrapper d-flex align-items-stretch">
        <component-sidebar></component-sidebar>

        <div class="content container-fluid p-4 p-md-5 pt-5">
          <h1 class="mt-4">User</h1>
          <ol class="breadcrumb">
              <li class="breadcrumb-item"><a href="#/admin">Dashboard</a></li>
              <li class="breadcrumb-item active" aria-current="page">User</li>
          </ol>
          
          <div class="all-event"></div>
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
      const content = document.querySelector('.all-event');
      
      // grid
      new Grid({
        columns: ['Name', 'Role', 'Action'],
        server: {
            url: API_ENDPOINT.ADMIN_ALL_USERS(userSessionStorage.api_token),
            then: users => users.data.map(user => 
                [user.name, user.role, html(`<a href="#/admin_user/${user.id}" class="badge btn-sign-up">Detail</a>`)]  
            ),
        },
        width: '100%',
        pagination: {
            enable: true,
            limit: 5,
        },
        search: true,
        sort: true,
      }).render(content);

      logout();

    }
  };
   
  export default AdminUser;