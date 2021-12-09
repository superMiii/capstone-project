import UsersSource from '../../data/users-source';
import { createMyAccountTemplate } from "../templates/template-creator";
import logout from '../../utils/logout';

const my_account = {
    async render() {
      return `
        <div class="container-my-account">
            <div class="my-account d-flex flex-column justify-content-center align-items-center">
                <div class="combined-title">
                    <h1>My Account</h1>
                    <p>you can see your acccount in here</p>
                </div>
                <div class="combined-page">
                    <div class="inner-my-account d-flex align-items-center flex-wrap justify-content-center">
                        
                    </div>
                </div>
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

        // ambil data dari API
        const elementInnerMyAccount = document.querySelector(".inner-my-account");
        const userLocalStorage = JSON.parse(localStorage.getItem('user'));
        const myAccount = await UsersSource.showProfile(userLocalStorage.api_token);
        elementInnerMyAccount.innerHTML = createMyAccountTemplate(myAccount);

        // logout
        logout();
    },
  };
   
  export default my_account;