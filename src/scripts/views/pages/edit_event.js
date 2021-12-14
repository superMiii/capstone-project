import EventsSource from '../../data/events-source';
import { createUpdateEventTemplate } from "../templates/template-creator";
import logout from '../../utils/logout';
import UrlParser from '../../routes/url-parser';
import Swal from 'sweetalert2';

const edit_event = {
    async render() {
      return `
        <div class="container-my-account">
            <div class="my-account d-flex flex-column justify-content-center align-items-center">
                <div class="combined-title">
                    <h1>Edit Event</h1>
                    <p>you can upload your event in here</p>
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

        // ambil data id dari url
        const url = UrlParser.parseActiveUrlWithoutCombiner();
        const dataId = url.id;

        // ambil data dari API
        const oneEvent = await EventsSource.eventById(dataId);
        const dataEvent = oneEvent.data;

        // manipulasi dom inner-my-account
        const elementInnerMyAccount = document.querySelector(".inner-my-account");
        const userLocalStorage = JSON.parse(localStorage.getItem('user'));

        // edit event
        elementInnerMyAccount.innerHTML = createUpdateEventTemplate(dataEvent);
        const imgInput = document.querySelector('#image-input');
        const formEditEvent = document.querySelector('#edit-event');
        const imgPreview = document.querySelector('#preview-image');
        imgInput.onchange = (e) => {
            const [file] = imgInput.files;
            if(file) {
                imgPreview.src = URL.createObjectURL(file);
                imgPreview.className = 'img-thumbnail w-50';
            }
        };
        formEditEvent.addEventListener('submit', async (e) => {
            e.preventDefault();
            const idEvent = document.querySelector('#id-event');
            const imgInput = document.querySelector('#image-input');
            const name = document.querySelector('#name-event');
            const description = document.querySelector('#description-event');
            const time = document.querySelector('#time-event');
            const place = document.querySelector('#place-event');
            const date = document.querySelector('#date-event');
            const registerLink = document.querySelector('#register-link');
            const ticketPrice = document.querySelector('#ticket-price');
            const categoryId = document.querySelector('#category-event');
            const data = new FormData();
            data.append('_method', 'put');
            data.append('id', idEvent.value);
            if(imgInput.files[0]) {
                data.append('poster', imgInput.files[0]);
            }
            data.append('name', name.value);
            data.append('description', description.value);
            data.append('time', time.value);
            data.append('place', place.value);
            data.append('date', date.value);
            data.append('register_link', registerLink.value);
            data.append('ticket_price', ticketPrice.value);
            data.append('category_id', categoryId.value);
            data.append('user_id', userLocalStorage.id);
            
            const addEvent = await EventsSource.updateEvent(idEvent.value, userLocalStorage.api_token, data);
            if ( addEvent.status == true ) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Your work has been saved',
                    showConfirmButton: false,
                    timer: 1500
                });
                location.href = '#/my_events';
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `Something went wrong!`,
                });
            };
        });

        // logout
        logout();
    },
  };
   
  export default edit_event;