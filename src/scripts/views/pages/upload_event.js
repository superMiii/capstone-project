import EventsSource from '../../data/events-source';
import { createUploadEventTemplate } from "../templates/template-creator";
import logout from '../../utils/logout';
import Swal from 'sweetalert2';

const upload_event = {
    async render() {
      return `
        <div class="container-my-account">
            <div class="my-account d-flex flex-column justify-content-center align-items-center">
                <div class="combined-title">
                    <h1>Upload Event</h1>
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

        // manipulasi dom inner-my-account
        const elementTitle = document.querySelector(".combined-title h1");
        const elementInnerMyAccount = document.querySelector(".inner-my-account");
        const userSessionStorage = JSON.parse(sessionStorage.getItem('user'));

        // check jika blm login
        if(!userSessionStorage) {
            Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `Please login first to add events`,
            });
            location.href = '#/sign_in';
        }

        // add event
        elementTitle.innerHTML = 'Upload Event';
        elementInnerMyAccount.innerHTML = createUploadEventTemplate();
        const imgInput = document.querySelector('#image-input');
        const formAddEvent = document.querySelector('#add-event');
        const imgPreview = document.querySelector('#preview-image');
        imgInput.onchange = (e) => {
            const [file] = imgInput.files;
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
            data.append('user_id', userSessionStorage.id);
            
            const addEvent = await EventsSource.addEvent(userSessionStorage.api_token, data);
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
   
  export default upload_event;