import manipulateNavbarLink from "../../utils/manipulate_navbar_link";
import { createCardEventTemplate } from "../templates/template-creator";

const Favorite = {
    async render() {
      return `
      <br>
      <div class="container-favorite">
        <div class="favorite d-flex flex-column align-items-center">
          <h1>My Favorite Event</h1>
          <br>
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
      manipulateNavbarLink(elementLinkNavFav, allNavLink);

      // kodingan sementara @fahmi boleh diubah dengan API
      const elementCard = document.querySelector(".inner-favorite");
      for (let i = 0; i < 5; i++) {
        elementCard.innerHTML += createCardEventTemplate();
      }
    },
  };
   
  export default Favorite;