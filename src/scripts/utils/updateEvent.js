import EventsSource from "../data/events-source";

async function updateEvent() {

    const userLocalStorage = JSON.parse(localStorage.getItem('user'));
        const id = document.querySelector('#id-event').value;
        console.log(id)
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
        data.append('_method', 'PUT');
        data.append('id', id);
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
        
        const addEvent = await EventsSource.updateEvent(id, userLocalStorage.api_token, data);
        console.log(addEvent);
}

export default updateEvent;