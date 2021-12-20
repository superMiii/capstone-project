import AuthSource from "../../data/auth-source";
import Swal from 'sweetalert2';

const Sign_In = {
    async render() {
      return `
        <div class="container-sign-in">
            <div class="sign-in">
                <h1>Sign In</h1>
                <form id="formLogin">
                  <label for="email">Email:</label><br>
                  <input type="email" id="email" name="email"><br><br>
                  <label for="password">Password:</label><br>
                  <input type="password" id="password" name="password"><br><br>
                  <button class="btn-submit-sme" id="btnLogin" type="submit">Submit</button>
                </form>
                <p>Don’t have any account ? <a href="#/sign_up">Sign Up</a></p>
            </div>
        </div>
      `;
    },
   
    async afterRender() {
    // manipulasi dom navbar
      const navbarLink = document.querySelectorAll('.nav-item .nav-link');
      for (let i = 0; i < navbarLink.length; i++) {
          navbarLink[i].classList.remove('active');
      }

      const formLogin = document.querySelector('#formLogin');
      formLogin.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.querySelector('#email');
        const password = document.querySelector('#password');

        const data = {
          email: email.value,
          password: password.value
        };
        this._login(data);
      });
    },

    async _login(data) {
      const login = await AuthSource.login(data);
      // yid buat validasi di frone-end nya ini masih kureng banget, nnti tinggal refactor lagi aja ya code nya
      if(login.status == false) {
        if(login.message.email || login.message.password) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${login.message.email}`,
          });
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${login.message.password}`,
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${login.message}`,
          });
        }
      } else {
        if ( login.data.user.role == "admin" ) {
          const dataLogin = {
            id: login.data.user.id,
            name: login.data.user.name,
            role: login.data.user.role,
            picture: login.data.user.picture,
            api_token: login.data.api_token,
          };
          sessionStorage.setItem('user', JSON.stringify(dataLogin));
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: `${login.message}`,
            showConfirmButton: false,
            timer: 1500
          });
          location.href = '#/my_account';
        }else{
          const dataLogin = {
            id: login.data.user.id,
            name: login.data.user.name,
            role: login.data.user.role,
            picture: login.data.user.picture,
            api_token: login.data.api_token,
          };
          sessionStorage.setItem('user', JSON.stringify(dataLogin));
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: `${login.message}`,
            showConfirmButton: false,
            timer: 1500
          });
          location.href = '#/my_account';
        }
      }
    }
  };
   
  export default Sign_In;