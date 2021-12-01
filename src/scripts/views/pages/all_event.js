import EventsSource from "../../data/events-source";
import { createCardEventTemplate } from "../templates/template-creator";
import manipulateNavbarLink from "../../utils/manipulate_navbar_link";

const allEvent = {
    async render() {
      return `
        <div class="container">
          <div class="event-item">
          </div>
        </div>
      `;
    },
   
    async afterRender() {
        const elementLinkNavAll = document.querySelector(".nav-allEvent a");
        const allNavLink = document.querySelectorAll('.nav-item .nav-link');
        manipulateNavbarLink(elementLinkNavAll, allNavLink);

        // const events = await EventsSource.allEvents();
        const eventsElement = document.querySelector('.event-item');
        // events.data.forEach((event) => {
        //   eventsElement.innerHTML += `
        //   <div class="col-lg-4">
        //     <div class="card">
        //       <img src="${event.poster}" class="card-img-top" alt="...">
        //       <div class="card-body">
        //         <h5 class="card-title">${event.name}</h5>
        //         <p class="card-text">${event.description}</p>
        //         <a href="#" class="btn btn-primary">Go somewhere</a>
        //       </div>
        //     </div>
        //   </div>
        //   `;
        // });

        // codingan sementara @fahmi bisa kamu ganti panggil pake API
        eventsElement.innerHTML += createCardEventTemplate();
    },
  };
   
  export default allEvent;