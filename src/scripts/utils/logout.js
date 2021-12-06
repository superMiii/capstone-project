import AuthSource from '../data/auth-source';

async function logout() {
    if(localStorage.getItem('user')) {
        const logoutBtn = document.querySelector('#sign-out');
        logoutBtn.addEventListener('click', async(e) => {
          e.preventDefault();
          let confirmation = confirm('Are you sure want to logout?');
          const userLocalStorage = JSON.parse(localStorage.getItem('user'));
          if (confirmation) {
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