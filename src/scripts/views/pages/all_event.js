import EventsSource from "../../data/events-source";
import { createCardEventTemplate, createPaginationItemTemplate } from "../templates/template-creator";
import manipulateNavbarLink from "../../utils/manipulate_navbar_link";

const allEvent = {
    async render() {
      return `
      <div class="conatiner-all-event">
        <div class="all-event d-flex flex-column align-items-center">
          <h1>All Event</h1>
          <p style="color: #17A471;">all event in here</p>
          <div class="category-all-event d-flex flex-wrap flex-row justify-content-evenly">
            <div class="webinar">
              <a href="#">
                <div>
                  <img src="./images/assets/webinar.png" alt=""> 
                </div>
                <p>Webinar</p>
              </a>
            </div>
            <div class="contest">
              <a href="#">
                <div>
                  <img src="./images/assets/contest.png" alt=""> 
                </div>
                <p>Contest</p>
              </a>
            </div>
            <div class="scolarship">
              <a href="#">
                <div>
                  <img src="./images/assets/beasiswa.png" alt="">
                </div>
                <p>Scolarship</p>
              </a>
            </div>
            <div class="etc-event">
              <a href="#">
                <div>
                  <img src="./images/assets/bookmark.png" alt="">
                </div>
                <p>Etc</p>
              </a>
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

        const events = await EventsSource.allEvents();
        console.log(events);
        const eventsElement = document.querySelector('.inner-all-event-card');
        events.data.forEach((event) => {
          eventsElement.innerHTML += createCardEventTemplate(event) ;
        });

        // // codingan sementara @fahmi bisa kamu ganti panggil pake API
        // const elementInnerAllEvent = document.querySelector(".inner-all-event")
        // const elementCard = document.querySelector(".inner-all-event-card");
        // for (let i = 0; i < 5; i++) {
        //   elementCard.innerHTML += createCardEventTemplate();
        // }

        // // untuk menambahkan pagination
        // elementInnerAllEvent.innerHTML += `
        //   ${createPaginationItemTemplate()}
        // `
    },
  };
   
  export default allEvent;