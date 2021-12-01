import EventsSource from "../../data/events-source";
import { createCardEventTemplate, createPaginationItemTemplate } from "../templates/template-creator";
import manipulateNavbarLink from "../../utils/manipulate_navbar_link";

const allEvent = {
    async render() {
      return `
      <div class="conatiner-all-event">
        <div class="all-event d-flex flex-column align-items-center">
          <h1>All Event</h1>
          <div class="category-all-event d-flex flex-wrap flex-row justify-content-evenly">
            <div class="webinar">
              <div>
                <img src="./images/assets/webinar.png" alt=""> 
              </div>
              <p>Webinar</p>
            </div>
            <div class="contest">
              <div>
                <img src="./images/assets/contest.png" alt=""> 
              </div>
              <p>Contest</p>
            </div>
            <div class="scolarship">
              <div>
                <img src="./images/assets/beasiswa.png" alt="">
              </div>
              <p>Scolarship</p>
            </div>
            <div class="etc-event">
              <div>
                <img src="./images/assets/bookmark.png" alt="">
              </div>
              <p>Etc</p>
            </div>
          </div>
          <div class="inner-all-event">
            <div class="inner-all-event-card d-flex flex-wrap flex-row justify-content-center">
            
            </div>
          </div>
        </div>
      </div>
      `;
    },
   
    async afterRender() {
        const elementLinkNavAll = document.querySelector(".nav-allEvent a");
        const allNavLink = document.querySelectorAll('.nav-item .nav-link');
        manipulateNavbarLink(elementLinkNavAll, allNavLink);

        // const events = await EventsSource.allEvents();
        // const eventsElement = document.querySelector('.event-item');
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
        const elementInnerAllEvent = document.querySelector(".inner-all-event")
        const elementCard = document.querySelector(".inner-all-event-card");
        for (let i = 0; i < 5; i++) {
          elementCard.innerHTML += createCardEventTemplate();
        }

        // untuk menambahkan pagination
        elementInnerAllEvent.innerHTML += `
          ${createPaginationItemTemplate()}
        `
    },
  };
   
  export default allEvent;