class componentFooter extends HTMLElement {
    connectedCallback() {
      this.render();
    }
  
    render() {
      this.innerHTML = `
          <footer>
              <p class="mb-0">Copyright © <span id="footer-cr-years">2021</span> Share My Event All Right Reserved.</p>
          </footer>
            `;
    }
  }
  
  customElements.define('component-footer', componentFooter);
  