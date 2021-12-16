import EventsSource from '../../data/events-source';
import { createTableEventTemplate } from "../templates/template-creator";
import logout from '../../utils/logout';
import Swal from 'sweetalert2';

const my_events = {
    async render() {
      return `
        <div class="container-my-account">
            <div class="my-account d-flex flex-column justify-content-center align-items-center">
                <div class="combined-title">
                    <h1>My Events</h1>
                    <p>you can see your events in here</p>
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
        const elementInnerMyAccount = document.querySelector(".inner-my-account");
        const userSessionStorage = JSON.parse(sessionStorage.getItem('user'));

        // check jika blm login
        if(!userSessionStorage) {
            Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `Please login first to see your events`,
            });
            location.href = '#/sign_in';
        }
        
        const myEvent = await EventsSource.eventByUserId(userSessionStorage.id, userSessionStorage.api_token);
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
        myEvent.data.forEach((event, index) => {
            elementTable.innerHTML += createTableEventTemplate(event, index+1);
        });
        
        // delete event
        const btnDeleteEvent = document.querySelectorAll('.delete');
        for(let i=0; i<btnDeleteEvent.length; i++) {
            btnDeleteEvent[i].addEventListener('click', async (e) => {
                e.preventDefault();
                const id = e.target.getAttribute('data-value');
                const userSessionStorage = JSON.parse(sessionStorage.getItem('user'));

                let confirmation = await Swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                    }).then((result) => {
                        if (result.isConfirmed) {
                        return true;
                        }
                    })
                
                if(confirmation == true) {
                    const deleteEvent = await EventsSource.deleteEvent(id, userSessionStorage.api_token);
                    if(deleteEvent.status == true) {
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
                }
            });
        }

        // logout
        logout();
    },
  };
   
  export default my_events;