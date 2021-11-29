import manipulateNavbarLink from "../../utils/manipulate_navbar_link";

const Favorite = {
    async render() {
      return `
        <h2>Favorite</h2>
      `;
    },
   
    async afterRender() {
      // manipulasi dom navbar
      const elementLinkNavFav = document.querySelector(".nav-favorite a");
      const elementLinkNavHome = document.querySelector(".nav-home a");
      manipulateNavbarLink(elementLinkNavFav, elementLinkNavHome);
    },
  };
   
  export default Favorite;