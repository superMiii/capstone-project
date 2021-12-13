import logout from "../../utils/logout";
import addClassActive from "../../utils/add-class-active";
import FavoritesSource from "../../data/favorites-source";
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

      // ambil data dari API
      const userLocalStorage = JSON.parse(localStorage.getItem('user'));
      const favorites = await FavoritesSource.allFavorites(userLocalStorage.api_token);
      // manipulasi isi kontent
      const elementCard = document.querySelector(".inner-favorite");
      favorites.data.data.forEach((i) => {
        console.log(i);
        elementCard.innerHTML += createCardEventTemplate(i.event) ;
      });

      logout();
    },
  };
   
  export default Favorite;