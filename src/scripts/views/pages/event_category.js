import EventsSource from "../../data/events-source";
import CategoriesSource from "../../data/categories-source";
import { createCategoryTemplate, 
        createCardEventTemplate, 
        createPaginationItemTemplate,
        createPageNumber,
        } from "../templates/template-creator";
import UrlParser from "../../routes/url-parser";
import addClassActive from "../../utils/add-class-active";
import logout from "../../utils/logout";

const eventCategory = {
    async render() {
      return `
      <div class="conatiner-all-event">
        <div class="all-event d-flex flex-column align-items-center">
          <h1>Event By Category</h1>
          <p style="color: #17A471;">all event in here</p>
          <div class="category-all-event d-flex flex-wrap flex-row justify-content-evenly">
            
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
        addClassActive(elementLinkNavAll, allNavLink);

        const url = UrlParser.parseActiveUrlWithoutCombiner();
        const dataId = url.id;
        const dataPage = url.page;
        const events = await EventsSource.eventByCategory(dataId, dataPage);
        const eventsElement = document.querySelector('.inner-all-event-card');
        events.data.forEach((event) => {
          eventsElement.innerHTML += createCardEventTemplate(event) ;
        });

        // untuk menampilkan event berdasarkan category
        const categories = await CategoriesSource.allCategories();
        const categoryAllEvent = document.querySelector('.category-all-event');
        categories.data.forEach((category) => {
          categoryAllEvent.innerHTML += createCategoryTemplate(category);
        });

        // untuk menambahkan pagination
        const elementInnerAllEvent = document.querySelector(".inner-all-event");
        const pageOrigin = `${url.resource}/${url.id}`;
        elementInnerAllEvent.innerHTML += `
          ${createPaginationItemTemplate(events, pageOrigin)}
        `;
        // inner pagination
        const innerPageNumber = document.querySelector('.inner-page-number');
        for (let i = 1; i <= events.last_page; i++) {
          innerPageNumber.innerHTML += createPageNumber(pageOrigin, i);
        };
        // menambahkan class active ke pagination
        const destinationPageNum = document.querySelector(`.inner-page-number .page-number:nth-child(${dataPage}) .page-link`);
        const otherPageNum = document.querySelectorAll('.page-number .page-link');
        addClassActive(destinationPageNum, otherPageNum);

        // logout
        logout;
    },
  };
   
  export default eventCategory;