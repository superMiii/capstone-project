import manipulateNavbarLink from "../../utils/manipulate_navbar_link";

const Home = {
    async render() {
      return `
        <div class="description d-flex justify-content-around flex-wrap align-items-center">
          <div class="description-sme">
              <h2>Share My Event</h2>
              <h3>Let’s <span>find</span> your</h3>
              <h3><span>event</span> today</h3>
              <p>You are free to share and find updated information about online events</p>
              <a href="#" >Get Started</a>
          </div>
          <div class="description-img">
            <img src="./images/heros/hero-image_1.jpg" alt="">
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
                  <img src="./images/benefit/faster.png" alt=""> 
                </div>
                <h4>Faster</h4>
                <p>search for events faster with the category feature</p>
              </div>
              <div class="benefit-sme">
                <div>
                  <img src="./images/benefit/better.png" alt=""> 
                </div>
                <h4>Better</h4>
                <p>better than searching for events manually</p>
              </div>
              <div class="benefit-sme">
                <div>
                  <img src="./images/benefit/trusted.png" alt="">
                </div>
                <h4>Trusted</h4>
                <p>trusted because it presents quality events</p>
              </div>
            </div>
          </div>
        </div>
      `;
    },
   
    async afterRender() {
      // manipulasi dom navbar
      const elementLinkNavHome = document.querySelector(".nav-home a");
      const elementLinkNavFav = document.querySelector(".nav-favorite a");
      manipulateNavbarLink(elementLinkNavHome, elementLinkNavFav);
    },
  };
   
  export default Home;