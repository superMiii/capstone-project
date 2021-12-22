import Swal from "sweetalert2";
import AdminSource from "../../data/admin-source";
import UrlParser from "../../routes/url-parser";
import logout from "../../utils/logout";
import { createAdminUserTemplate } from "../templates/template-creator";

const AdminUserRole = {
    async render() {
      return `
      <div class="wrapper d-flex align-items-stretch">
        <component-sidebar></component-sidebar>

        <div class="content container-fluid p-4 p-md-5 pt-5">
          <h1 class="mt-4">Detail User</h1>
          <ol class="breadcrumb">
              <li class="breadcrumb-item"><a href="#/admin">Dashboard</a></li>
              <li class="breadcrumb-item"><a href="#/admin_user">User</a></li>
              <li class="breadcrumb-item active" aria-current="page">Detail</li>
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
      
      // ambil data id dari url
      const url = UrlParser.parseActiveUrlWithoutCombiner();
      const dataId = url.id;
      
      // content
      const content = document.querySelector('.all-event');
      const user = await AdminSource.userById(dataId, userSessionStorage.api_token);
      
      content.innerHTML = createAdminUserTemplate(user.data);

      // change role user
      const btnEditRoleUser = document.querySelector('.edit-role');
      btnEditRoleUser.addEventListener('click', async (e) => {
        e.preventDefault();
        const idUser = document.querySelector('#id-user').value;
        const role = document.querySelector('#role-user').value;
        
        const data = {
          role: role
        }
        const editRoleUser = await AdminSource.changeRoleUser(idUser, userSessionStorage.api_token, data);
        if ( editRoleUser.status == true ) {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Your work has been saved',
                showConfirmButton: false,
                timer: 1500
            });
            setTimeout(() => {
                location.reload();
              }, 1600);
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `Something went wrong!`,
            });
        };
      });

      // hapus user
      const btnDeleteUser = document.querySelector('.delete');
      btnDeleteUser.addEventListener('click', async (e) => {
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
            const deleteUser = await AdminSource.deleteUser(id, userSessionStorage.api_token);
            if(deleteUser.status == true) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Your work has been saved',
                    showConfirmButton: false,
                    timer: 1500
                });
                setTimeout(() => {
                    location.href='#/admin_user';
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
   
  export default AdminUserRole;