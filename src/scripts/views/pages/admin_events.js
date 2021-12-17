import { Grid, html } from "gridjs";
import Swal from "sweetalert2";
import API_ENDPOINT from "../../globals/api-endpoint";
import logout from "../../utils/logout";

const AdminEvents = {
    async render() {
      return `
      <div class="wrapper d-flex align-items-stretch">
        <component-sidebar></component-sidebar>

        <div class="content container-fluid p-4 p-md-5 pt-5">
          <h1 class="mt-4">Events</h1>
          <ol class="breadcrumb">
              <li class="breadcrumb-item"><a href="#/admin">Dashboard</a></li>
              <li class="breadcrumb-item active" aria-current="page">Events</li>
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

      // check jika blm login
      if(!userSessionStorage) {
        Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `Please login first to access administrator`,
        });
        location.href = '#/sign_in';
      }
      // check jika user bukan admin
      if(userSessionStorage.role == 'user') {
        Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `Forbidden access administrator`,
        });
        location.href = '#/home';
      }

      // content
      const content = document.querySelector('.all-event');
      
      // grid
      new Grid({
        columns: ['Event Name', 'Category', 'status', 'Action'],
        server: {
            url: API_ENDPOINT.ADMIN_ALL_EVENTS(userSessionStorage.api_token),
            then: events => events.data.map(event => 
                [event.name, event.category.category_name, html(`<span class="badge ${event.status == 'waiting' ? 'bg-warning' : event.status == 'approved' ? 'bg-success' : 'bg-danger'}">${event.status}</span>`), html(`<a href="#/admin_events/${event.id}" class="badge btn-sign-up">Detail</a>`)]  
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
   
  export default AdminEvents;