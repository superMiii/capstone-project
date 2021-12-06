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
                        <li class="nav-item nav-home">
                            <a class="nav-link" aria-current="page" href="#/home">Home</a>
                        </li>
                        <li class="nav-item nav-favorite">
                            <a class="nav-link" aria-current="page" href="#/favorite">Favorite</a>
                        </li>
                        <li class="nav-item nav-allEvent">
                            <a class="nav-link" aria-current="page" href="#/all_event/1">All Event</a>
                        </li>
                    </ul>
                    <div class="d-flex">
                        ${localStorage.getItem('user') ? '<a href="#/my_account/" class="btn-sign-in">'+JSON.parse(localStorage.getItem('user')).name+'</a><a href="#" class="btn-sign-up">Sign_out</a>' : '<a href="#/sign_in" class="btn-sign-in">Sign In</a><a href="#/sign_up" class="btn-sign-up">Sign Up</a>'}
                    </div>
                </div>
            </div>
        </nav>
            `;
    }
  }
  
  customElements.define('component-navbar', componentNavbar);
  