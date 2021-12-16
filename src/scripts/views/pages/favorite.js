import logout from "../../utils/logout";
import addClassActive from "../../utils/add-class-active";
import FavoritesSource from "../../data/favorites-source";
import { createCardEventTemplate } from "../templates/template-creator";
import Swal from 'sweetalert2';

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
      const userSessionStorage = JSON.parse(sessionStorage.getItem('user'));

      // check jika blm login
      if(!userSessionStorage) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `Please login first to see your favorite events`,
        });
        location.href = '#/sign_in';
      }

      const favorites = await FavoritesSource.allFavorites(userSessionStorage.api_token);
      // manipulasi isi kontent
      const elementCard = document.querySelector(".inner-favorite");
      if(favorites.data.data.length == 0) {
        elementCard.innerHTML = '<h4 class="alert alert-danger text-center">Events favorite not found. Try to add some events to favorite</h4>';
      } else {
        favorites.data.data.forEach((i) => {
          elementCard.innerHTML += createCardEventTemplate(i.event) ;
        });
      }

      logout();
    },
  };
   
  export default Favorite;