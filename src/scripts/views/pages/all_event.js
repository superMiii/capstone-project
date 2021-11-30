import manipulateNavbarLink from "../../utils/manipulate_navbar_link";

const allEvent = {
    async render() {
      return `
        hi
      `;
    },
   
    async afterRender() {
        const elementLinkNavAll = document.querySelector(".nav-allEvent a");
        const allNavLink = document.querySelectorAll('.nav-item .nav-link');
        manipulateNavbarLink(elementLinkNavAll, allNavLink);
    },
  };
   
  export default allEvent;