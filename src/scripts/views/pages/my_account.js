import UsersSource from '../../data/users-source';
import { createFormChangePasswordTemplate, createFormUpdateProfileTemplate, createMyAccountTemplate } from "../templates/template-creator";
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

        // edit profile
        const btnEdit = document.querySelector('.edit-profile');
        btnEdit.addEventListener('click', (e) => {
            elementInnerMyAccount.innerHTML = '';
            elementInnerMyAccount.innerHTML = createFormUpdateProfileTemplate(myAccount);
            const imgInput = document.querySelector('#image-input');
            const formUpdateProfile = document.querySelector('#update-profile');
            const imgPreview = document.querySelector('#preview-image');
            imgInput.onchange = (e) => {
                const [file] = imgInput.files;
                if(file) {
                    imgPreview.src = URL.createObjectURL(file);
                    imgPreview.className = 'w-50';
                }
            };
            formUpdateProfile.addEventListener('submit', async (e) => {
                e.preventDefault();
                const imgInput = document.querySelector('#image-input');
                const name = document.querySelector('#name');
                console.log(imgInput.files[0]);
                const data = new FormData();
                data.append('_method', 'put');
                if(imgInput.files[0]) {
                    data.append('picture', imgInput.files[0]);
                }
                data.append('name', name.value);
                const updateProfile = await UsersSource.updateProfile(userLocalStorage.api_token, data);
                console.log(updateProfile);
                location.href= '#/my_account/';
            });
        });

        // change password
        const btnPassword = document.querySelector('.change-password');
        btnPassword.addEventListener('click', (e) => {
            elementInnerMyAccount.innerHTML = '';
            elementInnerMyAccount.innerHTML = createFormChangePasswordTemplate();
            const formChangePassword = document.querySelector('#change-pass');
            formChangePassword.addEventListener('submit', async(e) => {
                e.preventDefault();
                const passwordInput = document.querySelector('#password').value;
                const passwordConfirmationInput = document.querySelector('#password_confirmation').value;
                const data = {
                    password: passwordInput,
                    password_confirmation: passwordConfirmationInput
                };
                const changePass = await UsersSource.changePassword(userLocalStorage.api_token, data);
                if (changePass.status) {
                    alert(changePass.message);
                    location.href= '#/my_account/';
                } else {
                    alert(changePass.message.password);
                }
            })
        });

        // logout
        logout();
    },
  };
   
  export default my_account;