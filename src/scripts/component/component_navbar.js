class componentNavbar extends HTMLElement {
    connectedCallback() {
      this.render();
    }
  
    render() {
      this.innerHTML = `
      <nav class="navbar navbar-expand-lg navbar-light">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">
                    <img src="./images/logo/SME_FIT.png" height="30" alt="logo">
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item nav-home">
                            <a class="nav-link" aria-current="page" href="#/home">Home</a>
                        </li>
                        <li class="nav-item nav-allEvent">
                            <a class="nav-link" aria-current="page" href="#/all_event/1">All Event</a>
                        </li>
                    </ul>
                    <div class="d-flex">
                        ${localStorage.getItem('user') 
                            ? 
                            `<div class="dropdown d-flex align-items-center">
                                <button class="btn btn-secondary dropdown-toggle" style="background-color: white; border: none; border-radius: 50px; color: gray;" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                    <img src="./images/assets/account.png" style="border-radius: 50%; width: 25px; background-color: #17A471;" alt="account logo">
                                    ${JSON.parse(localStorage.getItem('user')).name}
                                </button>
                                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                    <li><a class="dropdown-item" href="#/my_account">My Account</a></li>
                                    <li><a class="dropdown-item btn-my-events" href="#/my_events">My Events</a></li>
                                    <li><a class="dropdown-item btn-my-events" href="#/favorite">Favorite Event</a></li>
                                    <li><a class="dropdown-item btn-upload-event" href="#/upload_event">Upload Event</a></li>
                                    ${JSON.parse(localStorage.getItem('user')).role == 'admin' ? '<li><a class="dropdown-item btn-upload-event" href="#/admin">Admin Page</a></li>' : ''}
                                    <li><hr class="dropdown-divider"></li>
                                    <li><button class="dropdown-item sign-out">Log Out</button></li>
                                </ul>
                            </div>` 
                            : 
                            `<a href="#/sign_in" class="btn-sign-in">Sign In</a>
                            <a href="#/sign_up" class="btn-sign-up">Sign Up</a>`}
                    </div>
                </div>
            </div>
        </nav>
            `;
    }
  }
  
  customElements.define('component-navbar', componentNavbar);
  