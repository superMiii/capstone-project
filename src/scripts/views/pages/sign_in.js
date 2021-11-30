const Sign_In = {
    async render() {
      return `
        <div class="container-sign-in">
            <div class="sign-in">
                <h1>Sign In</h1>
                <form action="#">
                <label for="email">Email:</label><br>
                <input type="email" id="email" name="email"><br><br>
                <label for="password">Password:</label><br>
                <input type="password" id="password" name="password"><br><br>
                <button class="btn-submit-sme" type="submit">Submit</button>
                </form>
                <p>Don’t have any account ? <a href="#/sign_up">Sign Up</a></p>
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
    },
  };
   
  export default Sign_In;