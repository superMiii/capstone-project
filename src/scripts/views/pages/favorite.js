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
      const allNavLink = document.querySelectorAll('.nav-item .nav-link');
      manipulateNavbarLink(elementLinkNavFav, allNavLink);
    },
  };
   
  export default Favorite;