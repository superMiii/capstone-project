import UsersSource from '../../data/users-source';
import { createFormChangePasswordTemplate, createFormUpdateProfileTemplate, createMyAccountTemplate } from "../templates/template-creator";
import logout from '../../utils/logout';
import Swal from 'sweetalert2';

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
        const userSessionStorage = JSON.parse(sessionStorage.getItem('user'));

        // check jika blm login
        if(!userSessionStorage) {
            Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `Please login first to see your profile`,
            });
            location.href = '#/sign_in';
        }

        const myAccount = await UsersSource.showProfile(userSessionStorage.api_token);
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
                    imgPreview.className = 'img-thumbnail rounded';
                }
            };
            formUpdateProfile.addEventListener('submit', async (e) => {
                e.preventDefault();
                const imgInput = document.querySelector('#image-input');
                const name = document.querySelector('#name');
                const data = new FormData();
                data.append('_method', 'put');
                if(imgInput.files[0]) {
                    data.append('picture', imgInput.files[0]);
                }
                data.append('name', name.value);
                const updateProfile = await UsersSource.updateProfile(userSessionStorage.api_token, data);
                if(updateProfile.status) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Your work has been saved',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    setTimeout(() => {
                        location.reload();
                    }, 1500);
                    const myAccountPicture = await UsersSource.showProfile(userSessionStorage.api_token);
                    userSessionStorage.picture = myAccountPicture.picture;
                    sessionStorage.setItem('user', JSON.stringify(userSessionStorage));
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: `Something went wrong!`,
                    });
                }
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
                const changePass = await UsersSource.changePassword(userSessionStorage.api_token, data);
                if (changePass.status) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Your work has been saved',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    setTimeout(() => {
                        location.reload();
                    }, 1500);
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: `Something went wrong!`,
                    });
                }
            })
        });

        // logout
        logout();
    },
  };
   
  export default my_account;