class componentLoginButton extends HTMLElement {
    connectedCallback() {
      this.render();
    }
  
    render() {
      const user = JSON.parse(localStorage.getItem('user'));
      this.innerHTML = `
            <div class="dropdown">
                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                    Halo, ${user.name}
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    <li><a class="dropdown-item" href="#/my_account/${user.id}">My Account</a></li>
                    <li><a class="dropdown-item" href="#/my_account/${user.id}">My Event</a></li>
                    <li><a class="dropdown-item" href="#">Logout</a></li>
                </ul>
            </div>
            `;
    }
  }
  
  customElements.define('component-login-button', componentLoginButton);
  