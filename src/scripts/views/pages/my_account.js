import { createCardEventTemplate, createMyAccountTemplate, createUploadEventTemplate } from "../templates/template-creator";

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
                    <div class="navigatio-page-account d-flex justify-content-center align-items-center flex-wrap">
                        <button type="button" class="btn btn-myAccount btn-outline-dark"><h6>My Account</h6></button>
                        <button type="button" class="btn btn-myEvent btn-outline-dark"><h6>My Events</h6></button>
                        <button type="button" class="btn btn-uploadEvent btn-outline-dark"><h6>Upload Event</h6></button>
                    </div>
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

        // manipulasi dom inner-my-account
        const btnMyAccount = document.querySelector(".btn-myAccount")
        const btnMyEvent = document.querySelector(".btn-myEvent")
        const btnUploadEvent = document.querySelector(".btn-uploadEvent")
        const elementTitle = document.querySelector(".combined-title h1");
        const elementInnerMyAccount = document.querySelector(".inner-my-account");
        elementInnerMyAccount.innerHTML = createMyAccountTemplate();

        //manipulasi ketika button di klik
        btnMyAccount.addEventListener('click', function(){
            elementInnerMyAccount.innerHTML = '';
            elementTitle.innerHTML = 'My Account';
            elementInnerMyAccount.innerHTML = createMyAccountTemplate();
        })

        btnMyEvent.addEventListener('click', function() {
            elementInnerMyAccount.innerHTML = '';
            elementTitle.innerHTML = 'My Events';
            for (let i = 0; i < 5; i++) {
                elementInnerMyAccount.innerHTML += createCardEventTemplate();
            }
        })

        btnUploadEvent.addEventListener('click', function() {
            elementTitle.innerHTML = 'Upload Event';
            elementInnerMyAccount.innerHTML = createUploadEventTemplate();
        })
    },
  };
   
  export default my_account;