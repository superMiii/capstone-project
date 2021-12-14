import AuthSource from '../data/auth-source';
import Swal from 'sweetalert2';

async function logout() {
    if(localStorage.getItem('user')) {
        const logoutBtn = document.querySelector('.sign-out');
        logoutBtn.addEventListener('click', async(e) => {
          e.preventDefault();
          const userLocalStorage = JSON.parse(localStorage.getItem('user'));

          let confirmation = await Swal.fire({
            title: 'Are you sure want to logout?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
            }).then((result) => {
                if (result.isConfirmed) {
                return true;
                }
            })
          if (confirmation == true) {
              const logout = await AuthSource.logout(userLocalStorage.api_token);
              if(logout.status == true){
                  localStorage.removeItem('user');
                  location.href = '#/sign_in';
              }
          }
        });
      }
}

export default logout;