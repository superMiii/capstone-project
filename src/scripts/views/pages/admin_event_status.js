import Swal from "sweetalert2";
import AdminSource from "../../data/admin-source";
import UrlParser from "../../routes/url-parser";
import logout from "../../utils/logout";
import { createAdminEventsTemplate } from "../templates/template-creator";

const AdminEventStatus = {
    async render() {
      return `
      <div class="wrapper d-flex align-items-stretch">
        <component-sidebar></component-sidebar>

        <div class="content container-fluid p-4 p-md-5 pt-5">
          <h1 class="mt-4">Change Status Events</h1>
          <ol class="breadcrumb">
              <li class="breadcrumb-item"><a href="#/admin">Dashboard</a></li>
              <li class="breadcrumb-item"><a href="#/admin_events">Events</a></li>
              <li class="breadcrumb-item active" aria-current="page">Change Status Event</li>
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
      // ambil data id dari url
      const url = UrlParser.parseActiveUrlWithoutCombiner();
      const dataId = url.id;
      
      // content
      const content = document.querySelector('.all-event');
      const event = await AdminSource.eventById(dataId, userSessionStorage.api_token);
      
      const ticket = event.data.ticket_price;
        const rubah = (angka) =>{
          var reverse = angka.toString().split('').reverse().join(''),
          ribuan = reverse.match(/\d{1,3}/g);
          ribuan = ribuan.join('.').split('').reverse().join('');
          return ribuan;
        }
        let formatRupiah = rubah(ticket);
      content.innerHTML = createAdminEventsTemplate(event.data, formatRupiah);

      // change status event
      const btnEditStatusEvent = document.querySelector('.edit-status');
      btnEditStatusEvent.addEventListener('click', async (e) => {
        e.preventDefault();
        const idEvent = document.querySelector('#id-event').value;
        const status = document.querySelector('#status-event').value;
        
        const data = {
          status: status
        }
        const editStatusEvent = await AdminSource.approvedEvent(idEvent, userSessionStorage.api_token, data);
        if ( editStatusEvent.status == true ) {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Your work has been saved',
                showConfirmButton: false,
                timer: 1500
            });
            location.href = '#/admin_events';
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `Something went wrong!`,
            });
        };
      });

      // hapus event
      const btnDeleteEvent = document.querySelector('.delete');
      btnDeleteEvent.addEventListener('click', async (e) => {
        e.preventDefault();
        const id = e.target.getAttribute('data-value');
        const userSessionStorage = JSON.parse(sessionStorage.getItem('user'));

        let confirmation = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                return true;
                }
            })
        
        if(confirmation == true) {
            const deleteEvent = await AdminSource.deleteEvent(id, userSessionStorage.api_token);
            if(deleteEvent.status == true) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Your work has been saved',
                    showConfirmButton: false,
                    timer: 1500
                });
                setTimeout(() => {
                    location.href='#/admin_events';
                }, 1500);
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `Something went wrong!`,
                });
            }
        }
      });

      logout();
    }
  };
   
  export default AdminEventStatus;