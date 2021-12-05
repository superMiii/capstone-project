import AuthSource from "../../data/auth-source";

const Sign_Up = {
    async render() {
      return `
        <div class="container-sign-up">
            <div class="sign-up">
                <h1>Sign Up</h1>
                <form id="signUp">
                    <label for="name">Name:</label><br>
                    <input type="text" id="name" name="name" required><br><br>
                    <label for="email">Email:</label><br>
                    <input type="email" id="email" name="email" required><br><br>
                    <label for="password">Password:</label><br>
                    <input type="password" id="password" name="password" required><br><br>
                    <label for="ConfirmPassword">Confirm Password:</label><br>
                    <input type="password" id="ConfirmPassword" name="ConfirmPassword" required><br><br>
                    <button class="btn-submit-sme" type="submit">Submit</button>
                </form>
                <p>Already have an account ? <a href="#/sign_in">Sign In</a></p>
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

        const formSignUp = document.querySelector('#signUp');
        formSignUp.addEventListener('submit', (e) => {
            e.preventDefault();
            const nameInput = document.querySelector('#name');
            const emailInput = document.querySelector('#email');
            const passwordInput = document.querySelector('#password');
            const confirmPasswordInput = document.querySelector('#ConfirmPassword');

            const data = {
                name: nameInput.value,
                email: emailInput.value,
                password: passwordInput.value,
                password_confirmation: confirmPasswordInput.value,
            };
            this._signUp(data);
        });
    },

    async _signUp(data) {
        const signUp = await AuthSource.register(data);
        if(signUp.status == false) {
            if(signUp.message.email || signUp.message.password) {
                // alert(signUp.message.email);
                alert(signUp.message.password);
            } else {
                alert(signUp.message);
            }
        } else {
            alert(signUp.message);
            location.href = '#/sign_in';
        }
    }
  };
   
  export default Sign_Up;