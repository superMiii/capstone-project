import manipulateNavbarLink from "../../utils/manipulate_navbar_link";

const Home = {
    async render() {
      return `
        <h2>HOME</h2>
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