class componentSidebar extends HTMLElement {
    connectedCallback() {
      this.render();
    }
  
    render() {
      this.innerHTML = `
        <div class="custom-menu">
            <button type="button" id="sidebarCollapse" class="btn btn-primary">☰</button>
        </div>
        <div class="p-4 pt-5">
            <h2>Admin Page</h2>
            <div>
            <br>
                <a href="#/admin" class="btn-sidebar">Dasboard</a><br><br>
                <a href="#/admin_user" class="btn-sidebar">User</a><br><br>
                <a href="#/admin_events" class="btn-sidebar">Events</a><br><br>
            </div>
        </div>
            `;
    }
  }
  
  customElements.define('component-sidebar', componentSidebar);
  