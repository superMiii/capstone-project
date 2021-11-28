class componentNavbar extends HTMLElement {
    connectedCallback() {
      this.render();
    }
  
    render() {
      this.innerHTML = `
      <nav class="navbar sticky-top navbar-expand-lg navbar-light">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">
                    <img src="./images/logo/SME_FIT.png" height="30" alt="">
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a class="nav-link" aria-current="page" href="#/home">Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" aria-current="page" href="#/favorite">Favorite</a>
                        </li>
                    </ul>
                    <div class="d-flex">
                        <button class="btn-sign-in">Sign In</button>
                        <button class="btn-sign-up">Sign Up</button>
                    </div>
                </div>
            </div>
        </nav>
            `;
    }
  }
  
  customElements.define('component-navbar', componentNavbar);
  