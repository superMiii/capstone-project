import UsersSource from '../../data/users-source';
import EventsSource from '../../data/events-source';
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
        const userLocalStorage = JSON.parse(localStorage.getItem('user'));
        const myAccount = await UsersSource.showProfile(userLocalStorage.api_token);
        elementInnerMyAccount.innerHTML = createMyAccountTemplate(myAccount);

        //manipulasi ketika button di klik
        btnMyAccount.addEventListener('click', function(){
            elementInnerMyAccount.innerHTML = '';
            elementTitle.innerHTML = 'My Account';
            elementInnerMyAccount.innerHTML = createMyAccountTemplate(myAccount);
        })

        btnMyEvent.addEventListener('click', async function() {
            const myEvent = await EventsSource.eventByUserId(userLocalStorage.id, userLocalStorage.api_token);
            elementInnerMyAccount.innerHTML = '';
            elementTitle.innerHTML = 'My Events';
            myEvent.data.forEach((event) => {
                elementInnerMyAccount.innerHTML += createCardEventTemplate(event);
            });
        })

        btnUploadEvent.addEventListener('click', function() {
            elementTitle.innerHTML = 'Upload Event';
            elementInnerMyAccount.innerHTML = createUploadEventTemplate();
            const imgInput = document.querySelector('#image-input');
            const formAddEvent = document.querySelector('#add-event');
            const imgPreview = document.querySelector('#preview-image');
            imgInput.onchange = (e) => {
                const [file] = imgInput.files;
                console.log(file);
                if(file) {
                    imgPreview.src = URL.createObjectURL(file);
                    imgPreview.className = 'img-thumbnail w-50';
                }
            };
            formAddEvent.addEventListener('submit', async (e) => {
                e.preventDefault();
                const imgInput = document.querySelector('#image-input');
                const name = document.querySelector('#name-event');
                const description = document.querySelector('#description-event');
                const time = document.querySelector('#time-event');
                const place = document.querySelector('#place-event');
                const date = document.querySelector('#date-event');
                const registerLink = document.querySelector('#register-link');
                const ticketPrice = document.querySelector('#ticket-price');
                const categoryId = document.querySelector('#category-event');
                console.log(name.value);
                const data = new FormData();
                data.append('poster', imgInput.files[0]);
                data.append('name', name.value);
                data.append('description', description.value);
                data.append('time', time.value);
                data.append('place', place.value);
                data.append('date', date.value);
                data.append('register_link', registerLink.value);
                data.append('ticket_price', ticketPrice.value);
                data.append('category_id', categoryId.value);
                data.append('user_id', userLocalStorage.id);
                
                const addEvent = await EventsSource.addEvent(userLocalStorage.api_token, data);
                console.log(addEvent);
            });

        });
    },
  };
   
  export default my_account;