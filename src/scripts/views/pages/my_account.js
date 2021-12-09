import UsersSource from '../../data/users-source';
import EventsSource from '../../data/events-source';
import { createTableEventTemplate, createMyAccountTemplate, createUploadEventTemplate } from "../templates/template-creator";
import logout from '../../utils/logout';
import updateEvent from '../../utils/updateEvent';

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
            elementInnerMyAccount.innerHTML = `
                    <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Event Name</th>
                            <th scope="col">Category</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody class="event-table">

                    </tbody>
                </table>    
            `;
            const elementTable = document.querySelector('.event-table');
            elementTitle.innerHTML = 'My Events';
            myEvent.data.forEach((event, index) => {
                elementTable.innerHTML += createTableEventTemplate(event, index+1);
            });
            const imgInput = document.querySelector('#image-input');
            const btnUpdateEvent = document.querySelectorAll('.submit-edit');
            const btnDeleteEvent = document.querySelector('#delete');
            const imgPreview = document.querySelector('#preview-image');
            // update event
            imgInput.onchange = (e) => {
                const [file] = imgInput.files;
                console.log(file);
                if(file) {
                    imgPreview.src = URL.createObjectURL(file);
                }
            };
            for (let i = 0; i <= btnUpdateEvent.length; i++) {
                btnUpdateEvent[i].addEventListener('click', async (e) => {
                    e.preventDefault();
                    updateEvent();
                });
            }

            // delete event
            btnDeleteEvent.addEventListener('click', async (e) => {
                e.preventDefault();
                const id = e.target.getAttribute('data-value');
                console.log(id);
                const userLocalStorage = JSON.parse(localStorage.getItem('user'));
                const deleteEvent = await EventsSource.deleteEvent()
            });
        })

        // add event
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

        // logout
        logout();
    },
  };
   
  export default my_account;