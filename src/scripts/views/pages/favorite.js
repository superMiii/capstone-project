import logout from "../../utils/logout";
import addClassActive from "../../utils/add-class-active";
import EventsSource from "../../data/events-source";
import { createCardEventTemplate } from "../templates/template-creator";

const Favorite = {
    async render() {
      return `
      <br>
      <div class="container-favorite">
        <div class="favorite d-flex flex-column align-items-center">
          <h1>My Favorite Event</h1>
          <p style="color: #17A471;">your favorite event in here</p>
          <div class="inner-favorite d-flex flex-wrap flex-row justify-content-center">
          </div>
        </div>
      </div>
      `;
    },
   
    async afterRender() {
      // manipulasi dom navbar
      const elementLinkNavFav = document.querySelector(".nav-favorite a");
      const allNavLink = document.querySelectorAll('.nav-item .nav-link');
      addClassActive(elementLinkNavFav, allNavLink);

      const events = await EventsSource.allEvents(2);

      // kodingan sementara @fahmi boleh diubah dengan API
      const elementCard = document.querySelector(".inner-favorite");
      events.data.forEach((event) => {
        elementCard.innerHTML += createCardEventTemplate(event) ;
      });

      logout();
    },
  };
   
  export default Favorite;