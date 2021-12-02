import { createDetailTemplate } from "../templates/template-creator";

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

        // manipulasi innerdetail
        const innerDetailElement = document.querySelector(".inner-detail");
        innerDetailElement.innerHTML = createDetailTemplate();
    },
  };
   
  export default detail;