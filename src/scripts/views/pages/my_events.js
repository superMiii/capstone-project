import EventsSource from '../../data/events-source';
import { createTableEventTemplate } from "../templates/template-creator";
import logout from '../../utils/logout';
import updateEvent from '../../utils/updateEvent';

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
        const userLocalStorage = JSON.parse(localStorage.getItem('user'));

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
        myEvent.data.forEach((event, index) => {
            elementTable.innerHTML += createTableEventTemplate(event, index+1);
        });
        
        // delete event
        const btnDeleteEvent = document.querySelectorAll('#delete');
        for(let i=0; i<=btnDeleteEvent.length; i++) {
            btnDeleteEvent[i].addEventListener('click', async (e) => {
                e.preventDefault();
                const id = e.target.getAttribute('data-value');
                console.log(id);
                let confirmation = confirm('Are you sure want to delete?');
                const userLocalStorage = JSON.parse(localStorage.getItem('user'));
                if(confirmation) {
                    const deleteEvent = await EventsSource.deleteEvent(id, userLocalStorage.api_token);
                    if(deleteEvent.status == true) {
                        alert(deleteEvent.message);
                        location.href = '#/my_events';
                    } else {
                        alert(deleteEvent.message);
                    }
                }
            });
        }

        // logout
        logout();
    },
  };
   
  export default my_events;