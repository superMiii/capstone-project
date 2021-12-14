import EventsSource from "../../data/events-source";
import { createCardEventTemplate } from "../templates/template-creator";
import addClassActive from "../../utils/add-class-active";
import logout from "../../utils/logout";

const Home = {
    async render() {
      return `
        <div class="description d-flex justify-content-around flex-wrap align-items-center">
          <div class="description-sme">
              <h2>Share My Event</h2>
              <h3>Let’s <span>find</span> your</h3>
              <h3><span>event</span> today</h3>
              <p>You are free to share and find updated information about online events</p>
              ${localStorage.getItem('user') 
                ? `
                <a href="#/upload_event" >Get Started</a>
                ` : `
                <a href="#/sign_in" >Get Started</a>
                `}
          </div>
          <div class="description-img">
            <img loading="lazy" src="./images/heros/myhero.jpg" alt="">
          </div>
        </div>

        <div class="container-benefit">
          <div class="benefit">
            <div class="title-benefit">
              <h2>Our Benefit</h2>
              <h3>Find Event Faster</h3>
            </div>
            <div class="all-benefit d-flex justify-content-around flex-wrap">
              <div class="benefit-sme">
                <div>
                  <img loading="lazy" src="./images/benefit/faster.png" alt=""> 
                </div>
                <h4>Faster</h4>
                <p>search for events faster with the category feature</p>
              </div>
              <div class="benefit-sme">
                <div>
                  <img loading="lazy" src="./images/benefit/better.png" alt=""> 
                </div>
                <h4>Better</h4>
                <p>better than searching for events manually</p>
              </div>
              <div class="benefit-sme">
                <div>
                  <img loading="lazy" src="./images/benefit/trusted.png" alt="">
                </div>
                <h4>Trusted</h4>
                <p>trusted because it presents quality events</p>
              </div>
            </div>
          </div>
        </div>

        <div class="newEvent">
          <div class="newEvent-title">
            <h2>New Event</h2>
            <h3>Five latest events</h3>
          </div>
          <div class="carouselEvent">
            <div class="container-carouselEvent d-flex flex-wrap justify-content-evenly">
              <div id="carouselControls" class="carousel carousel-dark slide justify-content-center" data-bs-ride="carousel">
                
                <div class="carousel-inner">
                  
                </div>

                <button class="carousel-control-prev" type="button" data-bs-target="#carouselControls" data-bs-slide="prev">
                  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselControls" data-bs-slide="next">
                  <span class="carousel-control-next-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Next</span>
                </button>
              </div>
              <div class="description-new-event">
                <h1>Latest events</h1>
                <p>Please choose the event you want and register immediately, because you might run out of tickets</p>
              </div>
            </div>
          </div>
        </div>
      `;
    },
   
    async afterRender() {
      // manipulasi dom navbar
      const elementLinkNavHome = document.querySelector(".nav-home a");
      const allNavLink = document.querySelectorAll('.nav-item .nav-link');
      addClassActive(elementLinkNavHome, allNavLink);

      // ambil data latest
      const latestEvent = await EventsSource.latestEvent(5);
      const latestEventElement = document.querySelector('.carousel-inner');
      latestEvent.forEach((event) => {
        latestEventElement.innerHTML += `<div class="carousel-item">
            ${createCardEventTemplate(event)}
            </div>`
      });

      // kodingan untuk tambah class active biar card muncul di carousel
      // class active harus cuman satu di child pertama
      const carouselItem = document.querySelector(".carousel-item:nth-child(1)");
      carouselItem.classList.add("active");

      logout();
    },
  };
   
  export default Home;