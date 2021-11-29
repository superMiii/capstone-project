const Sign_Up = {
    async render() {
      return `
        <div class="container-sign-up">
            <div class="sign-up">
                <h1>Sign Up</h1>
                <form action="#">
                    <label for="name">Name:</label><br>
                    <input type="text" id="name" name="name"><br><br>
                    <label for="email">Email:</label><br>
                    <input type="email" id="email" name="email"><br><br>
                    <label for="password">Password:</label><br>
                    <input type="password" id="password" name="password"><br><br>
                    <label for="ConfirmPassword">Confirm Password:</label><br>
                    <input type="password" id="ConfirmPassword" name="ConfirmPassword"><br><br>
                    <button class="btn-submit-sme" type="submit">Submit</button>
                </form>
                <p>Already have an account ? <a href="#/sign_in">Sign In</a></p>
            </div>
        </div>
      `;
    },
   
    async afterRender() {
    
    },
  };
   
  export default Sign_Up;