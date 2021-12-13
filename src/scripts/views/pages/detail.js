import EventsSource from "../../data/events-source";
import { createDetailTemplate } from "../templates/template-creator";
import UrlParser from "../../routes/url-parser";
import logout from "../../utils/logout";
import LikeButtonPresenter from "../../utils/like-button-presenter";
import FavoritesSource from "../../data/favorites-source";

const detail = {
    async render() {
      return `
        <div class="container-detail">
            <div class="detail d-flex align-items-center justify-content-center flex-column">
                <h1>Detail Event</h1>
                <p style="color: #17A471;">this is detail off event</p>
                <div class="inner-detail d-flex justify-content-center align-items-center flex-column">

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
        const userLocalStorage = JSON.parse(localStorage.getItem('user'));

        // ambil data id dari url
        const url = UrlParser.parseActiveUrlWithoutCombiner();
        const dataId = url.id;

        // ambil data dari API
        const detailEvent = await EventsSource.eventById(dataId);
        const details = detailEvent.data;

        // manipulasi innerdetail
        const innerDetailElement = document.querySelector(".inner-detail");
        innerDetailElement.innerHTML = createDetailTemplate(details);

        // logout
        logout();

        // like button
        const btnLike = document.querySelector('.button-like-container');
        if ( userLocalStorage ) {
          LikeButtonPresenter.init({
            buttonLikeContainer: btnLike,
            favorite: FavoritesSource,
            eventFavorite: {
              event_id: details.id,
              user_id: userLocalStorage.id,
              api_token: userLocalStorage.api_token,
            },
          });
        }
    },
  };

  export default detail;